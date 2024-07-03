﻿using API.Model.ConversationModel;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Repositories;
using Repositories.Entity;
using SWP391Project.Services.ChatSystem;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ConversationController : ControllerBase
    {
        private readonly IConversationService _conversationService;
        private readonly UnitOfWork _unitOfWork;
        public ConversationController(IConversationService conversationService, UnitOfWork unitOfWork)
        {

            _conversationService = conversationService; 
            this._unitOfWork = unitOfWork;
        }
        [HttpGet("{id}")]

        public IActionResult GetById([FromRoute]int id,[FromQuery] int userId)
        {
            try
            {
                var conversation = _conversationService.GetById(id).ToConversationDto(userId);

                return Ok(conversation);
            }
            catch (Exception ex)
            {
                return BadRequest("Something wrong appears in GetById Conversation");
            }
           
        }
        [HttpPost("all")]
        public IActionResult GetConversationByCurrentUser([FromBody] int userId)
        {
            try
            {
                var checkUser = _unitOfWork.UserRepository.GetByID(userId);
                if (checkUser == null)
                {
                    return BadRequest("Invalid User");
                }
                else
                {
                    var getConversationList = _conversationService.GetAllByCurrentUser(userId).Select(conversation => conversation.ToConversationDto(userId)).ToList();

                    return Ok(getConversationList);
                }
            }
            catch (Exception ex)
            {
                return BadRequest("Something wrong appears in GetConversationByCurrentUser");
            }
           
        }
        [HttpPost]
        public IActionResult Create([FromBody] RequestCreateConversation model)
        {
            try
            {
                if (!_conversationService.CheckValidConversation(model.userId1, model.userId2))
                {
                    return BadRequest();
                }
                else
                {
                    var conversation = _conversationService.CreateConversation(model.ToConversationEntity());
                    if (conversation != null)
                    {
                        return Ok(conversation);
                    }
                    else
                    {
                        return BadRequest();
                    }
                }
            }
            catch (Exception ex)
            {
                return BadRequest("Create conversation failes");
            }
           
        }
    }
}
