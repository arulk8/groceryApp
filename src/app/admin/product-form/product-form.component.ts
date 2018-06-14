import { Product } from './../../models/product';

import { Router, ActivatedRoute } from '@angular/router';
import { ProductService } from './../../services/product.service';
import { CategoryService } from './../../services/category.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { take } from 'rxjs/operators';


@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit, OnDestroy {
  categories: any[] = [];
  product: Product = {
    key: '',
    value: {
      title: '',
      price: 0,
      category: '',
      imageUrl: '',
    }
  } as Product;
  sub: any;
  catSub: any;
  id: string;
  constructor(
    private categoryservice: CategoryService,
    private productservice: ProductService,
    private router: Router,
    private route: ActivatedRoute
  ) {
      this.id = this.route.snapshot.paramMap.get('id');
      if (this.id) {
         this.sub = this.productservice.get(this.id).subscribe(res => {
           this.product = {
             key: this.id,
             value: res
           } as Product;
           console.log(res, this.product);
         });
        }
    }

  save(product) {
    if (this.id) {
      this.productservice.update(this.id, product);
    } else {
      this.productservice.create(product);
    }
    this.router.navigate(['/admin/products']);
  }
  delete() {
    if (confirm('Are you sure you want to delete ?')) {
        this.productservice.delete(this.id);
        this.router.navigate(['/admin/products']);
    } else {
        return;
    }
  }
  ngOnInit() {
   this.catSub = this.categoryservice.getCategories().subscribe(res => {

        const allKeys = Object.keys(res).sort();
        for (let i = 0; i < allKeys.length; i++) {
          const val = {
            key: allKeys[i] ,
            value: res[allKeys[i]]
            };
          this.categories.push(val);
        }
        console.log(this.categories);
      });
  }
  ngOnDestroy() {
    if (this.id) {
    this.sub.unsubscribe();
    }
    this.catSub.unsubscribe();
  }

}
