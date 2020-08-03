import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { OrderComponent } from './order.component';

@NgModule({
  declarations: [OrderComponent],
  imports: [
    RouterModule.forChild([
      { path: '', component: OrderComponent, pathMatch: 'full'}
    ])

  ]
})
export class OrderModule { }
