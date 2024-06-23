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
	Image NVARCHAR(200),
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
    Size NVARCHAR(50),
	Design3D NVARCHAR(200),
	WeightOfMaterial DECIMAL(18,2),
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

select * from MasterGemstone

insert into MasterGemstone values ('Diamond',4,890.0,'VVS1','EX',0.2,'Round','https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTpWHUscJPTURmqG413RW3IUoQFaWE_ypeDRQ&s')
insert into MasterGemstone values ('Diamond',5,3150,'VVS2','VG', 0.4,'Marquise','https://5.imimg.com/data5/SELLER/Default/2022/10/QG/QA/DM/70249436/marquise-shape-diamond-500x500.jpg')
insert into MasterGemstone values ('Diamond',6,8700,'VVS1','EX',0.8,'Round','https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTpWHUscJPTURmqG413RW3IUoQFaWE_ypeDRQ&s')
insert into MasterGemstone values ('Diamond',7,244490.80,'VVS2','VG',1.2,'Princess','https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTxfsnec1qOzWuNuTt3yE4wXkPkbQ0n5VZekQ&s')
insert into MasterGemstone values ('Diamond',8,53101.90,'VS1','EX',2.0,'Baguete','https://www.mydiamonds.com.au/cdn/shop/products/Envy-White-Gold-Emerald-Tapered-Baguette-Diamond-Three-Stone-Ring-2_b2f3b1a3-b61e-4ab1-8de8-ce23bce618db.jpg?v=1671891940')
insert into MasterGemstone values ('Diamond',9,79235.96,'VS2','EX',2.75,'Pear','https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTMhc8p0RGypJTByZlZ8_sBFtH_zK4hUu-ngQ&s')
insert into MasterGemstone values ('Diamond',4.5,1210.80,'VVS1','EX',0.33,'Oval','https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRf-w8ypjG8oNmi5sQkWAS3R1Pji12gBhfjpQ&s')
insert into MasterGemstone values ('Diamond',5.5,4300,'IF','VG',0.7,'Marquise','https://5.imimg.com/data5/SELLER/Default/2022/10/QG/QA/DM/70249436/marquise-shape-diamond-500x500.jpg')
insert into MasterGemstone values ('Diamond',6.5,9100,'VS1','VG',1.1,'Pear','https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTMhc8p0RGypJTByZlZ8_sBFtH_zK4hUu-ngQ&s')
insert into MasterGemstone values ('Diamond',7.5,26500.20,'VVS2','VG',1.65,'Heart','https://www.rockher.com/cdn/shop/files/e80127_v2_heart_white_1__1.jpg?v=1717689418')
insert into MasterGemstone values ('Diamond',8.5,49870.90,'VS2','EX',2.25,'Emerald','https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSCUuK0Eur30RhEn9n3t577MXycbS5djfMNJQ&s')
insert into MasterGemstone values ('Diamond',9.5,11555.81,'IF','GD',3.1,'Trillion','https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRqB2e-8HSaay-HgOFpzWidCLkBbkPqrBkSCw&s')

insert into MasterGemstone values ('Ruby',6.2,567.95,'VVS2','EX',0.96,'Oval','https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ2jyWQP-qaThFhZPPRycV7CawwamQ1el3yDw&s')
insert into MasterGemstone values ('Ruby',6.9,3162.54,'VVS1','EX',1.42,'Oval','https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ2jyWQP-qaThFhZPPRycV7CawwamQ1el3yDw&s')
insert into MasterGemstone values ('Ruby',7.3,1298.70,'VVS2','EX',1.29,'Oval','https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ2jyWQP-qaThFhZPPRycV7CawwamQ1el3yDw&s')

insert into MasterGemstone values ('Sapphire',7.1,1259.35,'VVS2','EX',1.34,'Octagon','https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR_JrhfLcxKf5BEDc4gPzysaKOkJY3w3WsjpQ&s')
insert into MasterGemstone values ('Sapphire',8.5,1534.83,'VVS1','EX',2.5,'Octagon','https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR_JrhfLcxKf5BEDc4gPzysaKOkJY3w3WsjpQ&s')
insert into MasterGemstone values ('Sapphire',8,661.16,'VVS1','EX',2.1,'Octagon','https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR_JrhfLcxKf5BEDc4gPzysaKOkJY3w3WsjpQ&s')



insert into MasterGemstone
values ('Emerald',7.5,920.10,'VVS2','EX',1.62,'Emerald','https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQPbfJp0LWlpvwB3qpD0qefb3fGwURY2ZEAqw&s')

insert into MasterGemstone
values ('Emerald',9.5,1031.88,'IF','EX',2.85,'Emerald','https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQPbfJp0LWlpvwB3qpD0qefb3fGwURY2ZEAqw&s') 

insert into MasterGemstone
values ('Emerald',10,1168.83,'VVS1','EX',2.85,'Oval','https://atjewels.in/cdn/shop/products/Detailsabout1.1CtOvalCutGreenEmeraldSolitaireHaloEngagementRing14KRoseGoldFinish1.jpg?v=1617700350')

