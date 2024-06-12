CREATE DATABASE JewelleryOrder
go
use JewelleryOrder
go

CREATE TABLE Role (
    RoleID INT IDENTITY(1,1) PRIMARY KEY,
    Name NVARCHAR(50) NOT NULL
);

CREATE TABLE Users (
    UsersID INT IDENTITY(1,1) PRIMARY KEY,
	Username NVARCHAR(100) NOT NULL,
	Password NVARCHAR(100) NOT NULL,
    Name NVARCHAR(100) NOT NULL,
    Email NVARCHAR(100) NOT NULL,
    Phone NVARCHAR(10),
    RoleID INT,
    FOREIGN KEY (RoleID) REFERENCES Role(RoleID)
);

CREATE TABLE Blog (
    BlogID INT IDENTITY(1,1) PRIMARY KEY,
    Title NVARCHAR(200) NOT NULL,
    Description TEXT NOT NULL,
    Image NVARCHAR(200) NOT NULL,
    ManagerID INT,
    FOREIGN KEY (ManagerID) REFERENCES Users(UsersID)
);

CREATE TABLE Material (
    MaterialID INT IDENTITY(1,1) PRIMARY KEY,
    Name NVARCHAR(100) NOT NULL,
    Price DECIMAL(18,2) NOT NULL,
	Image NVARCHAR(200) NOT NULL,		
    ManagerID INT NOT NULL,
    FOREIGN KEY (ManagerID) REFERENCES Users(UsersID)
);

CREATE TABLE Stones (
    StoneID INT IDENTITY(1,1) PRIMARY KEY,
    Kind NVARCHAR(100) NOT NULL,
    Size DECIMAL(18,2) NOT NULL,
    Quantity INT NOT NULL,
    Price DECIMAL(18,2) NOT NULL
);

CREATE TABLE MasterGemstone (
    MasterGemstoneID INT IDENTITY(1,1) PRIMARY KEY,
    Kind NVARCHAR(100) NOT NULL,
    Size DECIMAL(18,2) NOT NULL,
    Price DECIMAL(18,2) NOT NULL,
    Clarity NVARCHAR(50) NOT NULL,
    Cut NVARCHAR(50) NOT NULL,
    Weight DECIMAL(18,2) NOT NULL,
    Shape NVARCHAR(50)NOT NULL,
	Image NVARCHAR(200) NOT NULL
);

CREATE TABLE TypeOfJewellery (
    TypeOfJewelleryID INT IDENTITY(1,1) PRIMARY KEY,
    Name NVARCHAR(100) NOT NULL,
	Image NVARCHAR(200) NOT NULL
);

CREATE TABLE Design (
    DesignID INT IDENTITY(1,1) PRIMARY KEY,
    ParentID INT,
    DesignName NVARCHAR(100) NOT NULL,
    Image NVARCHAR(200) NOT NULL,
    Description TEXT ,
    WeightOfMaterial DECIMAL(18,2) NOT NULL,
    StoneID INT,
    MasterGemstoneID INT,
    ManagerID INT,
    MaterialID INT,
    TypeOfJewelleryID INT,
    FOREIGN KEY (StoneID) REFERENCES Stones(StoneID),
    FOREIGN KEY (MasterGemstoneID) REFERENCES MasterGemstone(MasterGemstoneID),
    FOREIGN KEY (ManagerID) REFERENCES Users(UsersID),
    FOREIGN KEY (MaterialID) REFERENCES Material(MaterialID),
    FOREIGN KEY (TypeOfJewelleryID) REFERENCES TypeOfJewellery(TypeOfJewelleryID)
);

CREATE TABLE Requirements (
    RequirementID INT IDENTITY(1,1) PRIMARY KEY,
    Status NVARCHAR(50) NOT NULL,
    ExpectedDelivery DATE,
    Size NVARCHAR(50),
	Design3D NVARCHAR(200),
    MaterialPriceAtMoment DECIMAL(18,2),
    StonePriceAtMoment DECIMAL(18,2),
    MachiningFee DECIMAL(18,2),
    TotalMoney DECIMAL(18,2),
    CustomerNote TEXT,
    StaffNote TEXT,
    DesignID INT NOT NULL,
    FOREIGN KEY (DesignID) REFERENCES Design(DesignID)
);

CREATE TABLE UsersRequirements (
    UsersID INT,
    RequirementID INT,
    FOREIGN KEY (UsersID) REFERENCES Users(UsersID),
    FOREIGN KEY (RequirementID) REFERENCES Requirements(RequirementID),
	PRIMARY KEY (UsersID, RequirementID)
);

CREATE TABLE Payment (
    PaymentID INT IDENTITY(1,1) PRIMARY KEY,
    Amount DECIMAL(18,2) NOT NULL,
    Method NVARCHAR(50) NOT NULL,
    CompletedAt DATETIME,
    CustomerID INT,
    RequirementsID INT,
    FOREIGN KEY (CustomerID) REFERENCES Users(UsersID),
    FOREIGN KEY (RequirementsID) REFERENCES Requirements(RequirementID)
);

CREATE TABLE WarrantyCard (
    WarrantyCardID INT IDENTITY(1,1) PRIMARY KEY,
    Title NVARCHAR(100) NOT NULL,
    Description TEXT
);

CREATE TABLE Have (
    WarrantyCardID INT,
    RequirementID INT,
    DateCreated DATETIME,
    ExpirationDate DATETIME,
    PRIMARY KEY (WarrantyCardID, RequirementID),
    FOREIGN KEY (WarrantyCardID) REFERENCES WarrantyCard(WarrantyCardID),
    FOREIGN KEY (RequirementID) REFERENCES Requirements(RequirementID)
);

CREATE TABLE DesignRule (
    DesignRuleId INT IDENTITY(1,1) PRIMARY KEY,
    MinSizeMasterGemstone DECIMAL(18,2),
    MaxSizeMasterGemstone DECIMAL(18,2),
    MinSizeJewellery DECIMAL(18,2),
    MaxSizeJewellery DECIMAL(18,2),
	TypeOfJewelleryID INT NOT NULL,
    FOREIGN KEY (TypeOfJewelleryID) REFERENCES TypeOfJewellery(TypeOfJewelleryID)
);

GO
