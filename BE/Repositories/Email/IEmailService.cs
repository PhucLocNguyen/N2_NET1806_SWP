using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Repositories.Email
{
    public interface IEmailService
    {
        Task SendEmail(string toEmail, string subject, string body);

        //void SaveInCache(User user);
    }
}
