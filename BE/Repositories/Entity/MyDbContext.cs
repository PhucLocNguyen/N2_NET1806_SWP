using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace Repositories;

public partial class MyDbContext : IdentityDbContext<AppUser>
{
    public MyDbContext()
    {
    }

    public MyDbContext(DbContextOptions options) : base(options)
    {
    }
    

    public virtual DbSet<Blog> Blogs { get; set; }

    public virtual DbSet<Design> Designs { get; set; }

    public virtual DbSet<Have> Haves { get; set; }

    public virtual DbSet<MasterGemstone> MasterGemstones { get; set; }

    public virtual DbSet<Material> Materials { get; set; }

    public virtual DbSet<Payment> Payments { get; set; }

    public virtual DbSet<Requirement> Requirements { get; set; }

    public virtual DbSet<Stones> Stones { get; set; }

    public virtual DbSet<TypeOfJewellery> TypeOfJewelleries { get; set; }

    public virtual DbSet<UsersRequirement> UsersRequirements { get; set; }

    public virtual DbSet<WarrantyCard> WarrantyCards { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see https://go.microsoft.com/fwlink/?LinkId=723263.
        => optionsBuilder.UseSqlServer("Server=MSI;uid=sa;pwd=12345;database=Jewellery;TrustServerCertificate=True");

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        modelBuilder.Entity<IdentityUserLogin<string>>(entity =>
        {
            entity.HasKey(login => new { login.LoginProvider, login.ProviderKey });
        });

        modelBuilder.Entity<IdentityUserRole<string>>(entity =>
        {
            entity.HasKey(role => new { role.UserId, role.RoleId });
        });

        modelBuilder.Entity<IdentityUserToken<string>>(entity =>
        {
            entity.HasKey(token => new { token.UserId, token.LoginProvider, token.Name });
        });

        modelBuilder.Entity<Blog>(entity =>
        {
            entity.HasKey(e => e.BlogId).HasName("PK__Blog__54379E5022ECC203");

            entity.ToTable("Blog");

            entity.Property(e => e.BlogId).HasColumnName("BlogID");
            entity.Property(e => e.Description).HasColumnType("text");
            entity.Property(e => e.Image).HasMaxLength(200);
            entity.Property(e => e.ManagerId).HasColumnName("ManagerID");
            entity.Property(e => e.Title).HasMaxLength(200);
        });

        modelBuilder.Entity<Design>(entity =>
        {
            entity.HasKey(e => e.DesignId).HasName("PK__Design__32B8E17F04FFD0CA");

            entity.ToTable("Design");

            entity.Property(e => e.DesignId).HasColumnName("DesignID");
            entity.Property(e => e.Description).HasColumnType("text");
            entity.Property(e => e.DesignName).HasMaxLength(100);
            entity.Property(e => e.Image).HasMaxLength(200);
            entity.Property(e => e.ManagerId).HasColumnName("ManagerID");
            entity.Property(e => e.MasterGemstoneId).HasColumnName("MasterGemstoneID");
            entity.Property(e => e.MaterialId).HasColumnName("MaterialID");
            entity.Property(e => e.ParentId).HasColumnName("ParentID");
            entity.Property(e => e.StoneId).HasColumnName("StoneID");
            entity.Property(e => e.TypeOfJewelleryId).HasColumnName("TypeOfJewelleryID");
            entity.Property(e => e.WeightOfMaterial).HasColumnType("decimal(18, 2)");


            entity.HasOne(d => d.MasterGemstone).WithMany(p => p.Designs)
                .HasForeignKey(d => d.MasterGemstoneId)
                .HasConstraintName("FK__Design__MasterGe__48CFD27E");

            entity.HasOne(d => d.Material).WithMany(p => p.Designs)
                .HasForeignKey(d => d.MaterialId)
                .HasConstraintName("FK__Design__Material__4AB81AF0");

            entity.HasOne(d => d.Stone).WithMany(p => p.Designs)
                .HasForeignKey(d => d.StoneId)
                .HasConstraintName("FK__Design__StoneID__47DBAE45");

            entity.HasOne(d => d.TypeOfJewellery).WithMany(p => p.Designs)
                .HasForeignKey(d => d.TypeOfJewelleryId)
                .HasConstraintName("FK__Design__TypeOfJe__4BAC3F29");
        });

        modelBuilder.Entity<Have>(entity =>
        {
            entity.HasKey(e => new { e.WarrantyCardId, e.RequirementId }).HasName("PK__Have__FBE292CD3DC179BA");

            entity.ToTable("Have");

            entity.Property(e => e.WarrantyCardId).HasColumnName("WarrantyCardID");
            entity.Property(e => e.RequirementId).HasColumnName("RequirementID");
            entity.Property(e => e.DateCreated).HasColumnType("datetime");
            entity.Property(e => e.ExpirationDate).HasColumnType("datetime");

            entity.HasOne(d => d.Requirement).WithMany(p => p.Haves)
                .HasForeignKey(d => d.RequirementId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__Have__Requiremen__5BE2A6F2");

            entity.HasOne(d => d.WarrantyCard).WithMany(p => p.Haves)
                .HasForeignKey(d => d.WarrantyCardId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__Have__WarrantyCa__5AEE82B9");
        });

        modelBuilder.Entity<MasterGemstone>(entity =>
        {
            entity.HasKey(e => e.MasterGemstoneId).HasName("PK__MasterGe__D4657CE37E05F146");

            entity.ToTable("MasterGemstone");

            entity.Property(e => e.MasterGemstoneId).HasColumnName("MasterGemstoneID");
            entity.Property(e => e.Clarity).HasMaxLength(50);
            entity.Property(e => e.Cut).HasMaxLength(50);
            entity.Property(e => e.Kind).HasMaxLength(100);
            entity.Property(e => e.Price).HasColumnType("decimal(18, 2)");
            entity.Property(e => e.Shape).HasMaxLength(50);
            entity.Property(e => e.Size).HasMaxLength(50);
            entity.Property(e => e.Weight).HasColumnType("decimal(18, 2)");
        });

        modelBuilder.Entity<Material>(entity =>
        {
            entity.HasKey(e => e.MaterialId).HasName("PK__Material__C506131745B87B4A");

            entity.ToTable("Material");

            entity.Property(e => e.MaterialId).HasColumnName("MaterialID");
            entity.Property(e => e.ManagerId).HasColumnName("ManagerID");
            entity.Property(e => e.Name).HasMaxLength(100);
            entity.Property(e => e.Price).HasColumnType("decimal(18, 2)");

        });

        modelBuilder.Entity<Payment>(entity =>
        {
            entity.HasKey(e => e.PaymentId).HasName("PK__Payment__9B556A58473D0C7A");

            entity.ToTable("Payment");

            entity.Property(e => e.PaymentId).HasColumnName("PaymentID");
            entity.Property(e => e.Amount).HasColumnType("decimal(18, 2)");
            entity.Property(e => e.CompletedAt).HasColumnType("datetime");
            entity.Property(e => e.CustomerId).HasColumnName("CustomerID");
            entity.Property(e => e.Method).HasMaxLength(50);
            entity.Property(e => e.RequirementsId).HasColumnName("RequirementsID");


            entity.HasOne(d => d.Requirements).WithMany(p => p.Payments)
                .HasForeignKey(d => d.RequirementsId)
                .HasConstraintName("FK__Payment__Require__5629CD9C");
        });

        modelBuilder.Entity<Requirement>(entity =>
        {
            entity.HasKey(e => e.RequirementId).HasName("PK__Requirem__7DF11E7DF5D9CCB5");

            entity.Property(e => e.RequirementId).HasColumnName("RequirementID");
            entity.Property(e => e.CustomerNote).HasColumnType("text");
            entity.Property(e => e.Design3D).HasMaxLength(200);
            entity.Property(e => e.DesignId).HasColumnName("DesignID");
            entity.Property(e => e.GoldPriceAtMoment).HasColumnType("decimal(18, 2)");
            entity.Property(e => e.MachiningFee).HasColumnType("decimal(18, 2)");
            entity.Property(e => e.Size).HasMaxLength(50);
            entity.Property(e => e.StaffNote).HasColumnType("text");
            entity.Property(e => e.Status).HasMaxLength(50);
            entity.Property(e => e.StonePriceAtMoment).HasColumnType("decimal(18, 2)");
            entity.Property(e => e.TotalMoney).HasColumnType("decimal(18, 2)");

        });


        modelBuilder.Entity<Stones>(entity =>
        {
            entity.HasKey(e => e.StoneId).HasName("PK__Stones__59F240A0AC6587A4");

            entity.Property(e => e.StoneId).HasColumnName("StoneID");
            entity.Property(e => e.Kind).HasMaxLength(100);
            entity.Property(e => e.Price).HasColumnType("decimal(18, 2)");
            entity.Property(e => e.Size).HasMaxLength(50);
        });

        modelBuilder.Entity<TypeOfJewellery>(entity =>
        {
            entity.HasKey(e => e.TypeOfJewelleryId).HasName("PK__TypeOfJe__F1D25D486FD00EC5");

            entity.ToTable("TypeOfJewellery");

            entity.Property(e => e.TypeOfJewelleryId).HasColumnName("TypeOfJewelleryID");
            entity.Property(e => e.Name).HasMaxLength(100);
        });


        modelBuilder.Entity<UsersRequirement>(entity =>
        {
            entity.HasKey(e => e.UsersRequirementId).HasName("PK__UsersReq__EC83D35FE7331F38");

            entity.Property(e => e.UsersRequirementId).HasColumnName("UsersRequirementID");
            entity.Property(e => e.RequirementId).HasColumnName("RequirementID");
            entity.Property(e => e.UsersId).HasColumnName("UsersID");

            entity.HasOne(d => d.Requirement).WithMany(p => p.UsersRequirements)
                .HasForeignKey(d => d.RequirementId)
                .HasConstraintName("FK__UsersRequ__Requi__52593CB8");
        });

        modelBuilder.Entity<WarrantyCard>(entity =>
        {
            entity.HasKey(e => e.WarrantyCardId).HasName("PK__Warranty__3C3D832A18E09ED0");

            entity.ToTable("WarrantyCard");

            entity.Property(e => e.WarrantyCardId).HasColumnName("WarrantyCardID");
            entity.Property(e => e.Description).HasColumnType("text");
            entity.Property(e => e.Title).HasMaxLength(100);
        });

        OnModelCreatingPartial(modelBuilder);
        base.OnModelCreating(modelBuilder);
        List<IdentityRole> roles = new List<IdentityRole>{
            new IdentityRole
            {
                Name= "Customer",
                NormalizedName= "CUSTOMER"
            },new IdentityRole
            {
                Name="Manager",
                NormalizedName = "MANAGER"
            },new IdentityRole
            {
                Name="Admin",
                NormalizedName = "ADMIN"
            }
            };
        modelBuilder.Entity<IdentityRole>().HasData(roles);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
