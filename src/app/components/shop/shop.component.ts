import { Component } from '@angular/core';
import { PhoneListComponent } from '../phone-list/phone-list.component';
import { ShopFilterComponent } from "../shop-filter/shop-filter.component";
import { FlexLayoutModule } from '@angular/flex-layout';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrl: './shop.component.css',
  standalone:true,
  imports: [PhoneListComponent, ShopFilterComponent,FlexLayoutModule]
})
export class ShopComponent {

}
