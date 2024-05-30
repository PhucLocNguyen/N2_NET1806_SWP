
using Repository.Entity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Principal;
using System.Text;
using System.Threading.Tasks;

namespace Repository

{
    public class UnitOfWork
    {
        private MyDbContext _context;
        private GenericRepository<Blog> _blog;
        private GenericRepository<Design> _design;
        private GenericRepository<Have> _have;
        private GenericRepository<MasterGemstone> _masterGemstone;
        private GenericRepository<Material> _material;
        private GenericRepository<Payment> _payment;
        private GenericRepository<Requirement> _requirement;
        private GenericRepository<Role> _role;
        private GenericRepository<Stones> _stone;
        private GenericRepository<TypeOfJewellery> _typeOfJewellry;
        private GenericRepository<User> _user;
        private GenericRepository<WarrantyCard> _warrantyCard;


        public UnitOfWork(MyDbContext context)
        {
            _context = context;
        }

        public GenericRepository<Blog> BlogRepository
        {
            get
            {
                if (_blog == null)
                {
                    this._blog = new GenericRepository<Blog>(_context);
                }
                return _blog;
            }

        }
        public GenericRepository<Design> DesignRepository
        {
            get
            {
                if (_design == null)
                {
                    this._design = new GenericRepository<Design>(_context);
                }
                return _design;
            }

        }
        public GenericRepository<Have> HaveRepository
        {
            get
            {
                if (_have == null)
                {
                    this._have = new GenericRepository<Have>(_context);
                }
                return _have;
            }

        }
        public GenericRepository<MasterGemstone> MasterGemstoneRepository
        {
            get
            {
                if (_masterGemstone == null)
                {
                    this._masterGemstone = new GenericRepository<MasterGemstone>(_context);
                }
                return _masterGemstone;
            }

        }
        public GenericRepository<Material> MaterialRepository
        {
            get
            {
                if (_material == null)
                {
                    this._material = new GenericRepository<Material>(_context);
                }
                return _material;
            }

        }
        public GenericRepository<Payment> PaymentRepository
        {
            get
            {
                if (_payment == null)
                {
                    this._payment = new GenericRepository<Payment>(_context);
                }
                return _payment;
            }

        }
        public GenericRepository<Requirement> RequirementRepository
        {
            get
            {
                if (_requirement == null)
                {
                    this._requirement = new GenericRepository<Requirement>(_context);
                }
                return _requirement;
            }

        }
        public GenericRepository<Role> RoleRepository
        {
            get
            {
                if (_role == null)
                {
                    this._role = new GenericRepository<Role>(_context);
                }
                return _role;
            }

        }
        public GenericRepository<Stones> StoneRepository
        {
            get
            {
                if (_stone == null)
                {
                    this._stone = new GenericRepository<Stones>(_context);
                }
                return _stone;
            }

        }
        public GenericRepository<TypeOfJewellery> TypeOfJewellryRepository
        {
            get
            {
                if (_typeOfJewellry == null)
                {
                    this._typeOfJewellry = new GenericRepository<TypeOfJewellery>(_context);
                }
                return _typeOfJewellry;
            }

        }
        public GenericRepository<User> UserRepository
        {
            get
            {
                if (_user == null)
                {
                    this._user = new GenericRepository<User>(_context);
                }
                return _user;
            }

        }
        public GenericRepository<WarrantyCard> WarrantyCardRepository
        {
            get
            {
                if (_warrantyCard == null)
                {
                    this._warrantyCard = new GenericRepository<WarrantyCard>(_context);
                }
                return _warrantyCard;
            }

        }


        public void Save()
        {
            _context.SaveChanges();
        }

        private bool disposed = false;

        protected virtual void Dispose(bool disposing)
        {
            if (!this.disposed)
            {
                if (disposing)
                {
                    _context.Dispose();
                }
            }
            this.disposed = true;
        }

        public void Dispose()
        {
            Dispose(true);
            GC.SuppressFinalize(this);
        }
    }
}
