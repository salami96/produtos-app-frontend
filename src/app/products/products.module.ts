import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { IconsModule } from '../icons/icons.module';
import { NgModule } from '@angular/core';
import { ProductsComponent } from './products.component';
import { RouterModule } from '@angular/router';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { CategoryButtonComponent } from './category-button/category-button.component';

@NgModule({
  declarations: [ProductsComponent, ProductDetailComponent, CategoryButtonComponent],
  imports: [
    CommonModule,
    FormsModule,
    IconsModule,
    RouterModule.forChild([
      { path: '', component: ProductsComponent, pathMatch: 'full' },
      { path: ':cod', component: ProductDetailComponent, pathMatch: 'full' },
    ])
  ]
})
export class ProductsModule { }
