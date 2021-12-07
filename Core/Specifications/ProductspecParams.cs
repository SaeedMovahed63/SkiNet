namespace Core.Specifications
{
    public class ProductspecParams
    {
        private const int MaxPageSize = 50;
        public int PageIndex { get; set; } = 1;

        private int _pageSize { get; set; } = 6;

        public int PageSize {
            get => _pageSize;
            set => _pageSize = (value >MaxPageSize) ? MaxPageSize : value;
        }

        public int? brandId { get; set; }
        public int? typeId { get; set; }
        public string sort { get; set; }
    }
}