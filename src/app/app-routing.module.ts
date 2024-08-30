import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { ShopComponent } from './components/shop/shop.component';
import { PhoneDetailsComponent } from './components/phone-details/phone-details.component';
import { CartComponent } from './components/cart/cart.component';
import { AuthorComponent } from './components/author/author.component';

const routes: Routes = [
  {path:'',component:HomeComponent},
  {path:'phones',component:ShopComponent},
  {path:'phone/:id',component:PhoneDetailsComponent},
  {path:'cart',component:CartComponent},
  {path:'author',component:AuthorComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
