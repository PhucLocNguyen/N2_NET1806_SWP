namespace API.Model.DesignModel
{
    public class RequestSearchDesignModel
    {
        public int? ParentId { get; set; }

        public string? Image { get; set; }

        public string? DesignName { get; set; }

        public decimal? FromWeightOfMaterial { get; set; } = decimal.Zero;
        public decimal? ToWeightOfMaterial { get; set; }

        public int? StoneId { get; set; }

        public int? MasterGemstoneId { get; set; }

        public int? ManagerId { get; set; }

        public int? TypeOfJewelleryId { get; set; }

        public int? MaterialId { get; set; }

        public SortContent? SortContent { get; set; }

        public int pageIndex { get; set; } = 1;

        public int pageSize { get; set; } = 10;
    }
    public class SortContent
    {
        public SortDesignByEnum sortDesignBy { get; set; }
        public SortDesignTypeEnum sortDesignType { get; set; }
    }

    public enum SortDesignByEnum
    {
        ParentId = 1,
        DesignName = 2,
        WeightOfMaterial = 3,
        StoneId = 4,
        MasterGemstoneId = 5,
        ManagerId = 6,
        TypeOfJewelleryId = 7,
        MaterialId = 8,
    }
    public enum SortDesignTypeEnum
    {
        Ascending = 1,
        Descending = 2,
    }
}
