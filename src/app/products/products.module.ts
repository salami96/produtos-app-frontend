import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { IconsModule } from '../icons/icons.module';
import { NgModule } from '@angular/core';
import { ProductsComponent } from './products.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [ProductsComponent],
  imports: [
    CommonModule,
    FormsModule,
    IconsModule,
    RouterModule.forChild([
      { path: '', component: ProductsComponent, pathMatch: 'full'}
    ])
  ]
})
export class ProductsModule { }
