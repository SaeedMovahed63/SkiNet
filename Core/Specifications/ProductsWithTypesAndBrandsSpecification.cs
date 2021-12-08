using Core.Entities;

namespace Core.Specifications
{
    public class ProductsWithTypesAndBrandsSpecification :BaseSpecification<Product>
    {
        public ProductsWithTypesAndBrandsSpecification(ProductspecParams productParams)
        :base(x=>
        (string.IsNullOrEmpty(productParams.Search) || x.Name.ToLower().Contains
        (productParams.Search)) &&
        (!productParams.brandId.HasValue || x.ProductTypeId == productParams.brandId) &&
        (!productParams.typeId.HasValue || x.ProductTypeId == productParams.typeId)
        )
        {
            AddInclude(x=>x.ProductType);
            AddInclude(x=>x.ProductBrand);
            AddOrderBy(x=>x.Name);
            ApplyPaging(productParams.PageSize * (productParams.PageIndex -1), productParams.PageSize);
            if(!string.IsNullOrEmpty(productParams.sort)){
                switch(productParams.sort)
                {
                    case "priceAsc": AddOrderBy(x=>x.Price); break;
                    case "priceDesc": AddOrderByDescending(x=>x.Price); break;
                    default: AddOrderBy(x=>x.Name); break;
                }
            }

        }

        public ProductsWithTypesAndBrandsSpecification(int id) :base(x=>x.Id == id)
        {
            AddInclude(x=>x.ProductType);
            AddInclude(x=>x.ProductBrand);
        }
    }
}