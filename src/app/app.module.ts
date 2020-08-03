import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { TransferHttpCacheModule } from '@nguniversal/common';

import { IconsModule } from './icons/icons.module';
import { AppRoutingModule } from './routing/app.routing.module';
import { NavComponent } from './nav/nav.component';
import { HomeComponent } from './home/home.component';
import { ThemeModule } from './theme/theme.module';
import { blue, green, brown, red } from './theme/themes';

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    HomeComponent,
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'produtos-app' }),
    IconsModule,
    AppRoutingModule,
    /* RouterModule.forRoot([
      { path: '', component: HomeComponent, pathMatch: 'full'},
      { path: 'lazy', loadChildren: './lazy/lazy.module#LazyModule'},
      { path: 'lazy/nested', loadChildren: './lazy/lazy.module#LazyModule'}
    ]), */
    TransferHttpCacheModule,
    ThemeModule.forRoot({
      themes: [ blue, green, brown, red ],
      active: 'green'
    }),
  ],
  providers: [
    IconsModule
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
