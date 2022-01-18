import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { IBasket, IBasketItem } from '../shared/models/basket';
import { IProduct } from '../shared/models/product';

@Injectable({
  providedIn: 'root',
})
export class BasketService {
  baseUrl = environment.apiUrl;
  private basketSource = new BehaviorSubject<IBasket>(null as any);
  basket$ = this.basketSource.asObservable();
  constructor(private http: HttpClient) {}

  getBasket(id: string) {
    return this.http.get<IBasket>(this.baseUrl + 'basket?id=' + id).pipe(
      map((basket: IBasket) => {
        this.basketSource.next(basket);
      })
    );
  }

  setBasket(basket: IBasket) {
    return this.http.post<IBasket>(this.baseUrl + 'basket', basket).subscribe(
      (response: IBasket) => {
        this.basketSource.next(response);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  getCurrentBasketValue() {
    return this.basketSource.value;
  }

  addItemToBasket(item: IProduct, quantity = 1) {
    const itemToAdd: IBasketItem = this.mapProductItemToBasketItem(
      item,
      quantity
    );
    const basket= this.getCurrentBasketValue()??this.createBasket();
  }
  createBasket(): IBasket {
    throw new Error('Method not implemented.');
  }
  private mapProductItemToBasketItem(item: IProduct, quantity: number): IBasketItem {
   return {
     id:item.id,
     productName:item.name,
     price:item.price,
     pictureUrl:item.pictureUrl,
     quantity,
     brand:item.productBrand,
     type:item.productType
   }
  }
}
