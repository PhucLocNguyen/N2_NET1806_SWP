﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using Repositories;

#nullable disable

namespace Repositories.Migrations
{
    [DbContext(typeof(MyDbContext))]
    partial class MyDbContextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "8.0.6")
                .HasAnnotation("Relational:MaxIdentifierLength", 128);

            SqlServerModelBuilderExtensions.UseIdentityColumns(modelBuilder);

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityRole", b =>
                {
                    b.Property<string>("Id")
                        .HasColumnType("nvarchar(450)");

                    b.Property<string>("ConcurrencyStamp")
                        .IsConcurrencyToken()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Name")
                        .HasMaxLength(256)
                        .HasColumnType("nvarchar(256)");

                    b.Property<string>("NormalizedName")
                        .HasMaxLength(256)
                        .HasColumnType("nvarchar(256)");

                    b.HasKey("Id");

                    b.HasIndex("NormalizedName")
                        .IsUnique()
                        .HasDatabaseName("RoleNameIndex")
                        .HasFilter("[NormalizedName] IS NOT NULL");

                    b.ToTable("AspNetRoles", (string)null);

                    b.HasData(
                        new
                        {
                            Id = "29695b17-935d-45ab-98c5-7789a8eb51f8",
                            Name = "Customer",
                            NormalizedName = "CUSTOMER"
                        },
                        new
                        {
                            Id = "0ab01edf-7004-4171-aba3-c7f938a4d4e0",
                            Name = "Manager",
                            NormalizedName = "MANAGER"
                        },
                        new
                        {
                            Id = "fc4c5e26-4b86-4c24-8e0d-dc16240c9904",
                            Name = "Admin",
                            NormalizedName = "ADMIN"
                        });
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityRoleClaim<string>", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<string>("ClaimType")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("ClaimValue")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("RoleId")
                        .IsRequired()
                        .HasColumnType("nvarchar(450)");

                    b.HasKey("Id");

                    b.HasIndex("RoleId");

                    b.ToTable("AspNetRoleClaims", (string)null);
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserClaim<string>", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<string>("ClaimType")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("ClaimValue")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("UserId")
                        .IsRequired()
                        .HasColumnType("nvarchar(450)");

                    b.HasKey("Id");

                    b.HasIndex("UserId");

                    b.ToTable("AspNetUserClaims", (string)null);
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserLogin<string>", b =>
                {
                    b.Property<string>("LoginProvider")
                        .HasColumnType("nvarchar(450)");

                    b.Property<string>("ProviderKey")
                        .HasColumnType("nvarchar(450)");

                    b.Property<string>("ProviderDisplayName")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("UserId")
                        .IsRequired()
                        .HasColumnType("nvarchar(450)");

                    b.HasKey("LoginProvider", "ProviderKey");

                    b.HasIndex("UserId");

                    b.ToTable("AspNetUserLogins", (string)null);
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserRole<string>", b =>
                {
                    b.Property<string>("UserId")
                        .HasColumnType("nvarchar(450)");

                    b.Property<string>("RoleId")
                        .HasColumnType("nvarchar(450)");

                    b.HasKey("UserId", "RoleId");

                    b.HasIndex("RoleId");

                    b.ToTable("AspNetUserRoles", (string)null);
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserToken<string>", b =>
                {
                    b.Property<string>("UserId")
                        .HasColumnType("nvarchar(450)");

                    b.Property<string>("LoginProvider")
                        .HasColumnType("nvarchar(450)");

                    b.Property<string>("Name")
                        .HasColumnType("nvarchar(450)");

                    b.Property<string>("Value")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("UserId", "LoginProvider", "Name");

                    b.ToTable("AspNetUserTokens", (string)null);
                });

            modelBuilder.Entity("Repositories.AppUser", b =>
                {
                    b.Property<string>("Id")
                        .HasColumnType("nvarchar(450)");

                    b.Property<int>("AccessFailedCount")
                        .HasColumnType("int");

                    b.Property<string>("ConcurrencyStamp")
                        .IsConcurrencyToken()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Email")
                        .HasMaxLength(256)
                        .HasColumnType("nvarchar(256)");

                    b.Property<bool>("EmailConfirmed")
                        .HasColumnType("bit");

                    b.Property<bool>("LockoutEnabled")
                        .HasColumnType("bit");

                    b.Property<DateTimeOffset?>("LockoutEnd")
                        .HasColumnType("datetimeoffset");

                    b.Property<string>("NormalizedEmail")
                        .HasMaxLength(256)
                        .HasColumnType("nvarchar(256)");

                    b.Property<string>("NormalizedUserName")
                        .HasMaxLength(256)
                        .HasColumnType("nvarchar(256)");

                    b.Property<string>("PasswordHash")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("PhoneNumber")
                        .HasColumnType("nvarchar(max)");

                    b.Property<bool>("PhoneNumberConfirmed")
                        .HasColumnType("bit");

                    b.Property<string>("SecurityStamp")
                        .HasColumnType("nvarchar(max)");

                    b.Property<bool>("TwoFactorEnabled")
                        .HasColumnType("bit");

                    b.Property<string>("UserName")
                        .HasMaxLength(256)
                        .HasColumnType("nvarchar(256)");

                    b.HasKey("Id");

                    b.HasIndex("NormalizedEmail")
                        .HasDatabaseName("EmailIndex");

                    b.HasIndex("NormalizedUserName")
                        .IsUnique()
                        .HasDatabaseName("UserNameIndex")
                        .HasFilter("[NormalizedUserName] IS NOT NULL");

                    b.ToTable("AspNetUsers", (string)null);
                });

            modelBuilder.Entity("Repositories.Blog", b =>
                {
                    b.Property<int>("BlogId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasColumnName("BlogID");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("BlogId"));

                    b.Property<string>("Description")
                        .HasColumnType("text");

                    b.Property<string>("Image")
                        .HasMaxLength(200)
                        .HasColumnType("nvarchar(200)");

                    b.Property<string>("ManagerId")
                        .HasColumnType("nvarchar(450)")
                        .HasColumnName("ManagerID");

                    b.Property<string>("Title")
                        .IsRequired()
                        .HasMaxLength(200)
                        .HasColumnType("nvarchar(200)");

                    b.HasKey("BlogId")
                        .HasName("PK__Blog__54379E5022ECC203");

                    b.HasIndex("ManagerId");

                    b.ToTable("Blog", (string)null);
                });

            modelBuilder.Entity("Repositories.Design", b =>
                {
                    b.Property<int>("DesignId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasColumnName("DesignID");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("DesignId"));

                    b.Property<string>("Description")
                        .HasColumnType("text");

                    b.Property<string>("DesignName")
                        .IsRequired()
                        .HasMaxLength(100)
                        .HasColumnType("nvarchar(100)");

                    b.Property<string>("Image")
                        .HasMaxLength(200)
                        .HasColumnType("nvarchar(200)");

                    b.Property<string>("ManagerId")
                        .HasColumnType("nvarchar(450)")
                        .HasColumnName("ManagerID");

                    b.Property<int?>("MasterGemstoneId")
                        .HasColumnType("int")
                        .HasColumnName("MasterGemstoneID");

                    b.Property<int?>("MaterialId")
                        .HasColumnType("int")
                        .HasColumnName("MaterialID");

                    b.Property<int?>("ParentId")
                        .HasColumnType("int")
                        .HasColumnName("ParentID");

                    b.Property<int?>("StoneId")
                        .HasColumnType("int")
                        .HasColumnName("StoneID");

                    b.Property<int?>("TypeOfJewelleryId")
                        .HasColumnType("int")
                        .HasColumnName("TypeOfJewelleryID");

                    b.Property<decimal?>("WeightOfMaterial")
                        .HasColumnType("decimal(18, 2)");

                    b.HasKey("DesignId")
                        .HasName("PK__Design__32B8E17F04FFD0CA");

                    b.HasIndex("ManagerId");

                    b.HasIndex("MasterGemstoneId");

                    b.HasIndex("MaterialId");

                    b.HasIndex("StoneId");

                    b.HasIndex("TypeOfJewelleryId");

                    b.ToTable("Design", (string)null);
                });

            modelBuilder.Entity("Repositories.Have", b =>
                {
                    b.Property<int>("WarrantyCardId")
                        .HasColumnType("int")
                        .HasColumnName("WarrantyCardID");

                    b.Property<int>("RequirementId")
                        .HasColumnType("int")
                        .HasColumnName("RequirementID");

                    b.Property<DateTime?>("DateCreated")
                        .HasColumnType("datetime");

                    b.Property<DateTime?>("ExpirationDate")
                        .HasColumnType("datetime");

                    b.HasKey("WarrantyCardId", "RequirementId")
                        .HasName("PK__Have__FBE292CD3DC179BA");

                    b.HasIndex("RequirementId");

                    b.ToTable("Have", (string)null);
                });

            modelBuilder.Entity("Repositories.MasterGemstone", b =>
                {
                    b.Property<int>("MasterGemstoneId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasColumnName("MasterGemstoneID");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("MasterGemstoneId"));

                    b.Property<string>("Clarity")
                        .HasMaxLength(50)
                        .HasColumnType("nvarchar(50)");

                    b.Property<string>("Cut")
                        .HasMaxLength(50)
                        .HasColumnType("nvarchar(50)");

                    b.Property<string>("Kind")
                        .IsRequired()
                        .HasMaxLength(100)
                        .HasColumnType("nvarchar(100)");

                    b.Property<decimal?>("Price")
                        .HasColumnType("decimal(18, 2)");

                    b.Property<string>("Shape")
                        .HasMaxLength(50)
                        .HasColumnType("nvarchar(50)");

                    b.Property<string>("Size")
                        .HasMaxLength(50)
                        .HasColumnType("nvarchar(50)");

                    b.Property<decimal?>("Weight")
                        .HasColumnType("decimal(18, 2)");

                    b.HasKey("MasterGemstoneId")
                        .HasName("PK__MasterGe__D4657CE37E05F146");

                    b.ToTable("MasterGemstone", (string)null);
                });

            modelBuilder.Entity("Repositories.Material", b =>
                {
                    b.Property<int>("MaterialId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasColumnName("MaterialID");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("MaterialId"));

                    b.Property<string>("ManagerId")
                        .IsRequired()
                        .HasColumnType("nvarchar(450)")
                        .HasColumnName("ManagerID");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasMaxLength(100)
                        .HasColumnType("nvarchar(100)");

                    b.Property<decimal>("Price")
                        .HasColumnType("decimal(18, 2)");

                    b.HasKey("MaterialId")
                        .HasName("PK__Material__C506131745B87B4A");

                    b.HasIndex("ManagerId");

                    b.ToTable("Material", (string)null);
                });

            modelBuilder.Entity("Repositories.Payment", b =>
                {
                    b.Property<int>("PaymentId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasColumnName("PaymentID");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("PaymentId"));

                    b.Property<decimal>("Amount")
                        .HasColumnType("decimal(18, 2)");

                    b.Property<DateTime?>("CompletedAt")
                        .HasColumnType("datetime");

                    b.Property<string>("CustomerId")
                        .HasColumnType("nvarchar(450)")
                        .HasColumnName("CustomerID");

                    b.Property<string>("Method")
                        .IsRequired()
                        .HasMaxLength(50)
                        .HasColumnType("nvarchar(50)");

                    b.Property<int?>("RequirementsId")
                        .HasColumnType("int")
                        .HasColumnName("RequirementsID");

                    b.HasKey("PaymentId")
                        .HasName("PK__Payment__9B556A58473D0C7A");

                    b.HasIndex("CustomerId");

                    b.HasIndex("RequirementsId");

                    b.ToTable("Payment", (string)null);
                });

            modelBuilder.Entity("Repositories.Requirement", b =>
                {
                    b.Property<int>("RequirementId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasColumnName("RequirementID");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("RequirementId"));

                    b.Property<string>("CustomerNote")
                        .HasColumnType("text");

                    b.Property<string>("Design3D")
                        .HasMaxLength(200)
                        .HasColumnType("nvarchar(200)");

                    b.Property<int?>("DesignId")
                        .HasColumnType("int")
                        .HasColumnName("DesignID");

                    b.Property<DateOnly?>("ExpectedDelivery")
                        .HasColumnType("date");

                    b.Property<decimal?>("GoldPriceAtMoment")
                        .HasColumnType("decimal(18, 2)");

                    b.Property<decimal?>("MachiningFee")
                        .HasColumnType("decimal(18, 2)");

                    b.Property<string>("Size")
                        .HasMaxLength(50)
                        .HasColumnType("nvarchar(50)");

                    b.Property<string>("StaffNote")
                        .HasColumnType("text");

                    b.Property<string>("Status")
                        .IsRequired()
                        .HasMaxLength(50)
                        .HasColumnType("nvarchar(50)");

                    b.Property<decimal?>("StonePriceAtMoment")
                        .HasColumnType("decimal(18, 2)");

                    b.Property<decimal?>("TotalMoney")
                        .HasColumnType("decimal(18, 2)");

                    b.HasKey("RequirementId")
                        .HasName("PK__Requirem__7DF11E7DF5D9CCB5");

                    b.HasIndex("DesignId");

                    b.ToTable("Requirements");
                });

            modelBuilder.Entity("Repositories.Stones", b =>
                {
                    b.Property<int>("StoneId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasColumnName("StoneID");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("StoneId"));

                    b.Property<string>("Kind")
                        .IsRequired()
                        .HasMaxLength(100)
                        .HasColumnType("nvarchar(100)");

                    b.Property<decimal?>("Price")
                        .HasColumnType("decimal(18, 2)");

                    b.Property<int?>("Quantity")
                        .HasColumnType("int");

                    b.Property<string>("Size")
                        .HasMaxLength(50)
                        .HasColumnType("nvarchar(50)");

                    b.HasKey("StoneId")
                        .HasName("PK__Stones__59F240A0AC6587A4");

                    b.ToTable("Stones");
                });

            modelBuilder.Entity("Repositories.TypeOfJewellery", b =>
                {
                    b.Property<int>("TypeOfJewelleryId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasColumnName("TypeOfJewelleryID");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("TypeOfJewelleryId"));

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasMaxLength(100)
                        .HasColumnType("nvarchar(100)");

                    b.HasKey("TypeOfJewelleryId")
                        .HasName("PK__TypeOfJe__F1D25D486FD00EC5");

                    b.ToTable("TypeOfJewellery", (string)null);
                });

            modelBuilder.Entity("Repositories.UsersRequirement", b =>
                {
                    b.Property<int>("UsersRequirementId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasColumnName("UsersRequirementID");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("UsersRequirementId"));

                    b.Property<int?>("RequirementId")
                        .HasColumnType("int")
                        .HasColumnName("RequirementID");

                    b.Property<string>("UsersId")
                        .HasColumnType("nvarchar(450)")
                        .HasColumnName("UsersID");

                    b.HasKey("UsersRequirementId")
                        .HasName("PK__UsersReq__EC83D35FE7331F38");

                    b.HasIndex("RequirementId");

                    b.HasIndex("UsersId");

                    b.ToTable("UsersRequirements");
                });

            modelBuilder.Entity("Repositories.WarrantyCard", b =>
                {
                    b.Property<int>("WarrantyCardId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasColumnName("WarrantyCardID");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("WarrantyCardId"));

                    b.Property<string>("Description")
                        .HasColumnType("text");

                    b.Property<string>("Title")
                        .IsRequired()
                        .HasMaxLength(100)
                        .HasColumnType("nvarchar(100)");

                    b.HasKey("WarrantyCardId")
                        .HasName("PK__Warranty__3C3D832A18E09ED0");

                    b.ToTable("WarrantyCard", (string)null);
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityRoleClaim<string>", b =>
                {
                    b.HasOne("Microsoft.AspNetCore.Identity.IdentityRole", null)
                        .WithMany()
                        .HasForeignKey("RoleId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserClaim<string>", b =>
                {
                    b.HasOne("Repositories.AppUser", null)
                        .WithMany()
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserLogin<string>", b =>
                {
                    b.HasOne("Repositories.AppUser", null)
                        .WithMany()
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserRole<string>", b =>
                {
                    b.HasOne("Microsoft.AspNetCore.Identity.IdentityRole", null)
                        .WithMany()
                        .HasForeignKey("RoleId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("Repositories.AppUser", null)
                        .WithMany()
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserToken<string>", b =>
                {
                    b.HasOne("Repositories.AppUser", null)
                        .WithMany()
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("Repositories.Blog", b =>
                {
                    b.HasOne("Repositories.AppUser", "Manager")
                        .WithMany("Blogs")
                        .HasForeignKey("ManagerId");

                    b.Navigation("Manager");
                });

            modelBuilder.Entity("Repositories.Design", b =>
                {
                    b.HasOne("Repositories.AppUser", "Manager")
                        .WithMany("Designs")
                        .HasForeignKey("ManagerId");

                    b.HasOne("Repositories.MasterGemstone", "MasterGemstone")
                        .WithMany("Designs")
                        .HasForeignKey("MasterGemstoneId")
                        .HasConstraintName("FK__Design__MasterGe__48CFD27E");

                    b.HasOne("Repositories.Material", "Material")
                        .WithMany("Designs")
                        .HasForeignKey("MaterialId")
                        .HasConstraintName("FK__Design__Material__4AB81AF0");

                    b.HasOne("Repositories.Stones", "Stone")
                        .WithMany("Designs")
                        .HasForeignKey("StoneId")
                        .HasConstraintName("FK__Design__StoneID__47DBAE45");

                    b.HasOne("Repositories.TypeOfJewellery", "TypeOfJewellery")
                        .WithMany("Designs")
                        .HasForeignKey("TypeOfJewelleryId")
                        .HasConstraintName("FK__Design__TypeOfJe__4BAC3F29");

                    b.Navigation("Manager");

                    b.Navigation("MasterGemstone");

                    b.Navigation("Material");

                    b.Navigation("Stone");

                    b.Navigation("TypeOfJewellery");
                });

            modelBuilder.Entity("Repositories.Have", b =>
                {
                    b.HasOne("Repositories.Requirement", "Requirement")
                        .WithMany("Haves")
                        .HasForeignKey("RequirementId")
                        .IsRequired()
                        .HasConstraintName("FK__Have__Requiremen__5BE2A6F2");

                    b.HasOne("Repositories.WarrantyCard", "WarrantyCard")
                        .WithMany("Haves")
                        .HasForeignKey("WarrantyCardId")
                        .IsRequired()
                        .HasConstraintName("FK__Have__WarrantyCa__5AEE82B9");

                    b.Navigation("Requirement");

                    b.Navigation("WarrantyCard");
                });

            modelBuilder.Entity("Repositories.Material", b =>
                {
                    b.HasOne("Repositories.AppUser", "Manager")
                        .WithMany("Materials")
                        .HasForeignKey("ManagerId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Manager");
                });

            modelBuilder.Entity("Repositories.Payment", b =>
                {
                    b.HasOne("Repositories.AppUser", "Customer")
                        .WithMany("Payments")
                        .HasForeignKey("CustomerId");

                    b.HasOne("Repositories.Requirement", "Requirements")
                        .WithMany("Payments")
                        .HasForeignKey("RequirementsId")
                        .HasConstraintName("FK__Payment__Require__5629CD9C");

                    b.Navigation("Customer");

                    b.Navigation("Requirements");
                });

            modelBuilder.Entity("Repositories.Requirement", b =>
                {
                    b.HasOne("Repositories.Design", "Design")
                        .WithMany("Requirements")
                        .HasForeignKey("DesignId");

                    b.Navigation("Design");
                });

            modelBuilder.Entity("Repositories.UsersRequirement", b =>
                {
                    b.HasOne("Repositories.Requirement", "Requirement")
                        .WithMany("UsersRequirements")
                        .HasForeignKey("RequirementId")
                        .HasConstraintName("FK__UsersRequ__Requi__52593CB8");

                    b.HasOne("Repositories.AppUser", "Users")
                        .WithMany("UsersRequirements")
                        .HasForeignKey("UsersId");

                    b.Navigation("Requirement");

                    b.Navigation("Users");
                });

            modelBuilder.Entity("Repositories.AppUser", b =>
                {
                    b.Navigation("Blogs");

                    b.Navigation("Designs");

                    b.Navigation("Materials");

                    b.Navigation("Payments");

                    b.Navigation("UsersRequirements");
                });

            modelBuilder.Entity("Repositories.Design", b =>
                {
                    b.Navigation("Requirements");
                });

            modelBuilder.Entity("Repositories.MasterGemstone", b =>
                {
                    b.Navigation("Designs");
                });

            modelBuilder.Entity("Repositories.Material", b =>
                {
                    b.Navigation("Designs");
                });

            modelBuilder.Entity("Repositories.Requirement", b =>
                {
                    b.Navigation("Haves");

                    b.Navigation("Payments");

                    b.Navigation("UsersRequirements");
                });

            modelBuilder.Entity("Repositories.Stones", b =>
                {
                    b.Navigation("Designs");
                });

            modelBuilder.Entity("Repositories.TypeOfJewellery", b =>
                {
                    b.Navigation("Designs");
                });

            modelBuilder.Entity("Repositories.WarrantyCard", b =>
                {
                    b.Navigation("Haves");
                });
#pragma warning restore 612, 618
        }
    }
}
