namespace API.Model.StonesModel
{
    public class RequestSearchStonesModel
    {
        public string? Kind { get; set; }

        public string? Size { get; set; }

        public int? FromQuantity { get; set; } = 0;

        public int? ToQuantity { get; set; }

        public decimal? FromPrice { get; set; } = decimal.Zero;

        public decimal? ToPrice { get; set; }

        public SortContent? SortContent { get; set; }

        public int pageIndex { get; set; } = 1;

        public int pageSize { get; set; } = 10;
    }
    public class SortContent
    {
        public SortStonestByEnum sortStonestBy { get; set; }
        public SortStonestTypeEnum sortStonestType { get; set; }
    }

    public enum SortStonestByEnum
    {
        Kind = 1,
        Quantity = 2,
        Price = 3,
    }
    public enum SortStonestTypeEnum
    {
        Ascending = 1,
        Descending = 2,
    }
}
