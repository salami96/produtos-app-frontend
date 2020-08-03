import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from '../home/home.component';
/* import { ContentComponent } from '../content/content.component';
import { PromsComponent } from '../proms/proms.component';
import { AboutComponent } from '../about/about.component';
import { NotFoundComponent } from '../errors/not-found/not-found.component';
import { AuthGuard } from '../services/auth.guard';
import { NeedLoginComponent } from '../errors/need-login/need-login.component';
import { CreatePromsComponent } from '../create-proms/create-proms.component';
import { PromComponent } from '../proms/prom/prom.component';
import { CreateNotifComponent } from '../create-notif/create-notif.component';
import { VideoComponent } from '../proms/video/video.component';
import { PublishVideoComponent } from '../publish-video/publish-video.component';
import { ShopComponent } from '../shop/shop.component';
import { CartComponent } from '../shop/cart/cart.component';
import { OrderComponent } from '../shop/order/order.component';
import { PrivacyComponent } from '../privacy/privacy.component';
import { ProductComponent } from '../shop/product/product.component';
import { LimitComponent } from '../errors/limit/limit.component';
import { KnowMoreComponent } from '../know-more/know-more.component';
import { FormComponent } from '../form/form.component'; */

const routes: Routes = [
  { path: '', component: HomeComponent, pathMatch: 'full' },
  { path: 'produtos', loadChildren: 'app/products/products.module#ProductsModule' },
  { path: 'pedido', loadChildren: 'app/order/order.module#OrderModule' },
  { path: 'perfil', loadChildren: 'app/profile/profile.module#ProfileModule' },
  { path: 'nao-encontrado', loadChildren: 'app/errors/errors.module#ErrorsModule' },
  { path: '**', loadChildren: 'app/errors/errors.module#ErrorsModule' }
  /* { path: 'compras', component: ShopComponent },
  { path: 'saiba-mais', component: KnowMoreComponent },
  // { path: 'compras', component: LimitComponent },
  { path: 'compras/carrinho', component: CartComponent },
  { path: 'pedido/:id', component: OrderComponent },
  { path: 'home/:data', component: ContentComponent },
  { path: 'proms', component: PromsComponent },
  { path: 'prom/:id', component: PromComponent },
  { path: 'produto/:id', component: ProductComponent },
  { path: 'video', component: VideoComponent },
  { path: 'about', component: AboutComponent },
  { path: 'about', component: AboutComponent },
  { path: 'privacidade', component: PrivacyComponent },
  { path: 'pesquisa', component: FormComponent },
  { path: 'about/:data', component: AboutComponent },
  { path: 'create-proms', component: CreatePromsComponent, canActivate: [AuthGuard]},
  { path: 'create-notif', component: CreateNotifComponent, canActivate: [AuthGuard]},
  { path: 'publish-video', component: PublishVideoComponent, canActivate: [AuthGuard]},
  { path: 'need-login', component: NeedLoginComponent },
  { path: '**', component: NotFoundComponent }, */
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  declarations: [],
  exports: [RouterModule]
})
export class AppRoutingModule { }
