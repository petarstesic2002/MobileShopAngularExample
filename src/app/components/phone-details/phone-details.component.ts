import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/data.service';
import { FlexLayoutModule } from '@angular/flex-layout';
import { Mobile,Color,StorageOption,Connectivity } from '../../models/interfaces';
import { CartService } from '../../services/cart.service';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { PhoneCardComponent } from '../phone-card/phone-card.component';
import { CartDto } from '../../models/cart-dto.model';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-phone-details',
  templateUrl: './phone-details.component.html',
  styleUrl: './phone-details.component.css',
  standalone:true,
  imports:[CommonModule, RouterModule, HttpClientModule ,DataService,FlexLayoutModule,FormsModule]
})
export class PhoneDetailsComponent implements OnInit{
  item!:Mobile;
  data:any;
  conn:number=-1;
  color:number=-1;
  storage:number=-1;
  chosenColor="";
  chosenConn="";
  chosenStorage="";
  message:string="Add To Cart";
  buttonClass="btn btn-outline-danger";
  constructor(private dataService:DataService, private cartService:CartService, private route:ActivatedRoute){

  }
  ngOnInit(): void {
    const id=this.route.snapshot.paramMap.get('id');
    if(id){
      this.dataService.getData().subscribe((data)=>{
        data.mobiles.forEach((m:Mobile)=>{
          if(m.id==Number(id)){
            this.setData(m,data);
          }
        })
      })
    }
  }
  setData(mobile:Mobile,data:any):void{
    this.item=mobile;
    this.data=data;
    this.color=this.item.color_ids[0];
    this.storage=this.item.storage_option_ids[0];
    this.conn=this.item.connectivity_ids[0];
  }
  getModel(modelId:number,data:any):string{
    return this.dataService.getModel(modelId,data);
  }
  getBrand(modelId:number,data:any):string{
    return this.dataService.getBrand(modelId,data);
  }
  getColors(colorIds:Array<number>,data:any):Array<string>{
    return this.dataService.getColors(colorIds,data);
  }
  getStorages(storageIds:Array<number>,data:any):Array<string>{
    return this.dataService.getStorage(storageIds,data);
  }
  getConnectivities(connIds:Array<number>,data:any):Array<string>{
    return this.dataService.getConnectivity(connIds,data);
  }
  ddChange(event:any){
    if(event.target.classList.contains('ddColor')){
      this.data.colors.forEach((x:Color)=>{
        if(x.name==event.target.value)
          this.color=x.id
      })
    }
    if(event.target.classList.contains('ddStorage')){
      this.data.storage_options.forEach((x:StorageOption)=>{
        if(x.name==event.target.value)
          this.storage=x.id;
      })
    }
    if(event.target.classList.contains('ddConn')){
      this.data.connectivity.forEach((x:Connectivity)=>{
        if(x.name==event.target.value)
          this.conn=x.id;
      })
    }
  }
  addToCart() {
    console.log(this.color);
    let cartItem=new CartDto(this.color,this.conn,this.storage,this.item.id);
    this.cartService.add(cartItem);
      this.message="Added To Cart!";
      this.buttonClass="btn btn-primary"
      console.log(this.message);
      setTimeout(() => {
        this.message = "Add To Cart";
        this.buttonClass="btn btn-outline-danger"
      }, 3000);
  }
}
