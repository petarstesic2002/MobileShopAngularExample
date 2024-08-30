import { Component, OnInit } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { CartDto } from '../../models/cart-dto.model';
import { Brand, Color, Connectivity, Mobile, Model, StorageOption } from '../../models/interfaces';
import { DataService } from '../../services/data.service';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { Route, Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css',
  standalone:true,
  imports:[HttpClientModule,CommonModule,RouterModule]
})
export class CartComponent implements OnInit {
  cart:Array<CartDto>=[];
  mobiles:Array<Mobile>=[];
  data:any;
  totalPrice:number=0;
  constructor(private cartService:CartService,private dataService:DataService,private router:Router){

  }
  ngOnInit(): void {
    this.cart=this.cartService.cart
    this.dataService.getData().subscribe(data=>{
      this.setData(data);
    })
  }
  setData(data:any){
    this.data=data;
    this.cart.forEach((c:CartDto)=>{
      data.mobiles.forEach((x:Mobile)=>{
        if(c.phoneId==x.id){
          this.mobiles.push(x);
          this.totalPrice+=x.prices[0]*c.count;
        }
      })
    })
  }

  getBrand(mobileId:number):string{
    let modelId:number;
    let brandId:number;
    this.mobiles.forEach((x:Mobile)=>{
      if(mobileId==x.id)
        modelId=x.model_id;
    })
    this.data.models.forEach((x:Model)=>{
      if(x.id==modelId)
        brandId=x.brand_id
    })
    return this.data.brands.find((x:Brand)=>x.id==brandId).name
  }
  getModel(mobileId:number):string{
    let modelId:number;
    this.mobiles.forEach((x:Mobile)=>{
      if(mobileId==x.id)
        modelId=x.model_id;
    })
    return this.data.models.find((x:Model)=>x.id==modelId).name
  }
  getColor(colorId:number):string{
    return this.data.colors.find((x:Color)=>x.id==colorId).name;
  }
  getStorage(storageId:number):string{
    return this.data.storage_options.find((x:StorageOption)=>x.id==storageId).name;
  }
  getConn(connId:number):string{
    return this.data.connectivity.find((x:Connectivity)=>x.id==connId).name;
  }
  getPrice(phoneId:number):string{
    return this.data.mobiles.find((x:Mobile)=>x.id==phoneId).prices[0];
  }
  order(){
    this.cartService.clearAll();
    this.router.navigate(['/']);
  }
  changeQty(event:any){
    let ind=event.target.value;
    let item:CartDto=this.cart[ind]
    let phone=this.data.mobiles.find((x:Mobile)=>x.id==item.phoneId);
    if(event.target.classList.contains('btnM')){
      if(item.count>1)
        this.totalPrice-=phone.prices[0];
      this.cartService.lowerQuantity(item);
    }
    else{
      this.cartService.add(item);
      this.totalPrice+=phone.prices[0];
    }
  }
  clear(){
    this.cartService.clearAll();
    this.router.navigate(['/']);
  }
}
