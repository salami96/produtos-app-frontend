import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { OrderComponent } from './order.component';
import { CommonModule } from '@angular/common';
import { IconsModule } from '../icons/icons.module';

@NgModule({
  declarations: [OrderComponent],
  imports: [
    CommonModule,
    IconsModule,
    RouterModule.forChild([
      { path: '', component: OrderComponent, pathMatch: 'full'}
    ])

  ]
})
export class OrderModule { }
