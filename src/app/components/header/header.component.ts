import { Component, OnChanges, OnInit, SimpleChange, SimpleChanges } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { CartDto } from '../../models/cart-dto.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit,OnChanges {
  constructor(private cartService:CartService){}
  cart:any=localStorage.getItem('cart');
  cartArray:Array<CartDto> = JSON.parse(this.cart) ? JSON.parse(this.cart) : [];
  cartNumber=this.cartArray.length
  ngOnInit(): void {
    this.cartService.countObs.subscribe(count=>{
      this.cartNumber=count;
    })
  }
  ngOnChanges(changes: SimpleChanges): void {
    this.cartService.show();
  }
}
