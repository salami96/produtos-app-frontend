import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { OrderComponent } from './order.component';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [OrderComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([
      { path: '', component: OrderComponent, pathMatch: 'full'}
    ])

  ]
})
export class OrderModule { }
