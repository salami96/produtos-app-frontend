import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { OrderComponent } from './order.component';
import { CommonModule } from '@angular/common';
import { IconsModule } from '../icons/icons.module';
import { DrawModule } from '../draw/draw.module';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [OrderComponent],
  imports: [
    CommonModule,
    DrawModule,
    FormsModule,
    IconsModule,
    RouterModule.forChild([
      { path: '', component: OrderComponent, pathMatch: 'full'}
    ])

  ]
})
export class OrderModule { }
