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
    Email NVARCHAR(100) NOT NULL UNIQUE,
    Phone NVARCHAR(10) ,
	Image NVARCHAR(Max),
    RoleID INT,
    FOREIGN KEY (RoleID) REFERENCES Role(RoleID)
);

CREATE TABLE Blog (
    BlogID INT IDENTITY(1,1) PRIMARY KEY,
    Title NVARCHAR(200) NOT NULL,
    Description NVARCHAR(Max) NOT NULL,
    Image NVARCHAR(Max) NOT NULL,
    ManagerID INT,
    FOREIGN KEY (ManagerID) REFERENCES Users(UsersID)
);

CREATE TABLE Material (
    MaterialID INT IDENTITY(1,1) PRIMARY KEY,
    Name NVARCHAR(100) NOT NULL,
    Price DECIMAL(18,2) NOT NULL,
	Image NVARCHAR(Max) NOT NULL,		
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
	Image NVARCHAR(Max) NOT NULL
);

CREATE TABLE TypeOfJewellery (
    TypeOfJewelleryID INT IDENTITY(1,1) PRIMARY KEY,
    Name NVARCHAR(100) NOT NULL,
	Image NVARCHAR(Max) NOT NULL
);

CREATE TABLE Design (
    DesignID INT IDENTITY(1,1) PRIMARY KEY,
    ParentID INT,
    DesignName NVARCHAR(100) NOT NULL,
    Image NVARCHAR(Max) NOT NULL,
    Description NVARCHAR(Max) ,
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
	CreatedDate DATE,
    ExpectedDelivery DATE,
    Size DECIMAL(18,2) NOT NULL,
	Design3D NVARCHAR(Max),
	WeightOfMaterial DECIMAL(18,2),
    MaterialPriceAtMoment DECIMAL(18,2),
	MasterGemStonePriceAtMoment DECIMAL(18,2),
    StonePriceAtMoment DECIMAL(18,2),
    MachiningFee DECIMAL(18,2),
    TotalMoney DECIMAL(18,2),
    CustomerNote NVARCHAR(Max),
    StaffNote NVARCHAR(Max),
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
	Status NVARCHAR(50) NOT NULL,
	Content NVARCHAR(200),
    CustomerID INT,
    RequirementsID INT,
    FOREIGN KEY (CustomerID) REFERENCES Users(UsersID),
    FOREIGN KEY (RequirementsID) REFERENCES Requirements(RequirementID)
);

