import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from '../home/home.component';

const routes: Routes = [
  { path: '', component: HomeComponent, pathMatch: 'full' },
  { path: 'produtos', loadChildren: 'app/products/products.module#ProductsModule' },
  { path: 'pedido', loadChildren: 'app/order/order.module#OrderModule' },
  { path: 'perfil', loadChildren: 'app/profile/profile.module#ProfileModule' },
  { path: 'nao-encontrado', loadChildren: 'app/errors/errors.module#ErrorsModule' },
  { path: '**', loadChildren: 'app/errors/errors.module#ErrorsModule' }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  declarations: [],
  exports: [RouterModule]
})
export class AppRoutingModule { }
