import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { OrderComponent } from './order.component';
import { CommonModule } from '@angular/common';
import { IconsModule } from '../icons/icons.module';
import { DrawModule } from '../draw/draw.module';
import { FormsModule } from '@angular/forms';
import { OrderDetailComponent } from './order-detail/order-detail.component';
import { ClipboardModule } from 'ngx-clipboard';

@NgModule({
  declarations: [ OrderComponent, OrderDetailComponent ],
  imports: [
    ClipboardModule,
    CommonModule,
    DrawModule,
    FormsModule,
    IconsModule,
    RouterModule.forChild([
      { path: '', component: OrderComponent, pathMatch: 'full' },
      { path: ':cod', component: OrderDetailComponent }
    ])

  ]
})
export class OrderModule { }