insert into MasterGemstone values ('Garnet ',8,220.23,'VVS1','EX',2,'Heart','https://i.etsystatic.com/15646423/r/il/71d77c/3520051313/il_570xN.3520051313_5et6.jpg')
insert into MasterGemstone values ('Garnet ',8.5,262.50,'VVS2','EX',2.25,'Octagon','https://media.superjeweler.com/f_auto,fl_lossy,q_auto,c_scale/Images/Products/700x700/pic62389-1')
insert into MasterGemstone values ('Garnet ',9,267.06,'VVS1','EX',3,'Octagon','https://media.superjeweler.com/f_auto,fl_lossy,q_auto,c_scale/Images/Products/700x700/pic62389-1')

insert into MasterGemstone values ('Topaz',6.3,56.28,'VVS2','VG',1.10,'Octagon','https://media.superjeweler.com/Images/Products/700X700/pic61701-1')
insert into MasterGemstone values ('Topaz',7.5,91.07,'VVS2','VG',1.78,'Princess','https://www.virjewels.com/cdn/shop/files/r12433bt_6_2048x.jpg?v=1689259683')
insert into MasterGemstone values ('Topaz',8.5,126.37,'VVS2','VG',2.47,'Octagon','https://media.superjeweler.com/Images/Products/700X700/pic61701-1')


insert into Material values ('Gold 24K',322.71,'https://www.vnsc.vn/wp-content/uploads/2023/02/dac-diem-vang-24k.jpg',2)
insert into Material values ('Gold 18K',161.07,'https://locphuc.com.vn/Content/Images/San-pham-lan-22/nhan-nam-cz-vang-18k-VRF0531R-LP0618940-g1.jpg',2)
insert into Material values ('Gold 14K',120.59,'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSd83gUoQAohdV5cP3c0cYcNaP43of1PXNx5A&s',2)
insert into Material values ('Gold 10K',109.57,'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQxSajVLxRxIrhQ89J3jj19GbPo-kw1uxZrew&s',2)
insert into Material values ('Pink Gold 10K',94.41,'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQyMKzQHVdWsKX3gRT-x02DooHLUmD8gdegCQ&s',2)
insert into Material values ('Pink Gold 14K',132.54,'https://www.beawelry.co.th/wp-content/uploads/2020/06/BRA0206-01-01-F-700x700.jpg',2)
insert into Material values ('Pink Gold 18K',169.77,'https://www.masseysjewelers.com/media/catalog/product/cache/1/image/9df78eab33525d08d6e5fb8d27136e95/3/0/30348pkd-18r.jpg',2)
insert into Material values ('White Gold 10K',133.97,'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSNilFfKxlpXfjaCqB30BAiXbKKWXW-awFzeA&s',2)
insert into Material values ('White Gold 14K',158.66,'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS-8qLGZMrIq17mZFi24z29gK06pAbGZCvNOQ&s',2)
insert into Material values ('White Gold 18K',212.75,'https://i.ebayimg.com/images/g/OR0AAOSwnAZhSMJy/s-l400.jpg',2)
select * from Material

insert into Stones values ('CZ',1,20,1)
insert into Stones values ('CZ',1,36,1.45)
insert into Stones values ('CZ',1,40,1.65)

insert into Stones values ('CZ',1.5,20,1.2)
insert into Stones values ('CZ',1.5,36,1.45)
insert into Stones values ('CZ',1.5,40,1.7)

insert into Stones values ('CZ',2,20,1.45)
insert into Stones values ('CZ',2,36,1.75)
insert into Stones values ('CZ',2,40,2.2)

insert into Stones values ('CZ',2.5,20,1.55)
insert into Stones values ('CZ',2.5,36,1.85)
insert into Stones values ('CZ',2.5,40,2.2)

insert into Stones values ('CZ',3,20,1.75)
insert into Stones values ('CZ',3,36,2.15)
insert into Stones values ('CZ',3,40,2.45)
select * from Stones

select * from Users
insert into Users values ('Tydy','Cctn2003@@@@','nguyentrongthien','thien@gmail.com','0768483823','',1)
insert into Users values ('PhucLok','phucloc123!!@@','nguyenphuclok','lok@gmail.com','0723421123',2)
insert into Users values ('Xeko','duchung123!!@@','nguyenduchung','hung@gmail.com','0935322111',3)
insert into Users values ('Top100','giakhanh123!!@@','hagiakhanh','khanh@gmail.com','0768123823',4)
insert into Users values ('AEOPAOP','badat123!!@@','nguyenbadat','dat@gmail.com','0764567123',5)
insert into Users values ('youknowwho','quanghuy123!!@@','lequanghuy','huy@gmail.com','0764567123',6)

select * from Role
insert into Role values ('Admin')
insert into Role values ('Manager')
insert into Role values ('DesignStaff ')
insert into Role values ('ProductStaff')
insert into Role values ('Sale')
insert into Role values ('Customer')


