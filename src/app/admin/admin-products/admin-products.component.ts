import { ProductService } from './../../services/product.service';
import { Component, OnInit, OnDestroy, ViewChild, AfterViewInit } from '@angular/core';
import { Product } from './../../models/product';
import {MatPaginator, MatTableDataSource, MatSort} from '@angular/material';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css']
})
export class AdminProductsComponent implements OnInit, OnDestroy, AfterViewInit {
  products: Product[] = [];
  filteredProducts: Product[] = [];
  sub: any;
  displayedColumns = ['title', 'price', 'symbol'];
  dataSource: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private allProducts: ProductService) {
    this.sub = this.allProducts.getAll().subscribe(res => {
      const allKeys = Object.keys(res).sort();
        for (const keys of allKeys) {
          const val = {
            key: keys ,
            value: res[keys]
            };
          this.products.push(val);
        }
    });
   }


  filter(query: string) {

    this.filteredProducts = (query) ? this.products.filter(
      p => {
            return p.value.title.toLowerCase().includes(query.toLowerCase());
        }
      ) : this.products;

      this.dataSource = new MatTableDataSource<Product>(this.filteredProducts);
      this.dataSource.paginator = this.paginator;
  }
  sortData(ev) {
    console.log(ev);
    console.log(this.dataSource, this.sort);
  }
  ngOnInit() {
  }
  ngAfterViewInit() {
    this.filteredProducts = this.products;
    this.dataSource = new MatTableDataSource<Product>(this.filteredProducts);
    setTimeout(() => this.dataSource.paginator = this.paginator, 1000);
    this.dataSource.sort = this.sort;
  }
  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
