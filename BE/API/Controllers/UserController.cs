﻿using API.Model.TypeOfJewellryModel;
using API.Model.UserModel;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Caching.Memory;
using Repositories;
using Repositories.Email;
using Repositories.Entity;
using Repositories.Token;
using System.Linq.Expressions;
using System.Net;
using System.Text.RegularExpressions;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly UnitOfWork _unitOfWork;
        private readonly IToken _tokenService;
        private readonly IEmailService _emailService;
        private readonly IMemoryCache _cache;

        public UserController(UnitOfWork unitOfWork, IToken tokenService, IEmailService emailService, IMemoryCache cache)
        {
            _unitOfWork = unitOfWork;
            _tokenService = tokenService;
            _emailService = emailService;
            _cache = cache;
        }
        [HttpPost("registerForCustomer")]
        public async Task<IActionResult> Register([FromBody] RequestRegisterAccount requestRegisterAccount)
        {
            try
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
                /*var roleEntity = _unitOfWork.RoleRepository.Get(filter: x => x.Name.Equals(RoleConst.Customer)).FirstOrDefault();
                var registerAccount = requestRegisterAccount.toUserEntity(roleEntity);
                _unitOfWork.UserRepository.Insert(registerAccount);
                _unitOfWork.Save();*/
                SaveInCache(requestRegisterAccount);
                return Ok("Please check email to verify your email");
            }
            catch (DbUpdateException ex)
            {
                if (ex.InnerException is SqlException sqlException && sqlException.Number == 2627)
                {
                    return Conflict("Email has already been registered");
                }
                else
                {
                    return Problem("Something appear when registing", statusCode: 500);
                }
            }

        }

        [HttpPost("registerForAdmin")]
        //[Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme, Roles = Role.Customer)]
        public IActionResult RegisterForAdmin([FromBody] RequestRegisterAccount requestRegisterAccount, [FromQuery] RoleEnum roleEnum)
        {
            try
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
                //return Ok(registerAccount.toUserDTO());
                return Ok("Regist Successfully");
            }
            catch (DbUpdateException ex)
            {
                if (ex.InnerException is SqlException sqlException && sqlException.Number == 2627)
                {
                    return BadRequest("Email has already been registered");
                }
                else
                {
                    return Problem("Something appear when registing", statusCode: 500);
                }
            }

        }
        [HttpPost("loginForCustomer")]
        public async Task<IActionResult> LoginForCustomer(RequestLoginAccount loginDTO)
        {
            try
            {
                Expression<Func<Users, bool>> filter = x =>
                    (x.Username.Equals(loginDTO.Username));
                var user = _unitOfWork.UserRepository.Get(
                    includes: m => m.Role
                    ).Where(x => x.Username.Equals(loginDTO.Username, StringComparison.Ordinal)).FirstOrDefault();

                if (user == null) { return BadRequest("Invalid Username"); }

                if (!BCrypt.Net.BCrypt.Verify(loginDTO.Password, user.Password)) { return BadRequest("Password incorrect"); }

                if (user.Role.Name == RoleConst.Customer)
                {
                    return Ok(await _tokenService.CreateToken(user));
                }
                return BadRequest("You do not have permission to access this page");
            }
            catch (NullReferenceException ex)
            {
                return BadRequest("The account does not register");
            }
        }

        [HttpPost("loginForStaff")]
        public async Task<IActionResult> LoginForStaff(RequestLoginAccount loginDTO)
        {
            try
            {
                Expression<Func<Users, bool>> filter = x =>
                    (x.Username.Equals(loginDTO.Username));
                var user = _unitOfWork.UserRepository.Get(
                    includes: m => m.Role
                    ).Where(x => x.Username.Equals(loginDTO.Username, StringComparison.Ordinal)).FirstOrDefault();

                if (user == null) { return BadRequest("Invalid Username"); }

                if (!BCrypt.Net.BCrypt.Verify(loginDTO.Password, user.Password)) { return BadRequest("Password incorrect"); }


                if (user.Role.Name != RoleConst.Customer)
                {
                    return Ok(await _tokenService.CreateToken(user));
                }
                return BadRequest("You do not have permission to access this page");
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
        public IActionResult GetByUsername([FromRoute] string username)
        {
            Expression<Func<Users, bool>> filter = x =>
                (string.IsNullOrEmpty(username) || x.Username.Equals(username));
            var Users = _unitOfWork.UserRepository.Get(filter);
            return Ok(Users);
        }

        [HttpPut]
        public IActionResult UpdateProfile(int userId, UserDTO editUser)
        {
            try
            {
                if (!Regex.IsMatch(editUser.Phone, @"\d{10}"))
                {
                    return BadRequest("Phone number is not 10 digits long or contains characters");
                }
                var existedUser = _unitOfWork.UserRepository.GetByID(userId);
                if (existedUser == null)
                {
                    return NotFound("User does not found");
                }
                existedUser.Name = editUser.Name;
                existedUser.Phone = editUser.Phone;
                existedUser.Image = editUser.Image;
                _unitOfWork.UserRepository.Update(existedUser);
                _unitOfWork.Save();
                return Ok("Edit profile succesfully");
            }
            catch (DbUpdateException ex)
            {
                if (ex.InnerException is SqlException sqlException && sqlException.Number == 2627)
                {
                    return Conflict("Email has already been registered");
                }
                else
                {
                    return Problem("Something appear when registing", statusCode: 500);
                }
            }
        }

        [HttpPost("SendEmail")]
        public async Task<IActionResult> SendEmail([FromBody] string VerifyCodeFromUser)
        {

            try
            {
                var result = VerifyCode(VerifyCodeFromUser);

                return result switch
                {
                    VerifyResult.Success => Ok("Regist Successfully"),
                    VerifyResult.Expired => BadRequest("Verification code has expired. Please sign up again"),
                    VerifyResult.Invalid => BadRequest("Invalid verification code. Please try again"),
                };

            }
            catch (Exception ex)
            {
                throw;
            }
        }
        private bool checkDuplicateUsername(string username)
        {
            bool check = false;
            var existedAccount = _unitOfWork.UserRepository.Get();
            foreach (var item in existedAccount)
            {
                if (item.Username.Equals(username))
                {
                    check = true;
                    break;
                }
            }
            return check;
        }

        private void SaveInCache(RequestRegisterAccount requestRegisterAccount)
        {
            string verificationCode = Guid.NewGuid().ToString();
            TimeSpan _cacheDuration = TimeSpan.FromSeconds(30);
            requestRegisterAccount.VerifyEmail = verificationCode;
            requestRegisterAccount.Duration = DateTime.Now.AddSeconds(20);
            _cache.Set(verificationCode, requestRegisterAccount, _cacheDuration);
            _emailService.SendEmail(requestRegisterAccount.Email, "Verify Account", "Verify Code: " + verificationCode);
        }

        private VerifyResult VerifyCode(string VerifyCode)
        {
            if (_cache.TryGetValue(VerifyCode, out RequestRegisterAccount requestRegisterAccount))
            {
                if (requestRegisterAccount.Duration >= DateTime.Now)
                {

                    var roleEntity = _unitOfWork.RoleRepository.Get(filter: x => x.Name.Equals(RoleConst.Customer)).FirstOrDefault();
                    var registerAccount = requestRegisterAccount.toUserEntity(roleEntity);
                    _unitOfWork.UserRepository.Insert(registerAccount);
                    _unitOfWork.Save();
                    _cache.Remove(VerifyCode);
                    return VerifyResult.Success;
                }
                else
                {
                    _cache.Remove(VerifyCode);
                    return VerifyResult.Expired;
                }
            }
            return VerifyResult.Invalid;
        }
        public enum VerifyResult
        {
            Success,
            Expired,
            Invalid
        }
    }
}