import { NgModule } from '@angular/core';
import { ProfileComponent } from './profile.component';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { SigninComponent } from './signin/signin.component';
import { AddressComponent } from './address/address.component';
import { AuthGuard } from '../services/auth.guard';
import { ChildGuard } from '../services/child.guard';
import { IconsModule } from '../icons/icons.module';
import { FormsModule } from '@angular/forms';
import { DrawModule } from '../draw/draw.module';


@NgModule({
  declarations: [ ProfileComponent, SigninComponent, AddressComponent ],
  imports: [
    CommonModule,
    DrawModule,
    IconsModule,
    FormsModule,
    RouterModule.forChild([
      { path: '', component: ProfileComponent, pathMatch: 'full', canActivate: [ AuthGuard ]},
      { path: 'endereco', component: AddressComponent, pathMatch: 'full', canActivate: [ AuthGuard ]},
      { path: ':action', component: SigninComponent, pathMatch: 'full', canActivate: [ ChildGuard ]},
      // { path: 'cadastro', component: SignupComponent, pathMatch: 'full', canActivate: [ ChildGuard ]},
    ]),
  ],
})
export class ProfileModule { }
