import { Injectable } from '@angular/core';
import { Observable, Subject, count } from 'rxjs';
import { Mobile } from '../models/interfaces';
import { CartDto } from '../models/cart-dto.model';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  //private notificationSubject = new Subject<{ message: string}>();
  //notification = this.notificationSubject.asObservable();
  private countSubject=new Subject<number>();
  countObs=this.countSubject.asObservable();
  s: any = localStorage.getItem('cart');
  cart: Array<CartDto> = JSON.parse(this.s) ? JSON.parse(this.s) : [];

  show() {
    this.countSubject.next(this.cart.length>0?this.cart.length:0);
  }
  add(cartItem: CartDto) {
    if (this.cart.length > 0) {
      let p = false;
      this.cart.forEach((x:CartDto)=>{
        if(x.phoneId==cartItem.phoneId&&x.chosenColor==cartItem.chosenColor&&x.chosenConn==cartItem.chosenConn&&x.chosenStorage==cartItem.chosenStorage){
          x.count++;
          p=true;
        }
      })
      if(!p){
        this.cart.push(cartItem);
      }
    }
    else{
        this.cart.push(cartItem);
    }
    localStorage.setItem('cart', JSON.stringify(this.cart));
    this.countSubject.next(this.cart.length>0?this.cart.length:0);
    //this.notificationSubject.next({message: 'Added to cart!'});
  }
  clearAll():void{
    localStorage.removeItem('cart');
    this.countSubject.next(0);
  }
  lowerQuantity(item:CartDto){
    this.cart.forEach((x:CartDto,index)=>{
      if(x.phoneId==item.phoneId&&x.chosenColor==item.chosenColor&&x.chosenConn==item.chosenConn&&x.chosenStorage==item.chosenStorage){
        if(x.count>1){
          x.count--;
        }
      }
    });
    localStorage.setItem('cart', JSON.stringify(this.cart));
    this.countSubject.next(this.cart.length>0?this.cart.length:0);
    //this.notificationSubject.next({message:'Quantity Lowered'})
  }
}
