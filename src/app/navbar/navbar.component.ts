import { CartService } from './../services/cart.service';
import { AuthService } from './../service/auth.service';
import { Component, OnInit, OnDestroy, AfterViewInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ShoppingCart } from '../models/shopping-cart';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit, OnDestroy,  AfterViewInit {
  public user$: any;
  private sub: any;
  itemCount: number;
  constructor(private authService: AuthService, private shoppingcart: CartService) {
   this.sub = authService.appUser$.subscribe(user => this.user$ = user);
   this.itemCount = this.shoppingcart.count;
  }

  logout() {
    this.authService.logout();
  }

   ngOnInit() {
      // const productIds = Object.keys(cart.items);

      //   for ( const productId of productIds) {
      //      // console.log(this.cart.items[productId], productId,productIds);
      //       this.itemCount += cart.items[productId].quantity;
      //       console.log(cart.count);
      //   }
  }

   ngAfterViewInit() {
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
