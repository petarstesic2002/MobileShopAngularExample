import { Component } from '@angular/core';
import { DataService } from '../../services/data.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import {Brand,Model,Mobile,StorageOption,Connectivity,Color} from '../../models/interfaces'
import { FilterService } from '../../services/filter.service';

@Component({
  selector: 'app-shop-filter',
  standalone: true,
  imports: [DataService,FormsModule,CommonModule],
  templateUrl: './shop-filter.component.html',
  styleUrl: './shop-filter.component.css'
})
export class ShopFilterComponent {
  data:any;
  brands:Array<Brand>=[];
  models:Array<Model>=[];
  modelsByBrand:Array<Model>=[];
  filterBrand:number=-1;
  filterModels:Array<number>=[];
  filterColors:Array<number>=[];
  filterStorages:Array<number>=[];
  filterConn:Array<number>=[];
  storages:Array<StorageOption>=[];
  colors:Array<Color>=[]
  connectivities:Array<Connectivity>=[];
  constructor(private dataService:DataService, private filterService:FilterService){
  }
  ngOnInit(): void {
    this.getData();
  }
  getData():void{
    this.dataService.getData().subscribe(x=>{
      this.data=x;
      this.brands=x.brands;
      this.models=x.models;
      this.storages=x.storage_options;
      this.colors=x.colors;
      this.connectivities=x.connectivity;
    })
  }
  filter(event:any):void{
    if(event.target.classList.contains("brand")){
      this.modelsByBrand=[];
      const id=event.target.value;
      this.filterBrand=id;
      if(id==-1){
        this.modelsByBrand=[]
      }
      else{
        this.models.forEach((m:Model) => {
          if(m.brand_id==id){
            this.modelsByBrand.push(m);
          }
        });
      }
    }
    if(event.target.classList.contains("cbModel")){
      const id=event.target.value;
      if(event.target.checked){
        this.filterModels.push(id);
      }
      else {
        let e = this.filterModels.indexOf(id);
        this.filterModels.splice(e, 1);
      }
    }
    if(event.target.classList.contains("cbColor")){
      const id=event.target.value;
      if(event.target.checked){
        this.filterColors.push(id);
      }
      else {
        let e = this.filterColors.indexOf(id);
        this.filterColors.splice(e, 1);
      }
    }
    if(event.target.classList.contains("cbStorage")){
      const id=event.target.value;
      if(event.target.checked){
        this.filterStorages.push(id);
      }
      else {
        let e = this.filterStorages.indexOf(id);
        this.filterStorages.splice(e, 1);
      }
    }
    if(event.target.classList.contains("cbConn")){
      const id=event.target.value;
      if(event.target.checked){
        this.filterConn.push(id);
      }
      else {
        let e = this.filterConn.indexOf(id);
        this.filterConn.splice(e, 1);
      }
    }
  }
  startFilter(){
    this.filterService.filter(this.filterBrand,this.filterModels,this.filterColors,this.filterStorages,this.filterConn,this.data);
  }
}
