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
    Name NVARCHAR(100) NOT NULL,
    Email NVARCHAR(100) NOT NULL,
    Phone NVARCHAR(20),
    RoleID INT,
    FOREIGN KEY (RoleID) REFERENCES Role(RoleID)
);

CREATE TABLE Blog (
    BlogID INT IDENTITY(1,1) PRIMARY KEY,
    Title NVARCHAR(200) NOT NULL,
    Description TEXT,
    Image NVARCHAR(200),
    ManagerID INT,
    FOREIGN KEY (ManagerID) REFERENCES Users(UsersID)
);

CREATE TABLE Material (
    MaterialID INT IDENTITY(1,1) PRIMARY KEY,
    Name NVARCHAR(100) NOT NULL,
    Price DECIMAL(18,2) NOT NULL,
    ManagerID INT,
    FOREIGN KEY (ManagerID) REFERENCES Users(UsersID)
);

CREATE TABLE Stones (
    StoneID INT IDENTITY(1,1) PRIMARY KEY,
    Kind NVARCHAR(100) NOT NULL,
    Size NVARCHAR(50),
    Quantity INT,
    Price DECIMAL(18,2)
);

CREATE TABLE MasterGemstone (
    MasterGemstoneID INT IDENTITY(1,1) PRIMARY KEY,
    Kind NVARCHAR(100) NOT NULL,
    Size NVARCHAR(50),
    Price DECIMAL(18,2),
    Clarity NVARCHAR(50),
    Cut NVARCHAR(50),
    Weight DECIMAL(18,2),
    Shape NVARCHAR(50)
);

CREATE TABLE TypeOfJewellery (
    TypeOfJewelleryID INT IDENTITY(1,1) PRIMARY KEY,
    Name NVARCHAR(100) NOT NULL
);

CREATE TABLE Design (
    DesignID INT IDENTITY(1,1) PRIMARY KEY,
    ParentID INT,
    DesignName NVARCHAR(100) NOT NULL,
    Image NVARCHAR(200),
    Description TEXT,
    WeightOfMaterial DECIMAL(18,2),
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
    Design BIT,
    GoldPriceAtMoment DECIMAL(18,2),
    StonePriceAtMoment DECIMAL(18,2),
    MachiningFee DECIMAL(18,2),
    TotalMoney DECIMAL(18,2),
    CustomerNote TEXT,
    StaffNote TEXT,
    DesignID INT,
    FOREIGN KEY (DesignID) REFERENCES Design(DesignID)
);

CREATE TABLE UsersRequirements (
    UsersRequirementID INT IDENTITY(1,1) PRIMARY KEY,
    UsersID INT,
    RequirementID INT,
    FOREIGN KEY (UsersID) REFERENCES Users(UsersID),
    FOREIGN KEY (RequirementID) REFERENCES Requirements(RequirementID)
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

GO
