import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { TransferHttpCacheModule } from '@nguniversal/common';

import { IconsModule } from './icons/icons.module';
import { AppRoutingModule } from './routing/app.routing.module';
import { HomeComponent } from './home/home.component';
import { NavigationComponent } from './navigation/navigation.component';
import { LandingPageModule } from './landing-page/landing-page.module';
import { AuthGuard } from './services/auth.guard';
import { ChildGuard } from './services/child.guard';

import { AngularFireModule } from 'angularfire2';
import { AngularFireAuth } from 'angularfire2/auth';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

const firebaseConfig = {
  apiKey: 'AIzaSyCYIemjawWYApHGDQ1QpjheX4FArLLPDfo',
  authDomain: 'produtos-app-login.firebaseapp.com',
  databaseURL: 'https://produtos-app-login.firebaseio.com',
  projectId: 'produtos-app-login',
  storageBucket: 'produtos-app-login.appspot.com',
  messagingSenderId: '558255407559',
  appId: '1:558255407559:web:79a7b9b9fa17b455ecd9e2',
  measurementId: 'G-C19JT983YJ'
};

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavigationComponent,
  ],
  imports: [
    AngularFireModule.initializeApp(firebaseConfig),
    AppRoutingModule,
    BrowserModule.withServerTransition({ appId: 'produtos-app' }),
    IconsModule,
    LandingPageModule,
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
    AngularFireAuth,
    AngularFireModule,
    AuthGuard,
    ChildGuard,
    IconsModule,
    LandingPageModule,
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }

