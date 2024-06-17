using CsvHelper;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using System;
using System.Globalization;
using System.IO;
using System.Linq;

namespace UnitTestProject4
{
    [TestClass]
    public class UnitTest1
    {

        [TestMethod]
        
        public void TestMethod1()
        {
            var dataGetFromFile = ReadTestData(@"D:\HocTap\AspDotNet_Practice\SwpWorking\BE\UnitTestProject4\data\dataTest.csv");
            Assert.AreEqual(4, dataGetFromFile.Length, "Không đọc được tất cả các bản ghi từ file CSV.");
            foreach (var dataTest in dataGetFromFile)
            {
                try
                {
                    Assert.AreEqual("123", dataTest.Password, $"Kiểm tra thất bại cho Username: {dataTest.Username}");
                    Console.WriteLine($"Kiểm tra thành công cho Username: {dataTest.Username} với Password: {dataTest.Password}");
                }
                catch (AssertFailedException ex)
                {
                    Console.WriteLine($"Kiểm tra thất bại cho Username: {dataTest.Username} với Password: {dataTest.Password}. Lỗi: {ex.Message}");
                    throw;
                }
            }
        }

        private static DataTest[] ReadTestData(string filePath)
        {
            using (var reader = new StreamReader(filePath))
            using (var csv = new CsvReader(reader, CultureInfo.InvariantCulture))
            {
                return csv.GetRecords<DataTest>().ToArray();
            }
        }
    }
}
