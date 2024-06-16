﻿using API.Controllers;
using Moq;
using NUnit.Framework;
using Repositories.Token;
using Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using CsvHelper;
using static TestUseCase.TestLogin;
using System.Globalization;
using API.Model.UserModel;
using Microsoft.AspNetCore.Mvc;

namespace TestUseCase
{
    [TestFixture]
    public class TestRegister
    {
        private UserController _controller;
        private Mock<UnitOfWork> _mockUnitOfWork;
        private Mock<IToken> _mockTokenService;
        private MyDbContext _dbContext;

        [SetUp]
        public void Setup()
        {

            _dbContext = new MyDbContext();
            // Khởi tạo controller và các dependency cần thiết
            _mockUnitOfWork = new Mock<UnitOfWork>(_dbContext);

            _mockTokenService = new Mock<IToken>();

            // Setup mock behaviors here

            _controller = new UserController(_mockUnitOfWork.Object, _mockTokenService.Object);
        }

        public class RegisterTest
        {
            public string Username { get; set; }
            public string Email { get; set; }
            public string Password { get; set; }
            public string PasswordConfirm { get; set; }

            public string ExpectedValue { get; set; }
        }
        private static RegisterTest[] ReadTestData(string filePath)
        {
            using (var reader = new StreamReader(filePath))
            using (var csv = new CsvReader(reader, CultureInfo.InvariantCulture))
            {
                return csv.GetRecords<RegisterTest>().ToArray();
            }
        }

        private static IEnumerable<RegisterTest> TestDataFromCSV
        {
            get
            {
                string csvFilePath = (@"C:\Users\Admin\source\repos\SWP391Poject\TestUserCase\TestData\dataTestRegist.csv");
                return ReadTestData(csvFilePath);
            }
        }

        [TestCaseSource(nameof(TestDataFromCSV))]
        [Test]
        public async Task Login_ValidCredentials_ReturnsExpectedValue(RegisterTest regist)
        {
            // Arrange
            var registerAccount = new RequestRegisterAccount()
            {
                Username = regist.Username,
                Email = regist.Email,
                Password = regist.Password,
                PasswordConfirm = regist.PasswordConfirm,
            };

            // Act
            IActionResult actionResult = await _controller.Register(registerAccount);

           /* await Console.Out.WriteLineAsync(loginDTO.Username);
            await Console.Out.WriteLineAsync(loginDTO.Password);
            await Console.Out.WriteLineAsync(actionResult.ToString());*/

            // Assert
            if (actionResult is OkObjectResult)
            {
                Microsoft.VisualStudio.TestTools.UnitTesting.Assert.IsInstanceOfType<OkObjectResult>(actionResult);
                var okResult = actionResult as OkObjectResult;
                Microsoft.VisualStudio.TestTools.UnitTesting.Assert.IsNotNull(okResult.Value);
                Microsoft.VisualStudio.TestTools.UnitTesting.Assert.AreEqual(regist.ExpectedValue, okResult.Value.ToString());
            }
            else if(actionResult is BadRequestObjectResult )
            {
                Microsoft.VisualStudio.TestTools.UnitTesting.Assert.IsInstanceOfType<BadRequestObjectResult>(actionResult);
                var badRequestResult = actionResult as BadRequestObjectResult;
                Microsoft.VisualStudio.TestTools.UnitTesting.Assert.IsNotNull(badRequestResult.Value);
                Microsoft.VisualStudio.TestTools.UnitTesting.Assert.AreEqual(regist.ExpectedValue, badRequestResult.Value.ToString());
            }
            else
            {
                Microsoft.VisualStudio.TestTools.UnitTesting.Assert.IsInstanceOfType<ConflictObjectResult>(actionResult);
                var conflicRequestResult = actionResult as ConflictObjectResult;
                Microsoft.VisualStudio.TestTools.UnitTesting.Assert.IsNotNull(conflicRequestResult.Value);
                Microsoft.VisualStudio.TestTools.UnitTesting.Assert.AreEqual(regist.ExpectedValue, conflicRequestResult.Value.ToString());
            }


        }
    }
}
