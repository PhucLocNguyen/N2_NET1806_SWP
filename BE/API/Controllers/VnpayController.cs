using API.Model.VnPayModel;
using Microsoft.AspNetCore.Mvc;
using Repositories;
using Repositories.Entity;
using Repositories.VnPay.Services;
using SWP391Project.Services.Model.VnpayModel;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class VnpayController : ControllerBase
    {
        //private readonly IHttpContextAccessor _httpContextAccessor;
        private readonly VnpayService _vnpayService;
        private readonly UnitOfWork _unitOfWork;

        public VnpayController(/*IHttpContextAccessor httpContextAccessor,*/ VnpayService vnpayService, UnitOfWork unitOfWork)
        {
            /*_httpContextAccessor = httpContextAccessor;*/
            _vnpayService = vnpayService;
            _unitOfWork = unitOfWork;
        }
        [HttpPost]
        public IActionResult CreatePayment([FromBody] RequestCreateVnpay requestCreateVnpay)
        {
            requestCreateVnpay.PaidAmount = requestCreateVnpay.RequiredAmount;
            //string? ipAddress = GetClientIpAddress(_httpContextAccessor.HttpContext);
            var result = _vnpayService.CreatePayment(requestCreateVnpay);
            return Ok(result);
        }

        private string? GetClientIpAddress(HttpContext httpContext)
        {
            // Check for proxy headers
            string? ipAddress = httpContext?.Request.Headers["X-Forwarded-For"].FirstOrDefault();
            if (!string.IsNullOrEmpty(ipAddress))
            {
                // Use the IP address from the proxy header
                return ipAddress;
            }
            else
            {
                // Use the local IP address
                return httpContext?.Connection?.LocalIpAddress?.ToString();
            }
        }

        //Check payment response
        [HttpGet("CheckResponse")]
        public IActionResult CheckResponse()
        {
            ResponseMessage result = _vnpayService.checkPayment(Request.Query);
            var ResponseCode = result.ResponseCode;
            if (ResponseCode.Equals("00"))
            {
                result.Payment.Status = "Paid";
                _unitOfWork.Save();
                return Ok(result.Payment.RequirementsId);
            }
            else
            {
                result.Payment.Status = "Failed";

                _unitOfWork.Save();
                return BadRequest(result.Payment.RequirementsId);
            }

        }
    }
}
