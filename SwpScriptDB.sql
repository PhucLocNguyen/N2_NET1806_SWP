CREATE DATABASE JewelleryOrder
go
use JewelleryOrder
go


CREATE TABLE Role (
    RoleID INT IDENTITY(1,1) PRIMARY KEY,
    Name NVARCHAR(255) NOT NULL
);

CREATE TABLE Users (
    UsersID INT IDENTITY(1,1) PRIMARY KEY,
    Name NVARCHAR(255) NOT NULL,
    Email NVARCHAR(255),
    Phone NVARCHAR(50),
    RoleID INT,
    FOREIGN KEY (RoleID) REFERENCES Role(RoleID)
);

CREATE TABLE Blog (
    BlogID INT IDENTITY(1,1) PRIMARY KEY,
    Title NVARCHAR(255) NOT NULL,
    Description NVARCHAR(MAX),
    Image NVARCHAR(MAX),
    ManagerID INT,
    FOREIGN KEY (ManagerID) REFERENCES Users(UsersID)
);

CREATE TABLE Stones (
    StoneID INT IDENTITY(1,1) PRIMARY KEY,
    Kind NVARCHAR(255) NOT NULL,
    Size NVARCHAR(255),
    Quantity INT,
    Price DECIMAL(18,2)
);

CREATE TABLE Material (
    MaterialID INT IDENTITY(1,1) PRIMARY KEY,
    Name NVARCHAR(255) NOT NULL,
    Price DECIMAL(18,2),
    ManagerID INT,
    FOREIGN KEY (ManagerID) REFERENCES Users(UsersID)
);

CREATE TABLE MasterGemstone (
    MasterGemstoneID INT IDENTITY(1,1) PRIMARY KEY,
    Kind NVARCHAR(255) NOT NULL,
    Size NVARCHAR(255),
    Price DECIMAL(18,2),
    Clarity NVARCHAR(255),
    Cut NVARCHAR(255)
);

CREATE TABLE TypeOfJewellery (
    TypeOfJewelleryID INT IDENTITY(1,1) PRIMARY KEY,
    Name NVARCHAR(255) NOT NULL
);

CREATE TABLE Design (
    DesignID INT IDENTITY(1,1) PRIMARY KEY,
    ParentID INT,
    Image NVARCHAR(MAX),
    DesignName NVARCHAR(255),
    WeightOfMaterial DECIMAL(18,2),
    StoneID INT,
    MasterGemstoneID INT,
    ManagerID INT,
    TypeOfJewelleryID INT,
    MaterialID INT,
    FOREIGN KEY (ParentID) REFERENCES Design(DesignID),
    FOREIGN KEY (StoneID) REFERENCES Stones(StoneID),
    FOREIGN KEY (MasterGemstoneID) REFERENCES MasterGemstone(MasterGemstoneID),
    FOREIGN KEY (ManagerID) REFERENCES Users(UsersID),
    FOREIGN KEY (TypeOfJewelleryID) REFERENCES TypeOfJewellery(TypeOfJewelleryID),
    FOREIGN KEY (MaterialID) REFERENCES Material(MaterialID)
);

CREATE TABLE Requirements (
    RequirementID INT IDENTITY(1,1) PRIMARY KEY,
    Status NVARCHAR(255),
    ExpectedDelivery DATE,
    Size NVARCHAR(255),
    DesignID INT,
    [3DDesign] NVARCHAR(MAX),
    GoldPriceAtMoment DECIMAL(18,2),
    StonePriceAtMoment DECIMAL(18,2),
    MachiningFee DECIMAL(18,2),
    TotalMoney DECIMAL(18,2),
    CustomerNotes NVARCHAR(MAX),
    SaleStaffNote NVARCHAR(MAX),
    FOREIGN KEY (DesignID) REFERENCES Design(DesignID)
);

CREATE TABLE WarrantyCard (
    WarrantyCardID INT IDENTITY(1,1) PRIMARY KEY,
    Title NVARCHAR(255) NOT NULL,
    Description NVARCHAR(MAX)
);

CREATE TABLE Have (
    WarrantyCardID INT,
    RequirementID INT,
    DateCreated DATE,
    ExpirationDate DATE,
    PRIMARY KEY (WarrantyCardID, RequirementID),
    FOREIGN KEY (WarrantyCardID) REFERENCES WarrantyCard(WarrantyCardID),
    FOREIGN KEY (RequirementID) REFERENCES Requirements(RequirementID)
);

CREATE TABLE UsersRequirement (
    UsersID INT,
    RequirementID INT,
    PRIMARY KEY (UsersID, RequirementID),
    FOREIGN KEY (UsersID) REFERENCES Users(UsersID),
    FOREIGN KEY (RequirementID) REFERENCES Requirements(RequirementID)
);

CREATE TABLE Payment (
    PaymentID INT IDENTITY(1,1) PRIMARY KEY,
    Amount DECIMAL(18,2),
    Method NVARCHAR(255),
    CompletedAt DATE,
    CustomerID INT,
    RequirementID INT,
    FOREIGN KEY (CustomerID) REFERENCES Users(UsersID),
    FOREIGN KEY (RequirementID) REFERENCES Requirements(RequirementID)
);

GO
