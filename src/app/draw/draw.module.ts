import { NgModule } from '@angular/core';
import { AvatarComponent } from './avatar/avatar.component';
import { ConfusedComponent } from './confused/confused.component';
import { E404Component } from './e404/e404.component';
import { EmptyComponent } from './empty/empty.component';
import { NoDataComponent } from './no-data/no-data.component';

@NgModule({
  declarations: [
    AvatarComponent,
    ConfusedComponent,
    E404Component,
    EmptyComponent,
    NoDataComponent
  ],
  exports: [
    AvatarComponent,
    ConfusedComponent,
    E404Component,
    EmptyComponent,
    NoDataComponent
  ]
})
export class DrawModule { }