CREATE TABLE WarrantyCard (
    WarrantyCardID INT IDENTITY(1,1) PRIMARY KEY,
    Title NVARCHAR(100) NOT NULL,
    Description NVARCHAR(Max)
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

CREATE TABLE DesignRule (
    DesignRuleId INT IDENTITY(1,1) PRIMARY KEY,
    MinSizeMasterGemstone DECIMAL(18,2),
    MaxSizeMasterGemstone DECIMAL(18,2),
    MinSizeJewellery DECIMAL(18,2),
    MaxSizeJewellery DECIMAL(18,2),
	TypeOfJewelleryID INT NOT NULL,
    FOREIGN KEY (TypeOfJewelleryID) REFERENCES TypeOfJewellery(TypeOfJewelleryID)
);

CREATE TABLE Conversations (
    ConversationId INT IDENTITY(1,1) PRIMARY KEY ,
    User1Id INT NOT NULL,
    User2Id INT NOT NULL,
    CONSTRAINT FK_User1 FOREIGN KEY (User1Id) REFERENCES Users(UsersId),
    CONSTRAINT FK_User2 FOREIGN KEY (User2Id) REFERENCES Users(UsersId)
);
CREATE TABLE Messages (
    MessageId INT IDENTITY(1,1) PRIMARY KEY,
    ConversationId INT NOT NULL,
    SenderId INT NOT NULL,
    ReceiverId INT NOT NULL,
    Content NVARCHAR(MAX) NOT NULL,
    Timestamp DATETIME NOT NULL DEFAULT GETDATE(),
    IsRead BIT NOT NULL DEFAULT 0,
    CONSTRAINT FK_Conversation FOREIGN KEY (ConversationId) REFERENCES Conversations(ConversationId),
    CONSTRAINT FK_Sender FOREIGN KEY (SenderId) REFERENCES Users(UsersId),
    CONSTRAINT FK_Receiver FOREIGN KEY (ReceiverId) REFERENCES Users(UsersId)
);

GO

GO
insert into MasterGemstone values ('Diamond',4,22637150,'VVS1','EX',0.2,'Round','https://firebasestorage.googleapis.com/v0/b/fir-e797a.appspot.com/o/MasterGemstone%2F1.jpg?alt=media&token=f09d8188-0790-487c-8d29-7a16c7ba8df0')
insert into MasterGemstone values ('Diamond',5,80120250,'VVS2','VG', 0.4,'Marquise','https://firebasestorage.googleapis.com/v0/b/fir-e797a.appspot.com/o/MasterGemstone%2F2.jpg?alt=media&token=835fd8f9-e96d-475b-9bfb-23da38469231')
insert into MasterGemstone values ('Diamond',6,221284500,'VVS1','EX',0.8,'Round','https://firebasestorage.googleapis.com/v0/b/fir-e797a.appspot.com/o/MasterGemstone%2F3.jpg?alt=media&token=ce98cf5e-b110-49c0-b0ea-8fefa8113c84')
insert into MasterGemstone values ('Diamond',7,766400000,'VVS2','VG',1.2,'Princess','https://firebasestorage.googleapis.com/v0/b/fir-e797a.appspot.com/o/MasterGemstone%2F4.jpg?alt=media&token=a2b3eee0-1206-4bd1-840b-e894ac84e177')
insert into MasterGemstone values ('Diamond',8, 979400000,'VS1','EX',2.0,'Baguete','https://firebasestorage.googleapis.com/v0/b/fir-e797a.appspot.com/o/MasterGemstone%2F5.jpg?alt=media&token=b9fbfe24-07b2-498f-b65d-b4ed54acafc2')
insert into MasterGemstone values ('Diamond',9,1298000000,'VS2','EX',2.75,'Pear','https://firebasestorage.googleapis.com/v0/b/fir-e797a.appspot.com/o/MasterGemstone%2F6.jpg?alt=media&token=1279d357-159d-4088-b89a-22e485f5029c')
insert into MasterGemstone values ('Diamond',4.5,116820000,'VVS1','EX',0.33,'Oval','https://firebasestorage.googleapis.com/v0/b/fir-e797a.appspot.com/o/MasterGemstone%2F7.jpg?alt=media&token=67bc9c39-1652-41e4-8783-c7c17ac532c6')
insert into MasterGemstone values ('Diamond',5.5,297360000,'IF','VG',0.7,'Marquise','https://firebasestorage.googleapis.com/v0/b/fir-e797a.appspot.com/o/MasterGemstone%2F8.jpg?alt=media&token=ffd8c905-47d2-43ef-83c2-05df7b6b56cf')
insert into MasterGemstone values ('Diamond',6.5,467280000,'VS1','VG',1.1,'Pear','https://firebasestorage.googleapis.com/v0/b/fir-e797a.appspot.com/o/MasterGemstone%2F9.jpg?alt=media&token=878e5fdd-9ac3-4cb9-8264-39f6e6158b7a')
insert into MasterGemstone values ('Diamond',7.5,973500000 ,'VVS2','VG',1.65,'Heart','https://firebasestorage.googleapis.com/v0/b/fir-e797a.appspot.com/o/MasterGemstone%2F10.jpg?alt=media&token=1710889a-0b11-48c5-8ec5-4f4929c1a038')
insert into MasterGemstone values ('Diamond',8.5,955800000,'VS2','EX',2.25,'Emerald','https://firebasestorage.googleapis.com/v0/b/fir-e797a.appspot.com/o/MasterGemstone%2F11.jpg?alt=media&token=f92f41f4-ac07-4345-b23b-4b281fee3d5e')
insert into MasterGemstone values ('Diamond',9.5,293922027,'IF','GD',3.1,'Trillion','https://firebasestorage.googleapis.com/v0/b/fir-e797a.appspot.com/o/MasterGemstone%2F12.jpg?alt=media&token=4f8e6bbc-4949-4a9d-b17c-a1285da2a2f5')

insert into MasterGemstone values ('Ruby',6.2,14445808,'VVS2','EX',0.96,'Oval','https://firebasestorage.googleapis.com/v0/b/fir-e797a.appspot.com/o/MasterGemstone%2F13.jpg?alt=media&token=d778b96c-5cb4-472f-ab02-2433896c7a44')
insert into MasterGemstone values ('Ruby',6.9,80439204,'VVS1','EX',1.42,'Oval','https://firebasestorage.googleapis.com/v0/b/fir-e797a.appspot.com/o/MasterGemstone%2F13.jpg?alt=media&token=d778b96c-5cb4-472f-ab02-2433896c7a44')
insert into MasterGemstone values ('Ruby',7.3,33032434,'VVS2','EX',1.29,'Oval','https://firebasestorage.googleapis.com/v0/b/fir-e797a.appspot.com/o/MasterGemstone%2F13.jpg?alt=media&token=d778b96c-5cb4-472f-ab02-2433896c7a44')

insert into MasterGemstone values ('Sapphire',7.1,32031567,'VVS2','EX',1.34,'Octagon','https://firebasestorage.googleapis.com/v0/b/fir-e797a.appspot.com/o/MasterGemstone%2F15.jpg?alt=media&token=6e77c627-eb94-49bc-89cf-85e6cd265553')
insert into MasterGemstone values ('Sapphire',8.5,39038401,'VVS1','EX',2.5,'Octagon','https://firebasestorage.googleapis.com/v0/b/fir-e797a.appspot.com/o/MasterGemstone%2F15.jpg?alt=media&token=6e77c627-eb94-49bc-89cf-85e6cd265553')
insert into MasterGemstone values ('Sapphire',8,16816604,'VVS1','EX',2.1,'Octagon','https://firebasestorage.googleapis.com/v0/b/fir-e797a.appspot.com/o/MasterGemstone%2F15.jpg?alt=media&token=6e77c627-eb94-49bc-89cf-85e6cd265553')



insert into MasterGemstone
values ('Emerald',7.5,23402743,'VVS2','EX',1.62,'Emerald','https://firebasestorage.googleapis.com/v0/b/fir-e797a.appspot.com/o/MasterGemstone%2F16.jpg?alt=media&token=42211d9c-fe7e-4b9b-86f9-4647d450346f')

insert into MasterGemstone
values ('Emerald',9.5,26245867,'IF','EX',2.85,'Emerald','https://firebasestorage.googleapis.com/v0/b/fir-e797a.appspot.com/o/MasterGemstone%2F16.jpg?alt=media&token=42211d9c-fe7e-4b9b-86f9-4647d450346f') 

insert into MasterGemstone
values ('Emerald',10,29729191,'VVS1','EX',2.85,'Oval','https://firebasestorage.googleapis.com/v0/b/fir-e797a.appspot.com/o/MasterGemstone%2F17.jpg?alt=media&token=cb9bce45-642e-47cf-91b7-f3d00f8f86aa')

insert into MasterGemstone values ('Garnet ',8,5601550,'VVS1','EX',2,'Heart','https://firebasestorage.googleapis.com/v0/b/fir-e797a.appspot.com/o/MasterGemstone%2F18.jpg?alt=media&token=b530b62a-df2e-4eb3-a5a0-d25192001f28')
insert into MasterGemstone values ('Garnet ',8.5,6676687,'VVS2','EX',2.25,'Octagon','https://firebasestorage.googleapis.com/v0/b/fir-e797a.appspot.com/o/MasterGemstone%2F19.jpg?alt=media&token=c70f60f8-61a1-4447-b94e-804d8febcd38')
insert into MasterGemstone values ('Garnet ',9,6792671,'VVS1','EX',3,'Octagon','https://firebasestorage.googleapis.com/v0/b/fir-e797a.appspot.com/o/MasterGemstone%2F19.jpg?alt=media&token=c70f60f8-61a1-4447-b94e-804d8febcd38')

insert into MasterGemstone values ('Topaz',6.3,1431481,'VVS2','VG',1.10,'Octagon','https://firebasestorage.googleapis.com/v0/b/fir-e797a.appspot.com/o/MasterGemstone%2F20.jpg?alt=media&token=abfe4802-1ff3-4994-a6b0-98fecf858eca')
insert into MasterGemstone values ('Topaz',7.5,2316365,'VVS2','VG',1.78,'Princess','https://firebasestorage.googleapis.com/v0/b/fir-e797a.appspot.com/o/MasterGemstone%2F21.jpg?alt=media&token=16bcac57-e578-49d3-83f5-72ba037af95e')
insert into MasterGemstone values ('Topaz',8.5,3214220,'VVS2','VG',2.47,'Octagon','https://firebasestorage.googleapis.com/v0/b/fir-e797a.appspot.com/o/MasterGemstone%2F20.jpg?alt=media&token=abfe4802-1ff3-4994-a6b0-98fecf858eca')
GO



insert into Stones values ('CZ',1,20,25000)
insert into Stones values ('CZ',1,36,37000)
insert into Stones values ('CZ',1,40,42000)

insert into Stones values ('CZ',1.5,20,31000)
insert into Stones values ('CZ',1.5,36,37000)
insert into Stones values ('CZ',1.5,40,43000)

insert into Stones values ('CZ',2,20,37000)
insert into Stones values ('CZ',2,36,45000)
insert into Stones values ('CZ',2,40,56000)

insert into Stones values ('CZ',2.5,20,40000)
insert into Stones values ('CZ',2.5,36,47000)
insert into Stones values ('CZ',2.5,40,56000)

insert into Stones values ('CZ',3,20,45000)
insert into Stones values ('CZ',3,36,550000)
insert into Stones values ('CZ',3,40,62000)
GO

GO
insert into Role values ('Admin')
insert into Role values ('Manager')
insert into Role values ('DesignStaff')
insert into Role values ('ProductStaff')
insert into Role values ('Sale')
insert into Role values ('Customer')
GO
GO
insert into Users values ('Tydy','Cctn2003@@@@','nguyentrongthien','thien@gmail.com','0768483823','',1)
insert into Users values ('PhucLok','phucloc123!!@@','nguyenphuclok','lok@gmail.com','0723421123','',2)
insert into Users values ('Xeko','duchung123!!@@','nguyenduchung','hung@gmail.com','0935322111','',3)
insert into Users values ('Top100','giakhanh123!!@@','hagiakhanh','khanh@gmail.com','0768123823','',4)
insert into Users values ('AEOPAOP','badat123!!@@','nguyenbadat','dat@gmail.com','0764567123','',5)
insert into Users values ('youknowwho','quanghuy123!!@@','lequanghuy','huy@gmail.com','0764567123','',6)
GO
GO
insert into Material values ('Gold 24K',8208128,'https://firebasestorage.googleapis.com/v0/b/fir-e797a.appspot.com/o/Material%2F22.jpg?alt=media&token=46de03bc-b95b-4699-a011-4a418f761cea',2)
insert into Material values ('Gold 18K',4096815,'https://firebasestorage.googleapis.com/v0/b/fir-e797a.appspot.com/o/Material%2F23.jpg?alt=media&token=5fdf0097-2714-40d1-887d-d097053f7257',2)
insert into Material values ('Gold 14K',120.59,'https://firebasestorage.googleapis.com/v0/b/fir-e797a.appspot.com/o/Material%2F24.jpg?alt=media&token=7f724e6a-e623-4fe5-a78f-a4a2fc0def9a',2)
insert into Material values ('Gold 10K',3067206,'https://firebasestorage.googleapis.com/v0/b/fir-e797a.appspot.com/o/Material%2F25.jpg?alt=media&token=87c56efe-d212-4cf3-ad72-34547eaa00e6',2)
insert into Material values ('Pink Gold 10K',2401318,'https://firebasestorage.googleapis.com/v0/b/fir-e797a.appspot.com/o/Material%2F26.jpg?alt=media&token=b0778c75-cb59-4a61-b962-19ccc59a8148',2)
insert into Material values ('Pink Gold 14K',132.54,'https://firebasestorage.googleapis.com/v0/b/fir-e797a.appspot.com/o/Material%2F27.jpg?alt=media&token=3ee1b9c9-cb05-4126-a85a-4063d7a865bc',2)
insert into Material values ('Pink Gold 18K',3371154,'https://firebasestorage.googleapis.com/v0/b/fir-e797a.appspot.com/o/Material%2F28.jpg?alt=media&token=2e85ae74-5a8e-47f1-92bc-9bef41bedbc6',2)
insert into Material values ('White Gold 10K',3407526,'https://firebasestorage.googleapis.com/v0/b/fir-e797a.appspot.com/o/Material%2F29.jpg?alt=media&token=010c6468-7fcb-4b03-bf94-82edd37af092',2)
insert into Material values ('White Gold 14K',4035517,'https://firebasestorage.googleapis.com/v0/b/fir-e797a.appspot.com/o/Material%2F30.jpg?alt=media&token=6ed19015-e9da-4d61-81f6-13080ea5ab33',2)
insert into Material values ('White Gold 18K',5411296,'https://firebasestorage.googleapis.com/v0/b/fir-e797a.appspot.com/o/Material%2F31.jpg?alt=media&token=fcaac88a-e8b4-45d7-9fba-ecde09d40c55',2)
GO

GO
insert into TypeOfJewellery values('Ring','https://firebasestorage.googleapis.com/v0/b/fir-e797a.appspot.com/o/TypeOfJewellery%2F32.jpg?alt=media&token=68a7d146-e2d0-4e89-b91d-2eb2ea8178ea')
insert into TypeOfJewellery values('Bracelet','https://firebasestorage.googleapis.com/v0/b/fir-e797a.appspot.com/o/TypeOfJewellery%2F33.jpg?alt=media&token=f077aed9-c470-4506-91c9-6d697edd8620')
insert into TypeOfJewellery values('Earrings','https://firebasestorage.googleapis.com/v0/b/fir-e797a.appspot.com/o/TypeOfJewellery%2F34.jpg?alt=media&token=e278dbcd-c723-48ae-827c-4f4d801d3d66')
insert into TypeOfJewellery values('Chain','https://firebasestorage.googleapis.com/v0/b/fir-e797a.appspot.com/o/TypeOfJewellery%2F35.jpg?alt=media&token=803c4f98-453c-4530-8704-cce21f70cca5')
GO
GO
insert into Blog values ('DONT BE CONNED: JEWELLERY MYTHS & MISLEADING MARKETING','Recently I saw an ad for a new jewellery brand which bragged about the amazing features of their jewellery which they claimed made it superior to other jewellery designs. As a jewellery profession Recently I saw an ad for a new jewellery brand which bragged about the amazing features of their jewellery which they claimed made it superior to other jewellery designs. As a jewellery profession...',
'https://firebasestorage.googleapis.com/v0/b/fir-e797a.appspot.com/o/Blog%2F36.jpg?alt=media&token=9f2b7fa7-0af3-40d8-a1d0-224208c1dd94',2)
insert into Blog values ('AUSTRALIAN FASHION: CHRISTMAS & SUMMER OUTFIT IDEAS','Look dashing as you sleigh this Christmas (and throughout the summer season) in our handmade jewellery. As we do each year, weve lined up some of our range with pieces from o As a jewellery profession Recently I saw an ad for a new jewellery brand which bragged about the amazing features of their jewellery which they claimed made it superior to other jewellery designs. As a jewellery profession...',
'https://firebasestorage.googleapis.com/v0/b/fir-e797a.appspot.com/o/Blog%2F37.jpg?alt=media&token=bdf1b67e-0fb9-4ccb-81b9-ab1d842cd1cc',2)
insert into Blog values ('ARE GOLD RINGS WORTH THE INVESTMENT?','Gold rings have been a much sought after jewellery accessory for millennia, with some of the oldest rings in gold found to date having been made around 6,500 years ago. The beautyw an ad for a new jewellery brand which bragged about the amazing features of their jewellery which they claimed made it superior to other jewellery designs. As a jewellery profession...',
'https://firebasestorage.googleapis.com/v0/b/fir-e797a.appspot.com/o/Blog%2F38.jpg?alt=media&token=d3ff3c66-c363-4b9a-a147-f1b0a63d086f',2)
insert into Blog values ('HOW TO STYLE SILVER JEWELLERY','Did you know that in Australia the jewellery industry is worth almost $3 billion annually? Thats a lot of sparkles. If youre one of the many women who love to accessorise with jewellery, jewellery designs. As a jewellery profession Recently I saw an ad for a new jewellery brand which bragged about the amazing features of their jewellery which they claimed made it superior to other jewellery designs. As a jewellery profession...',
'https://firebasestorage.googleapis.com/v0/b/fir-e797a.appspot.com/o/Blog%2F39.jpg?alt=media&token=b6d06092-6b6e-4dbc-811c-47bb547cf17f',2)
insert into Blog values ('7 ONLINE JEWELLERY SHOPPING MISTAKES TO AVOID','Like so many other products, jewellery sales are increasingly moving online rather than taking place in a traditional brick and mortar store. Shopping online is of course quick and convenient,profession Recently I saw an ad for a new jewellery brand which bragged about the amazing features of their jewellery which they claimed made it superior to other jewellery designs. As a jewellery profession...',
'https://firebasestorage.googleapis.com/v0/b/fir-e797a.appspot.com/o/Blog%2F40.jpg?alt=media&token=8a9b0f1c-aad5-433c-853a-1ef9cb79771b',2)
insert into Blog values ('THE ULTIMATE GUIDE TO STYLING GOLD JEWELLERY','Who doesnt love the gorgeous glamour of gold jewellery? Its beautiful quality and colour make it the most sought after metal when it comes to jewellery. That said, even gold jewellery wont do for a new jewellery brand which bragged about the amazing features of their jewellery which they claimed made it superior to other jewellery designs. As a jewellery profession...',
'https://firebasestorage.googleapis.com/v0/b/fir-e797a.appspot.com/o/Blog%2F41.jpg?alt=media&token=39eb4852-f40d-4d0e-8460-19c25c968adf',2)
insert into Blog values ('ALL ABOUT OPAL JEWELLERY','Opal is a unique and fascinating gemstone that has been used in jewellery for millennia. With its distinctive play of colours and iridescence, opal jewellery is both beautiful and eye-catching.gged about the amazing features of their jewellery which they claimed made it superior to other jewellery designs. As a jewellery profession...',
'https://firebasestorage.googleapis.com/v0/b/fir-e797a.appspot.com/o/Blog%2F42.jpg?alt=media&token=255033fc-3f71-4859-b677-c89dffee0f3e',2)
insert into Blog values ('MOST POPULAR JEWELLERY THIS CHRISTMAS (2023)','Im always fascinated to see which of our Australian jewellery designs will be popular with our lovely customers in the lead up to Christmas - and this year is no exception and Ive just put togeth Recently I saw an ad for a new jewellery brand which bragged about the amazing features of their jewellery which they claimed made it superior to other jewellery designs. As a jewellery profession...',
'https://firebasestorage.googleapis.com/v0/b/fir-e797a.appspot.com/o/Blog%2F43.jpg?alt=media&token=75b12b3d-2e52-4511-8ff8-c37472da7a3f',2)
GO

GO

insert into DesignRule values (4.0,10.0,14.0,20.0,1)
insert into DesignRule values (6.0,10.0,360.0,600.0,2)
insert into DesignRule values (4.0,8.5,6.0,12.0,3)
insert into DesignRule values (5.5,10.0,300.0,600.0,4)


insert into Design values('','The Archie Bold Ring','https://firebasestorage.googleapis.com/v0/b/fir-e797a.appspot.com/o/Design%2F1.jpg?alt=media&token=9b6dc9a2-41d1-4634-9d87-1ced79e2fc88',
'Your classic domed band, now bigger and bolder. The Archie Bold Ring offers a gorgeous curve of solid gold that makes a chic statement on its own, or stacked with other favorites.',
7,10,2,2,1)

insert into Design values('','TBold Spirah Chain','https://firebasestorage.googleapis.com/v0/b/fir-e797a.appspot.com/o/Design%2F2.jpg?alt=media&token=0d7dce4e-328f-415e-beac-3782bace96bd',
'Our take on the classic Singapore look, our Bold Spirah Chain is the perfect staple piece for every woman�s jewelry box. Made up of a criss cross spiral pattern, it is both versatile and chic. Thicker than our Spirah Classic Chain, you can pair it with your favorite pendant, or wear it solo for understated elegance.',
null,null,2,4,4)

insert into Design values('','Penthouse Bracelet','https://firebasestorage.googleapis.com/v0/b/fir-e797a.appspot.com/o/Design%2F3.jpg?alt=media&token=116031e6-4241-40eb-8fcf-d0fb007a872e',
'Theres no stopping you in our Penthouse Link Bracelet. Chunky round rolo links form together to create a dramatic look, for style and class at every turn.',
null,null,2,3,4)

insert into Design values('','Mystic Mariner Choker','https://firebasestorage.googleapis.com/v0/b/fir-e797a.appspot.com/o/Design%2F4.jpg?alt=media&token=dca01774-8b3d-45d8-ab9b-f64e03ddd539',
'Get serious about your shine with our Mystic Mariner Choker. This timeless chain features flat, mirror-like links, also referred to as Gucci links, that catch the light from every direction. Adorn it on your neck to add sophistication to any look.',
null,null,2,3,4)

insert into Design values('','Byzantine Band Ring','https://firebasestorage.googleapis.com/v0/b/fir-e797a.appspot.com/o/Design%2F5.jpg?alt=media&token=c13bb95d-6de7-4301-80ba-6c390de0811a',
'This intricately woven style of jewelry dates back centuries, worn as a symbol of status and power. Weve taken this classically intertwined design and given it a modern polished spin. Slip on our Byzantine Band Ring to instantly elevate any look.',
4,9,2,3,1)

insert into Design values('','Fresco Baguette Ring','https://firebasestorage.googleapis.com/v0/b/fir-e797a.appspot.com/o/Design%2F6.jpg?alt=media&token=09ae91a9-7060-40da-9416-7e9f4ff6d5927',
'Our Fresco Baguette Ring is the pop of sophistication you need this season! Inspired by the vibrant colors of Italian murals, it features a floating sea green zirconia stone enrobed in 14k solid gold. Whether you stack it or wear it solo, its sure to let your inner artist shine!',
2,7,2,3,1)

insert into Design values('','The One Bold Bangle','https://firebasestorage.googleapis.com/v0/b/fir-e797a.appspot.com/o/Design%2F7.jpg?alt=media&token=a04b2530-fb2d-4443-86a4-6456da8d441f',
'The One Bold Bangle is easy to love. With a sleek hinged design, this bracelet will add polished shine to any wrist stack or stand out solo as your go-to solid gold piece.',
null,19,2,3,2)

insert into Design values('','Mesh Glamour Stack Bracelet','https://firebasestorage.googleapis.com/v0/b/fir-e797a.appspot.com/o/Design%2F8.jpg?alt=media&token=abe3b36d-67d4-4709-b71c-9b30f2100298',
'Our Mesh Glamour Stack Bracelet is a testament to the exceptional artistry of the most skilled artisans. Crafted to highlight the intricate beauty & shine of the meshing technique, it is a true labor of love by our skilled craftsmen. Bracelet stretches to fit most wrist sizes.',
8,null,2,3,2)

 insert into Design values('','Park Avenue Bold Herringbone Bracelet','https://firebasestorage.googleapis.com/v0/b/fir-e797a.appspot.com/o/Design%2F9.jpg?alt=media&token=9b550356-e945-4508-a9fa-9247dfb4398e',
'A timeless classic, our Park Avenue Bold Herringbone Bracelet will never go out of style. Solid gold lays flat to form this bold chain � known for its elegance and shine.',
9,null,2,4,2)

 insert into Design values('','Sparkling Tennis Bracelet','https://firebasestorage.googleapis.com/v0/b/fir-e797a.appspot.com/o/Design%2F10.jpg?alt=media&token=a63cc9e9-798b-46a8-ae67-c31cbd1f6a68',
'Elevate your Pandora bracelet stack with a forever piece, our Sparkling Tennis Bracelet. Featuring a row of sparkling clear cubic zirconia, this piece is sure to become a staple in your jewelry box that you reach for over and over again. Finished in 14k rose gold plating, this tennis bracelet is as elegant as it is timeless. It can be adjusted to three different lengths for ease of styling. Add depth to your stack with this sparkling piece or mix with other metal finishes for a contemporary jewelry look.',
15,null,2,7,2)

 insert into Design values('','Shine Bright Diamond Small Studs','https://firebasestorage.googleapis.com/v0/b/fir-e797a.appspot.com/o/Design%2F11.jpg?alt=media&token=7a1066f1-29f6-4751-a5dc-754d0b4ffa53',
'A modern interpretation of a timeless prong setting style, our Shine Bright Diamond Small Studs feature a refined setting that draws in light from all angles to spotlight your diamond�s brilliance. Our diamonds are always natural and hand-matched, because only real is real.',
6,null,2,9,3)

 insert into Design values('','Shine Bright Small Diamond Hoops','https://firebasestorage.googleapis.com/v0/b/fir-e797a.appspot.com/o/Design%2F12.jpg?alt=media&token=f61c407a-ef14-4e8f-92ea-199bccae7434',
'The pure brilliance of the oval diamond elegantly nestled in the 18-carat white gold band symbolizes an everlasting love. With its refined and sophisticated design, this engagement ring will accompany you on the path to happiness, accentuating the beauty of your future spouse.',
7,null,2,9,3)

GO
INSERT INTO WarrantyCard VALUES ('Product Warranty', 'This warranty covers any defects in materials and workmanship for 1 year from the date of purchase.');

INSERT INTO WarrantyCard VALUES ('Extended Warranty', 'This extended warranty provides coverage for an additional 2 years beyond the standard 1 year warranty.');

INSERT INTO WarrantyCard VALUES ('Lifetime Warranty', 'This lifetime warranty ensures your product is covered for as long as you own it.');
GO