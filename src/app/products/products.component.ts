import { CartService } from './../services/cart.service';
import { switchMap } from 'rxjs/operators';
import { RouterModule, ActivatedRoute } from '@angular/router';
import { ProductService } from './../services/product.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Product } from '../models/product';


@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit, OnDestroy {
  products: Product[] = [];
  filteredProducts: Product[] = [];
  sub: any;
  category: string;
  cart: {};
  constructor(
    private product: ProductService,
    private activatedroute: ActivatedRoute,
    private shoppingcartservice: CartService
   ) {
      // we cannot use activatedroute.snapshot.queryParams.get('category');
      // beacuse is component s not going to destroyed we are going to same component;
      // so we are using observable
      }
    createArray(res: any, arry: any[]) {
      const allKeys = Object.keys(res).sort();
          for (const keys of allKeys) {
            const val = {
              key: keys ,
              value: res[keys]
              };
            arry.push(val);
          }
    }

  ngOnInit() {

    this.sub = this.product.getAll().pipe(
      switchMap(res => {
        this.createArray(res, this.products);
        console.log(this.products);
        return this.activatedroute.queryParamMap;
      })
    ).subscribe(paramRes => {
        this.category = paramRes.get('category');
        this.filteredProducts = (this.category) ?
          this.products.filter(p => {
            if (this.category !== 'All') {
            return this.category === p.value.category;
            } else {
              return true;
            }
          }) : this.products;
       });

       this.shoppingcartservice.getCartProducts().then(res => {
         res.subscribe(result => {
              this.cart = result;
              console.log(result);
         });
        } );

  }
ngOnDestroy() {
  this.sub.unsubscribe();
}
}
