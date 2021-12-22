import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { IPagination } from './models/pagination';
import { IProduct } from './models/product';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'SkiNet';
  products: IProduct[];
  constructor(private http: HttpClient) {
    this.products = [];
  }

  ngOnInit(): void {
    this.http.get('https://localhost:5003/api/Products?pageSize=50').subscribe(
      (response: any) => {
        this.products = response.data;
      },
      (error: any) => {
        console.log(error);
      }
    );
  }
}
