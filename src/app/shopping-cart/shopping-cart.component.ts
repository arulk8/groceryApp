import { CartService } from './../services/cart.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit {
  cart$: any;
  constructor(private shoppingCart: CartService) { }

  public  async ngOnInit() {
    this.cart$ = await this.shoppingCart.getCartProducts();
    this.cart$.subscribe(res => {
      console.log(res);
    });
  }
  clearCart() {
    this.shoppingCart.clearCart();
}
}
