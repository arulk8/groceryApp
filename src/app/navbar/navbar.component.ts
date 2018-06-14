import { CartService } from './../services/cart.service';
import { AuthService } from './../service/auth.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs';
import { ShoppingCart } from '../models/shopping-cart';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit, OnDestroy {
  public user$: any;
  private sub: any;
  itemCount: number;
  constructor(private authService: AuthService, private shoppingcart: CartService) {
   this.sub = authService.appUser$.subscribe(user => this.user$ = user);
  }

  logout() {
    this.authService.logout();
  }

  async ngOnInit() {
    const cart$ =  await this.shoppingcart.getCartProducts();
    cart$.subscribe(cart => {
      this.itemCount = cart.count;
      // const productIds = Object.keys(cart.items);

      //   for ( const productId of productIds) {
      //      // console.log(this.cart.items[productId], productId,productIds);
      //       this.itemCount += cart.items[productId].quantity;
      //       console.log(cart.count);
      //   }
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
