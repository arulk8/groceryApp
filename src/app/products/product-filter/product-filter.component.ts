import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { CategoryService } from '../../services/category.service';
import { Catgory } from '../../models/catgory';

@Component({
  selector: 'app-product-filter',
  templateUrl: './product-filter.component.html',
  styleUrls: ['./product-filter.component.css']
})
export class ProductFilterComponent implements OnInit, OnDestroy {
  categories: Catgory[] = [];
  catSub: any;
  @Input('category') category;
  constructor( private categoryservice: CategoryService,
  ) { }
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
    this.catSub = this.categoryservice.getCategories().subscribe(res => {
      this.createArray(res, this.categories);
      console.log(this.categories);
    });
  }
  ngOnDestroy() {
    this.catSub.unsubscribe();

  }
}
