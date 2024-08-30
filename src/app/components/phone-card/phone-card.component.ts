import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { FilterService } from '../../services/filter.service';
import { CommonModule } from '@angular/common';
import { DataService } from '../../services/data.service';
import { PhoneModule } from '../phone-card/phone.module';
import { CartService } from '../../services/cart.service';
import {Brand,Model,Mobile,StorageOption,Connectivity,Color} from '../../models/interfaces';
import { Router } from '@angular/router';

@Component({
  selector: 'app-phone-card',
  templateUrl: './phone-card.component.html',
  styleUrl: './phone-card.component.css'
})
export class PhoneCardComponent {
  @Input() mobile!: Mobile;
  data: any=[];
  constructor(private dataService:DataService, private cartService: CartService, private router : Router){

  }
  ngOnInit(): void {
    this.data=this.dataService.getData().subscribe(d=>{
      this.setData(d);
    });
  }
  setData(data:any){
    this.data=data;
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
  viewDetails(mobile: Mobile) {
    this.router.navigate(['/phone', mobile.id]);
  }
}
