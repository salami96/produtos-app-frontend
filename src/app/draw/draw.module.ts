import { NgModule } from '@angular/core';
import { AvatarComponent } from './avatar/avatar.component';
import { CancelledComponent } from './cancelled/cancelled.component';
import { ConfusedComponent } from './confused/confused.component';
import { DeliveryComponent } from './delivery/delivery.component';
import { E404Component } from './e404/e404.component';
import { EmptyComponent } from './empty/empty.component';
import { MapComponent } from './map/map.component';
import { NoDataComponent } from './no-data/no-data.component';
import { OrderReadyComponent } from './order-ready/order-ready.component';
import { OrderReceivedComponent } from './order-received/order-received.component';
import { SeparationComponent } from './separation/separation.component';
import { SuccessComponent } from './success/success.component';

@NgModule({
  declarations: [
    AvatarComponent,
    CancelledComponent,
    ConfusedComponent,
    DeliveryComponent,
    E404Component,
    EmptyComponent,
    MapComponent,
    NoDataComponent,
    OrderReadyComponent,
    OrderReceivedComponent,
    SeparationComponent,
    SuccessComponent
  ],
  exports: [
    AvatarComponent,
    CancelledComponent,
    ConfusedComponent,
    DeliveryComponent,
    E404Component,
    EmptyComponent,
    MapComponent,
    NoDataComponent,
    OrderReadyComponent,
    OrderReceivedComponent,
    SeparationComponent,
    SuccessComponent
  ]
})
export class DrawModule { }
