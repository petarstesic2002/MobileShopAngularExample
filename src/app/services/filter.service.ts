import { EventEmitter, Injectable, model } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import {Brand,Model,Mobile,StorageOption,Connectivity,Color} from '../models/interfaces';

@Injectable({
  providedIn: 'root'
})
export class FilterService {

  constructor() { }
  serviceFilter = new EventEmitter<void>();


  public filterResult: any;

  private filterResultSource = new BehaviorSubject<any>([]);
  filterResult$ = this.filterResultSource.asObservable();
  filter(filterBrand:number,filterModel: Array<number>=[],filterColors: Array<number>,filterStorages:Array<number>,filterConn:Array<number>, data: any):void{
    let parsed=JSON.parse(JSON.stringify(data));
    let filtered:Array<Mobile>=data.mobiles;
    let modelSet=new Set(filterModel);
    let modelsFilter=modelSet;
    if(filterBrand>-1&&modelSet.size<1){
      data.models.forEach((x:Model) => {
        if(x.brand_id==filterBrand)
          modelsFilter.add(x.id);
      });
    }
    if(modelsFilter.size>0){
      let tmpArray:Array<Mobile>=[];
      modelsFilter.forEach((x:number)=>{
        filtered.forEach((y:Mobile)=>{
          if(y.model_id==x){
            tmpArray.push(y);
          }
        })
      })
      filtered=tmpArray;
    }
    if(filterColors.length>0){
      let tmpArrayColors:Array<Mobile>=[];
      filterColors.forEach((x:number)=>{
        filtered.forEach((y:Mobile)=>{
          y.color_ids.forEach(c => {
            if(c==x){
              if(!tmpArrayColors.includes(y))
                tmpArrayColors.push(y);
            }
          });
        })
      })
      filtered=tmpArrayColors;
    }
    if(filterStorages.length>0){
      let tmpArraySt:Array<Mobile>=[];
      filterStorages.forEach((x:number)=>{
        filtered.forEach((y:Mobile)=>{
          y.storage_option_ids.forEach(s=>{
            if(s==x){
              if(!tmpArraySt.includes(y))
                tmpArraySt.push(y);
            }
          })
        })
      })
      filtered=tmpArraySt;
    }
    if(filterConn.length>0){
      let tmpArrayCon:Array<Mobile>=[];
      filterConn.forEach((x:number)=>{
        filtered.forEach((y:Mobile)=>{
          y.connectivity_ids.forEach(c=>{
            if(c==x){
              if(!tmpArrayCon.includes(y))
              tmpArrayCon.push(y);
            }
          })
        })
      })
      filtered=tmpArrayCon;
    }
    parsed.mobiles=filtered;
    this.setFilterResult(parsed);
    this.serviceFilter.emit();
  }
  setFilterResult(data: any) {
    this.filterResultSource.next(data);
  }
}
