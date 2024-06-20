using Microsoft.EntityFrameworkCore;
using Repositories;
using Repositories.Entity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SWP391Project.Services.ChatSystem.Hubs
{
    public class ConversationService : IConversationService
    {
        private readonly MyDbContext _context;
        public ConversationService(MyDbContext context)
        {
            if (context == null)
            {
                _context = new MyDbContext();
            }
            else
            {
                _context = context;
            }
        }

        public Conversation CreateConversation(Conversation conversation)
        {
            try {
                _context.Conversations.Add(conversation);
                _context.SaveChanges();
                return conversation;
            }
            catch(Exception ex) {
                Console.WriteLine(ex.Message);  
                return null;
            }
        }

        public async Task<Conversation> GetById(int id)
        {
            var conversation = await _context.Conversations.FirstOrDefaultAsync(x=> x.ConversationId == id);
            return conversation;
        }
        public bool CheckValidConversation(int userId1, int userId2)
        {
            var output = true;
            if (userId1 == userId2) {
                output = false;
            }
            var check1 = _context.Conversations.FirstOrDefault(x => (x.User1Id == userId1 && x.User2Id == userId2));
            var check2 = _context.Conversations.FirstOrDefault(x => (x.User1Id == userId2 && x.User2Id == userId1));
            if(check1 != null|| check2!=null)
            {
                output = false;
            }
            return output;
        }

        public IEnumerable<Conversation> GetAllByCurrentUser(int userId)
        {
            var getCoversationsByUser = _context.Conversations.Where(x=>x.User1Id==userId|| x.User2Id == userId).ToList();
            return getCoversationsByUser;
        }
    }
}
