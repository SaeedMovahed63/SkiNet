import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BasketService } from 'src/app/basket/basket.service';
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
  quantity=1;
  constructor(
    private shopService: ShopService,
    private activateRoot: ActivatedRoute,
    private bcService: BreadcrumbService,
    private basketService: BasketService
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

  addItemToBasket() {
    this.basketService.addItemToBasket(this.product, this.quantity);
  }

  incrementQuantity() {
    this.quantity++;
  }

  decrementQuantity() {
    if (this.quantity > 1) {
      this.quantity--;
    }
  }
}
