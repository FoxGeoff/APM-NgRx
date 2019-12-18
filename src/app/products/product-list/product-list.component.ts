import { Component, OnInit, OnDestroy } from '@angular/core';

//import { Subscription, throwError } from 'rxjs';

import { Product } from '../product';
import { ProductService } from '../product.service';
import { Store, select } from '@ngrx/store';

import * as fromProduct from '../state/product.reducer';
import * as productActions from '../state/product.actions';

@Component({
  selector: 'pm-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit, OnDestroy {
  pageTitle = 'Products';
  errorMessage: string;

  displayCode: boolean;

  products: Product[];

  // Used to highlight the selected product in the list
  selectedProduct: Product | null;
  //sub: Subscription;

  constructor(private store: Store<fromProduct.State>,
    private productService: ProductService) { }

  ngOnInit(): void {

    /* Using Redux Pattern */
    //TODO: Unsubscribe
    this.store.pipe(select(fromProduct.getCurrentProduct)).subscribe(
      currentProduct => this.selectedProduct = currentProduct
    );
    /* Using the service */
    //this.sub = this.productService.selectedProductChanges$.subscribe(
    //selectedProduct => this.selectedProduct = selectedProduct
    //);
    /****************************************************** */

    this.productService.getProducts().subscribe({
      next: (products: Product[]) => this.products = products,
      error: (err: any) => this.errorMessage = err.error
    });

    //TODO: Unsubscribe
    this.store.pipe(select(fromProduct.getShowProductCode)).subscribe(
      showProductCode => this.displayCode = showProductCode
    );
  }

  ngOnDestroy(): void {
    //this.sub.unsubscribe(); //
  }

  checkChanged(value: boolean): void {
    this.store.dispatch(new productActions.ToggleProductCode(value));
  }

  newProduct(): void {
    /* Using Redux Pattern */
    this.store.dispatch(new productActions.InitializeCurrentProduct());
    /* Using the service */
    //this.productService.changeSelectedProduct(this.productService.newProduct());
  }

  productSelected(product: Product): void {
    /* Using Redux Pattern */
    this.store.dispatch(new productActions.SetCurrentProduct(product));
    /* Using the service */
    //this.productService.changeSelectedProduct(product);
  }

  //TODO: WIP
  productsLoad(products: Product[]): void {
    this.store.dispatch(new productActions.Load());
  }
}
