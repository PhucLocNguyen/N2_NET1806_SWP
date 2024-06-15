﻿using API.Model.TypeOfJewellryModel;
using API.Model.UserModel;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Repositories;
using Repositories.Entity;
using Repositories.Token;
using System.Linq.Expressions;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly UnitOfWork _unitOfWork;
        private readonly IToken _tokenService;
        public UserController(UnitOfWork unitOfWork, IToken tokenService)
        {
            _unitOfWork = unitOfWork;
            _tokenService = tokenService;
        }
        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] RequestRegisterAccount requestRegisterAccount)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);
            if (checkDuplicateUsername(requestRegisterAccount.Username))
            {
                return BadRequest("Username is existed");
            }
            if (!requestRegisterAccount.Password.Equals(requestRegisterAccount.PasswordConfirm))
            {
                return BadRequest("PasswordConfirm is not correct");
            }
            var roleEntity = _unitOfWork.RoleRepository.Get(filter: x=>x.Name.Equals(RoleConst.Customer)).FirstOrDefault();
            var registerAccount = requestRegisterAccount.toUserEntity(roleEntity);
            _unitOfWork.UserRepository.Insert(registerAccount);
            _unitOfWork.Save();
            return Ok(registerAccount.toUserDTO());
        }

        [HttpPost("registerForAdmin")]
        //[Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme, Roles = Role.Customer)]
        public  IActionResult RegisterForAdmin([FromBody] RequestRegisterAccount requestRegisterAccount, [FromQuery] RoleEnum roleEnum)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);
            if (checkDuplicateUsername(requestRegisterAccount.Username))
            {
                return BadRequest("Username is existed");
            }
            if (!requestRegisterAccount.Password.Equals(requestRegisterAccount.PasswordConfirm))
            {
                return BadRequest("PasswordConfirm is not correct");
            }
            var role = roleEnum.ToString() != "0" ? roleEnum.ToString() : "Customer";
            var roleEntity = _unitOfWork.RoleRepository.Get(filter: x => x.Name.Equals(role)).FirstOrDefault();
            var registerAccount = requestRegisterAccount.toUserEntity(roleEntity);
            _unitOfWork.UserRepository.Insert(registerAccount);
            _unitOfWork.Save();
            return Ok(registerAccount.toUserDTO());
        }
        [HttpPost("login")]
        public  async Task<IActionResult> Login(RequestLoginAccount loginDTO)
        {
            try
            {
                Expression<Func<Users, bool>> filter = x =>
                    (x.Username.Equals(loginDTO.Username));
                var user = _unitOfWork.UserRepository.Get(filter,
                    includes: m => m.Role
                    ).FirstOrDefault();

                if (user == null) { return BadRequest("Invalid Username"); }

                if (!BCrypt.Net.BCrypt.Verify(loginDTO.Password, user.Password)) { return BadRequest("Password incorrect"); }

                return Ok(await _tokenService.CreateToken(user));
                //return Ok("Login Successfully");
            }
            catch (NullReferenceException ex)
            {
                return BadRequest("The account does not register");
            }
        }

        [HttpGet]
        public IActionResult GetAll([FromQuery] string RoleFromInput = null)
        {
            Expression<Func<Users, bool>> filter = x =>
                (string.IsNullOrEmpty(RoleFromInput) || x.Role.Name.Contains(RoleFromInput));
            var Users = _unitOfWork.UserRepository.Get(filter);
            return Ok(Users);
        }

        [HttpGet("{username}")]
        public IActionResult GetByUsername([FromRoute]string username)
        {
            Expression<Func<Users, bool>> filter = x =>
                (string.IsNullOrEmpty(username) || x.Username.Equals(username));
            var Users = _unitOfWork.UserRepository.Get(filter);
            return Ok(Users);
        }

        private bool checkDuplicateUsername(string username)
        {
            bool check = true;
            var existedAccount = _unitOfWork.UserRepository.Get();
            foreach (var item in existedAccount)
            {
                if (!item.Username.Equals(username)) 
                {
                    check = false;
                    break;
                }
            }
            if (existedAccount == null) { return false;}
            return true;
        }
    }
}
