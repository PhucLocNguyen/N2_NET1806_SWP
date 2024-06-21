using MailKit.Net.Smtp;
using MailKit.Security;
using Microsoft.Extensions.Options;
using MimeKit;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Mail;
using System.Text;
using System.Threading.Tasks;
using SmtpClient = MailKit.Net.Smtp.SmtpClient;

namespace Repositories.Email
{
    public class EmailService : IEmailService
    {
        private readonly EmailSetting emailSetting;
        public EmailService(IOptions<EmailSetting> options)
        {
            this.emailSetting = options.Value;
        }

        public async Task SendEmail(string toEmail, string subject, string body)
        {
            var email = new MimeMessage();
            email.Sender = MailboxAddress.Parse(emailSetting.Email);
            email.To.Add(MailboxAddress.Parse(toEmail));
            email.Subject = subject;
            var build = new BodyBuilder();
            build.HtmlBody = body;
            email.Body = build.ToMessageBody();

            using var smtp = new SmtpClient();
            smtp.Connect(emailSetting.Host, emailSetting.Port, SecureSocketOptions.StartTls);
            smtp.Authenticate(emailSetting.Email,emailSetting.Password);
            await smtp.SendAsync(email);
            smtp.Disconnect(true);
        }

        public void SaveInCache()
        {

        }
    }
}
