import { Component, OnInit, Input } from '@angular/core';
import { CartService } from '../services/cart.service';

@Component({
  selector: 'app-product-quantity',
  templateUrl: './product-quantity.component.html',
  styleUrls: ['./product-quantity.component.css']
})
export class ProductQuantityComponent implements OnInit {

  @Input('product') product;
  @Input('shopping-cart') shoppingCart;
  constructor(private cartservice: CartService) {
  }
  addToCart() {
    this.cartservice.addToCart(this.product);
  }
  removeFromCart() {
    this.cartservice.removeFromCart(this.product);
  }
 ngOnInit(){ }
}