select * from Blog
insert into Blog values ('DONT BE CONNED: JEWELLERY MYTHS & MISLEADING MARKETING','Recently I saw an ad for a new jewellery brand which bragged about the amazing features of their jewellery which they claimed made it superior to other jewellery designs. As a jewellery profession Recently I saw an ad for a new jewellery brand which bragged about the amazing features of their jewellery which they claimed made it superior to other jewellery designs. As a jewellery profession...',
'https://simonewalsh.com/cdn/shop/articles/dont-be-conned-jewellery-myths-misleading-marketing-115234.jpg?v=1709414391&width=800',2)
insert into Blog values ('AUSTRALIAN FASHION: CHRISTMAS & SUMMER OUTFIT IDEAS','Look dashing as you sleigh this Christmas (and throughout the summer season) in our handmade jewellery. As we do each year, we�ve lined up some of our range with pieces from o As a jewellery profession Recently I saw an ad for a new jewellery brand which bragged about the amazing features of their jewellery which they claimed made it superior to other jewellery designs. As a jewellery profession...',
'https://simonewalsh.com/cdn/shop/articles/australian-fashion-christmas-summer-outfit-ideas-609113.jpg?v=1699886089&width=1000',2)
insert into Blog values ('ARE GOLD RINGS WORTH THE INVESTMENT?','Gold rings have been a much sought after jewellery accessory for millennia, with some of the oldest rings in gold found to date having been made around 6,500 years ago. The beautyw an ad for a new jewellery brand which bragged about the amazing features of their jewellery which they claimed made it superior to other jewellery designs. As a jewellery profession...',
'https://simonewalsh.com/cdn/shop/articles/are-gold-rings-worth-the-investment-143777.jpg?v=1695245481&width=1000',2)
insert into Blog values ('HOW TO STYLE SILVER JEWELLERY','Did you know that in Australia the jewellery industry is worth almost $3 billion annually? Thats a lot of sparkles. If youre one of the many women who love to accessorise with jewellery, jewellery designs. As a jewellery profession Recently I saw an ad for a new jewellery brand which bragged about the amazing features of their jewellery which they claimed made it superior to other jewellery designs. As a jewellery profession...',
'https://simonewalsh.com/cdn/shop/articles/how-to-style-silver-jewellery-698324.jpg?v=1680687086&width=600',2)
insert into Blog values ('7 ONLINE JEWELLERY SHOPPING MISTAKES TO AVOID','Like so many other products, jewellery sales are increasingly moving online rather than taking place in a traditional brick and mortar store. Shopping online is of course quick and convenient,profession Recently I saw an ad for a new jewellery brand which bragged about the amazing features of their jewellery which they claimed made it superior to other jewellery designs. As a jewellery profession...',
'https://simonewalsh.com/cdn/shop/articles/7-online-jewellery-shopping-mistakes-to-avoid-953961.jpg?v=1661354754&width=600',2)
insert into Blog values ('THE ULTIMATE GUIDE TO STYLING GOLD JEWELLERY','Who doesnt love the gorgeous glamour of gold jewellery? Its beautiful quality and colour make it the most sought after metal when it comes to jewellery. That said, even gold jewellery wont do for a new jewellery brand which bragged about the amazing features of their jewellery which they claimed made it superior to other jewellery designs. As a jewellery profession...',
'https://simonewalsh.com/cdn/shop/articles/the-ultimate-guide-to-styling-gold-jewellery-609393.jpg?v=1669833961&width=800',2)
insert into Blog values ('ALL ABOUT OPAL JEWELLERY','Opal is a unique and fascinating gemstone that has been used in jewellery for millennia. With its distinctive play of colours and iridescence, opal jewellery is both beautiful and eye-catching.gged about the amazing features of their jewellery which they claimed made it superior to other jewellery designs. As a jewellery profession...',
'https://simonewalsh.com/cdn/shop/articles/all-about-opal-jewellery-802946.jpg?v=1681924880&width=600',2)
insert into Blog values ('MOST POPULAR JEWELLERY THIS CHRISTMAS (2023)','Im always fascinated to see which of our Australian jewellery designs will be popular with our lovely customers in the lead up to Christmas - and this year is no exception and Ive just put togeth Recently I saw an ad for a new jewellery brand which bragged about the amazing features of their jewellery which they claimed made it superior to other jewellery designs. As a jewellery profession...',
'https://simonewalsh.com/cdn/shop/articles/most-popular-jewellery-this-christmas-2023-348947.jpg?v=1701294149&width=800',2)

insert into TypeOfJewellery values('Ring','https://mdjluxury.vn/wp-content/uploads/2019/04/NN218-1.jpg')
insert into TypeOfJewellery values('Bracelet','https://manssion.com/cdn/shop/products/Gold_Rope_Bracelet_FRONT_ff6efdb7-3ecf-4c00-9543-347d0eddebb0.png?v=1666564939')
insert into TypeOfJewellery values('Earings','https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRtEDJm5RKeTZVDQWUEYH2O1AFtQbS0hw7dcw&s')
insert into TypeOfJewellery values('Chain','https://www.tanishq.co.in/dw/image/v2/BKCK_PRD/on/demandware.static/-/Sites-Tanishq-product-catalog/default/dw938e85a3/images/hi-res/502621CDYAA00_1.jpg?sw=640&sh=640')