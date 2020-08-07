import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { TransferHttpCacheModule } from '@nguniversal/common';

import { IconsModule } from './icons/icons.module';
import { AppRoutingModule } from './routing/app.routing.module';
import { HomeComponent } from './home/home.component';
import { NavigationComponent } from './navigation/navigation.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavigationComponent,
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
/*     ThemeModule.forRoot({
      themes: [ blue, green, brown, red ],
      active: 'red'
    }), */
  ],
  providers: [
    IconsModule
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
