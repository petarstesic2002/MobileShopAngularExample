import { EventEmitter, Injectable, NgModule } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import {Mobile,Brand,Model,StorageOption,Color,Connectivity} from '../models/interfaces';
@Injectable({
  providedIn: 'root'
})
@NgModule({
  imports: [HttpClientModule]
})
export class DataService {
  models:Array<any>=[];
  constructor(private httpClient: HttpClient) { }

  getData(): Observable<any>{
    return this.httpClient.get("../assets/data/store.json");
  }
  getConnectivity(connectivityIds:Array<number>,data:any):Array<string>{
    let connectivities:Array<string>=[];
    connectivityIds.forEach(x=>{
      let con=data.connectivity.find((c:Connectivity)=>c.id===x);
      connectivities.push(con.name);
    })
    return connectivities;
  }
  getStorage(storageIds:Array<number>,data:any):Array<string>{
    let storage:Array<string>=[];
    storageIds.forEach(x=>{
      let so=data.storage_options.find((s:StorageOption)=>s.id===x);
      storage.push(so.name);
    })
    return storage;
  }
  getColors(colorIds:Array<number>,data:any):Array<string>{
    let colors:Array<string>=[];
    colorIds.forEach(x=>{
      let col=data.colors.find((c:Color)=>c.id===x);
      colors.push(col.name);
    })
    return colors;
  }
  getModel(modelId:number,data:any):string{
    let model=data.models.find((m:Model)=>m.id===modelId);
    return model.name;
  }
  getBrand(modelId:number,data:any):string{
    this.setModels(data);
    let model=this.models.find((m:Model)=>m.id===modelId);
    let brand=data.brands.find((b:Brand)=>b.id===model.brand_id);
    return brand.name;
  }
  setModels(data:any){
    this.models=data.models;
  }
}
