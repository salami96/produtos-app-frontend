import { NgModule } from '@angular/core';
import { AvatarComponent } from './avatar/avatar.component';
import { ConfusedComponent } from './confused/confused.component';
import { E404Component } from './e404/e404.component';
import { EmptyComponent } from './empty/empty.component';
import { NoDataComponent } from './no-data/no-data.component';
import { SuccessComponent } from './success/success.component';
import { SeparationComponent } from './separation/separation.component';
import { DeliveryComponent } from './delivery/delivery.component';
import { OrderReceivedComponent } from './order-received/order-received.component';
import { MapComponent } from './map/map.component';

@NgModule({
  declarations: [
    AvatarComponent,
    ConfusedComponent,
    E404Component,
    EmptyComponent,
    NoDataComponent,
    SuccessComponent,
    SeparationComponent,
    DeliveryComponent,
    OrderReceivedComponent,
    MapComponent
  ],
  exports: [
    AvatarComponent,
    ConfusedComponent,
    E404Component,
    EmptyComponent,
    NoDataComponent,
    SuccessComponent,
    SeparationComponent,
    DeliveryComponent,
    OrderReceivedComponent,
    MapComponent
  ]
})
export class DrawModule { }
