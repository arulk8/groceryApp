


import { environment } from './../environments/environment';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Component } from '@angular/core';
import { AngularFireModule} from 'angularfire2';
import { AngularFireDatabaseModule} from 'angularfire2/database';
import { AngularFireAuthModule} from 'angularfire2/auth';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {RouterModule, PreloadAllModules} from '@angular/router';

import { AuthGaurdService } from './service/auth-gaurd.service';
import { AuthService } from './service/auth.service';
import { RoleService } from './service/role.service';
import { AdminAuthGaurdService } from './service/admin-auth-gaurd.service';

import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { HomeComponent } from './home/home.component';
import { ProductsComponent } from './products/products.component';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import { CheckOutComponent } from './check-out/check-out.component';
import { OrderSuccessComponent } from './order-success/order-success.component';
import { MyOrdersComponent } from './my-orders/my-orders.component';
import { AdminProductsComponent } from './admin/admin-products/admin-products.component';
import { AdminOrdersComponent } from './admin/admin-orders/admin-orders.component';
import { LoginComponent } from './login/login.component';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    ProductsComponent,
    ShoppingCartComponent,
    CheckOutComponent,
    OrderSuccessComponent,
    MyOrdersComponent,
    AdminProductsComponent,
    AdminOrdersComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot([
      {path: '', component: HomeComponent},
      {path: 'products', component: ProductsComponent},
      {path: 'login', component: LoginComponent},
      {path: 'shopping-cart', component: ShoppingCartComponent},

      {path: 'checkout', component: CheckOutComponent, canActivate: [AuthGaurdService]},
      {path: 'order-success', component: OrderSuccessComponent, canActivate: [AuthGaurdService]},
      {path: 'my-orders', component: MyOrdersComponent, canActivate: [AuthGaurdService]},

      {path: 'admin/products', component: AdminProductsComponent, canActivate: [AuthGaurdService, AdminAuthGaurdService]},
      {path: 'admin/orders', component: AdminOrdersComponent, canActivate: [AuthGaurdService, AdminAuthGaurdService]}

    ], { useHash: true, preloadingStrategy: PreloadAllModules }),
    NgbModule.forRoot(),
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    AngularFireAuthModule
  ],
  providers: [AuthService, AuthGaurdService, RoleService, AdminAuthGaurdService],
  bootstrap: [AppComponent]
})
export class AppModule { }
