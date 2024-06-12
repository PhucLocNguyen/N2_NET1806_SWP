namespace API.Model.UserModel
{
    public enum  RoleEnum
    {
        Admin = 1,
        Manager = 2,
        Staff = 3,
        Sale = 4,
    }

    public static class RoleConst
    {
        public const string Admin = "Admin";
        public const string Manager = "Manager";
        public const string Staff = "Staff";
        public const string Sale = "Sale";
        public const string Customer = "Customer";
    }
}
