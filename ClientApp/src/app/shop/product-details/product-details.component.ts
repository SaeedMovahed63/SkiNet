import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IProduct } from 'src/app/shared/models/product';
import { BreadcrumbService } from 'xng-breadcrumb';
import { ShopService } from '../shop.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss'],
})
export class ProductDetailsComponent implements OnInit {
  product: IProduct;
  constructor(
    private shopService: ShopService,
    private activateRoot: ActivatedRoute,
    private bcService: BreadcrumbService
  ) {
    this.product = {} as IProduct;
    this.bcService.set('@ProductDetails',"");
  }

  ngOnInit() {
   
    this.loadProduct();
  }

  loadProduct() {
    this.shopService
      .getProduct(+this.activateRoot.snapshot.paramMap.get('id')!)
      .subscribe(
        (product) => {
          this.product = product;
          this.bcService.set('@ProductDetails', product.name);
        },
        (error) => {
          console.log(error);
        }
      );
  }
}
