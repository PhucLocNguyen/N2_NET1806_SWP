﻿using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using Repository.Entity;

namespace Repository;

public partial class MyDbContext : Microsoft.EntityFrameworkCore.DbContext
{
    public MyDbContext()
    {
    }

    public MyDbContext(DbContextOptions<MyDbContext> options)
        : base(options)
    {
    }

    public virtual DbSet<Blog> Blogs { get; set; }

    public virtual DbSet<Design> Designs { get; set; }

    public virtual DbSet<Have> Haves { get; set; }

    public virtual DbSet<MasterGemstone> MasterGemstones { get; set; }

    public virtual DbSet<Material> Materials { get; set; }

    public virtual DbSet<Payment> Payments { get; set; }

    public virtual DbSet<Requirement> Requirements { get; set; }

    public virtual DbSet<Role> Roles { get; set; }

    public virtual DbSet<Stones> Stones { get; set; }

    public virtual DbSet<TypeOfJewellery> TypeOfJewelleries { get; set; }

    public virtual DbSet<User> Users { get; set; }

    public virtual DbSet<WarrantyCard> WarrantyCards { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see https://go.microsoft.com/fwlink/?LinkId=723263.
        => optionsBuilder.UseSqlServer("Server=LAPTOP-0BE7JLH6\\SQLEXPRESS;uid=sa;pwd=12345;database=JewelleryOrder;TrustServerCertificate=True");

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Blog>(entity =>
        {
            entity.HasKey(e => e.BlogId).HasName("PK__Blog__54379E50328EC178");

            entity.ToTable("Blog");

            entity.Property(e => e.BlogId).HasColumnName("BlogID");
            entity.Property(e => e.ManagerId).HasColumnName("ManagerID");
            entity.Property(e => e.Title).HasMaxLength(255);

            entity.HasOne(d => d.Manager).WithMany(p => p.Blogs)
                .HasForeignKey(d => d.ManagerId)
                .HasConstraintName("FK__Blog__ManagerID__3C69FB99");
        });

        modelBuilder.Entity<Design>(entity =>
        {
            entity.HasKey(e => e.DesignId).HasName("PK__Design__32B8E17FAAEB8C8B");

            entity.ToTable("Design");

            entity.Property(e => e.DesignId).HasColumnName("DesignID");
            entity.Property(e => e.DesignName).HasMaxLength(255);
            entity.Property(e => e.ManagerId).HasColumnName("ManagerID");
            entity.Property(e => e.MasterGemstoneId).HasColumnName("MasterGemstoneID");
            entity.Property(e => e.MaterialId).HasColumnName("MaterialID");
            entity.Property(e => e.ParentId).HasColumnName("ParentID");
            entity.Property(e => e.StoneId).HasColumnName("StoneID");
            entity.Property(e => e.TypeOfJewelleryId).HasColumnName("TypeOfJewelleryID");
            entity.Property(e => e.WeightOfMaterial).HasColumnType("decimal(18, 2)");

            entity.HasOne(d => d.Manager).WithMany(p => p.Designs)
                .HasForeignKey(d => d.ManagerId)
                .HasConstraintName("FK__Design__ManagerI__4AB81AF0");

            entity.HasOne(d => d.MasterGemstone).WithMany(p => p.Designs)
                .HasForeignKey(d => d.MasterGemstoneId)
                .HasConstraintName("FK__Design__MasterGe__49C3F6B7");

            entity.HasOne(d => d.Material).WithMany(p => p.Designs)
                .HasForeignKey(d => d.MaterialId)
                .HasConstraintName("FK__Design__Material__4CA06362");

            entity.HasOne(d => d.Parent).WithMany(p => p.InverseParent)
                .HasForeignKey(d => d.ParentId)
                .HasConstraintName("FK__Design__ParentID__47DBAE45");

            entity.HasOne(d => d.Stone).WithMany(p => p.Designs)
                .HasForeignKey(d => d.StoneId)
                .HasConstraintName("FK__Design__StoneID__48CFD27E");

            entity.HasOne(d => d.TypeOfJewellery).WithMany(p => p.Designs)
                .HasForeignKey(d => d.TypeOfJewelleryId)
                .HasConstraintName("FK__Design__TypeOfJe__4BAC3F29");
        });

        modelBuilder.Entity<Have>(entity =>
        {
            entity.HasKey(e => new { e.WarrantyCardId, e.RequirementId }).HasName("PK__Have__FBE292CD11001214");

            entity.ToTable("Have");

            entity.Property(e => e.WarrantyCardId).HasColumnName("WarrantyCardID");
            entity.Property(e => e.RequirementId).HasColumnName("RequirementID");

            entity.HasOne(d => d.Requirement).WithMany(p => p.Haves)
                .HasForeignKey(d => d.RequirementId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__Have__Requiremen__5535A963");

            entity.HasOne(d => d.WarrantyCard).WithMany(p => p.Haves)
                .HasForeignKey(d => d.WarrantyCardId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__Have__WarrantyCa__5441852A");
        });

        modelBuilder.Entity<MasterGemstone>(entity =>
        {
            entity.HasKey(e => e.MasterGemstoneId).HasName("PK__MasterGe__D4657CE325820E1C");

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
            entity.HasKey(e => e.MaterialId).HasName("PK__Material__C506131755BDA89F");

            entity.ToTable("Material");

            entity.Property(e => e.MaterialId).HasColumnName("MaterialID");
            entity.Property(e => e.ManagerId).HasColumnName("ManagerID");
            entity.Property(e => e.Name).HasMaxLength(255);
            entity.Property(e => e.Price).HasColumnType("decimal(18, 2)");

            entity.HasOne(d => d.Manager).WithMany(p => p.Materials)
                .HasForeignKey(d => d.ManagerId)
                .HasConstraintName("FK__Material__Manage__412EB0B6");
        });

        modelBuilder.Entity<Payment>(entity =>
        {
            entity.HasKey(e => e.PaymentId).HasName("PK__Payment__9B556A584CDCE2CF");

            entity.ToTable("Payment");

            entity.Property(e => e.PaymentId).HasColumnName("PaymentID");
            entity.Property(e => e.Amount).HasColumnType("decimal(18, 2)");
            entity.Property(e => e.CustomerId).HasColumnName("CustomerID");
            entity.Property(e => e.Method).HasMaxLength(255);
            entity.Property(e => e.RequirementsId).HasColumnName("RequirementsID");

            entity.HasOne(d => d.Customer).WithMany(p => p.Payments)
                .HasForeignKey(d => d.CustomerId)
                .HasConstraintName("FK__Payment__Custome__5BE2A6F2");

            entity.HasOne(d => d.Requirement).WithMany(p => p.Payments)
                .HasForeignKey(d => d.RequirementsId)
                .HasConstraintName("FK__Payment__Require__5CD6CB2B");
        });

        modelBuilder.Entity<Requirement>(entity =>
        {
            entity.HasKey(e => e.RequirementId).HasName("PK__Requirem__7DF11E7DA4E2ED57");

            entity.Property(e => e.RequirementId).HasColumnName("RequirementID");
            entity.Property(e => e.DesignId).HasColumnName("DesignID");
            entity.Property(e => e.GoldPriceAtMoment).HasColumnType("decimal(18, 2)");
            entity.Property(e => e.MachiningFee).HasColumnType("decimal(18, 2)");
            entity.Property(e => e.Size).HasMaxLength(255);
            entity.Property(e => e.Status).HasMaxLength(255);
            entity.Property(e => e.StonePriceAtMoment).HasColumnType("decimal(18, 2)");
            entity.Property(e => e.TotalMoney).HasColumnType("decimal(18, 2)");
            entity.Property(e => e._3ddesign).HasColumnName("3DDesign");

            entity.HasOne(d => d.Design).WithMany(p => p.Requirements)
                .HasForeignKey(d => d.DesignId)
                .HasConstraintName("FK__Requireme__Desig__4F7CD00D");
        });

        modelBuilder.Entity<Role>(entity =>
        {
            entity.HasKey(e => e.RoleId).HasName("PK__Role__8AFACE3AA92BD7AC");

            entity.ToTable("Role");

            entity.Property(e => e.RoleId).HasColumnName("RoleID");
            entity.Property(e => e.Name).HasMaxLength(255);
        });

        modelBuilder.Entity<Stones>(entity =>
        {
            entity.HasKey(e => e.StonesId).HasName("PK__Stones__59F240A0F68BB9CA");

            entity.Property(e => e.StonesId).HasColumnName("StoneID");
            entity.Property(e => e.Kind).HasMaxLength(255);
            entity.Property(e => e.Price).HasColumnType("decimal(18, 2)");
            entity.Property(e => e.Size).HasMaxLength(255);
        });

        modelBuilder.Entity<TypeOfJewellery>(entity =>
        {
            entity.HasKey(e => e.TypeOfJewelleryId).HasName("PK__TypeOfJe__F1D25D48390D573D");

            entity.ToTable("TypeOfJewellery");

            entity.Property(e => e.TypeOfJewelleryId).HasColumnName("TypeOfJewelleryID");
            entity.Property(e => e.Name).HasMaxLength(255);
        });

        modelBuilder.Entity<User>(entity =>
        {
            entity.HasKey(e => e.UsersId).HasName("PK__Users__A349B042A024D490");

            entity.Property(e => e.UsersId).HasColumnName("UsersID");
            entity.Property(e => e.Email).HasMaxLength(255);
            entity.Property(e => e.Name).HasMaxLength(255);
            entity.Property(e => e.Phone).HasMaxLength(50);
            entity.Property(e => e.RoleId).HasColumnName("RoleID");

            entity.HasOne(d => d.Role).WithMany(p => p.Users)
                .HasForeignKey(d => d.RoleId)
                .HasConstraintName("FK__Users__RoleID__398D8EEE");

            entity.HasMany(d => d.Requirements).WithMany(p => p.Users)
                .UsingEntity<Dictionary<string, object>>(
                    "UsersRequirement",
                    r => r.HasOne<Requirement>().WithMany()
                        .HasForeignKey("RequirementId")
                        .OnDelete(DeleteBehavior.ClientSetNull)
                        .HasConstraintName("FK__UsersRequ__Requi__59063A47"),
                    l => l.HasOne<User>().WithMany()
                        .HasForeignKey("UsersId")
                        .OnDelete(DeleteBehavior.ClientSetNull)
                        .HasConstraintName("FK__UsersRequ__Users__5812160E"),
                    j =>
                    {
                        j.HasKey("UsersId", "RequirementId").HasName("PK__UsersReq__6496A1A5D914E9FC");
                        j.ToTable("UsersRequirement");
                        j.IndexerProperty<int>("UsersId").HasColumnName("UsersID");
                        j.IndexerProperty<int>("RequirementId").HasColumnName("RequirementID");
                    });
        });

        modelBuilder.Entity<WarrantyCard>(entity =>
        {
            entity.HasKey(e => e.WarrantyCardId).HasName("PK__Warranty__3C3D832A529B2241");

            entity.ToTable("WarrantyCard");

            entity.Property(e => e.WarrantyCardId).HasColumnName("WarrantyCardID");
            entity.Property(e => e.Title).HasMaxLength(255);
        });


        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
