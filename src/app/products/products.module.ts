import { NgModule } from '@angular/core';
import { ProductsComponent } from './products.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [ProductsComponent],
  imports: [
    RouterModule.forChild([
      { path: '', component: ProductsComponent, pathMatch: 'full'}
    ])
  ]
})
export class ProductsModule { }
