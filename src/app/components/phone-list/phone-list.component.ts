import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FilterService } from '../../services/filter.service';
import { CommonModule } from '@angular/common';
import { DataService } from '../../services/data.service';
import { PhoneModule } from '../phone-card/phone.module';
import {Brand,Model,Mobile,StorageOption,Connectivity,Color} from '../../models/interfaces';
import { Subject, takeUntil } from 'rxjs';
import { FlexLayoutModule } from '@angular/flex-layout';
import { BrowserModule } from '@angular/platform-browser';

@Component({
  selector: 'app-phone-list',
  standalone: true,
  imports: [PhoneModule,CommonModule,FlexLayoutModule],
  templateUrl: './phone-list.component.html',
  styleUrl: './phone-list.component.css'
})
export class PhoneListComponent implements OnInit {
  data: any;
  totalPages: number = 0;
  pageSize: number = 6;
  currentPage: number = 1;
  mobiles: Array<Mobile> = [];
  destroy$=new Subject<void>();
  constructor(private dataService: DataService, private filterService: FilterService){

  }
  ngOnInit(): void {
    this.getMobiles();
  }
  getMobiles(): void {
    this.dataService.getData().subscribe(x => {
      this.loadCurrentPageData(x);
      this.filterService.serviceFilter.subscribe(() => this.load(x));
    });
  }
  load(data:any):void{
    this.data=data;
    this.filterService.filterResult$.subscribe(
      (data:any) => {
        this.data = data;
        this.mobiles = data.mobiles;
        this.totalPages = Math.ceil(data.mobiles.length / this.pageSize);
        this.loadCurrentPageData(data);
        this.currentPage = 1;
      }
    );
  }
  loadCurrentPageData(data:any): void {
    this.totalPages=Math.ceil(data.mobiles.length / this.pageSize);
    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.data=data;
    this.mobiles = data.mobiles.slice(startIndex, endIndex);
  }
  nextPage(): void {
    console.log(this.currentPage + "," + this.totalPages);
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.loadCurrentPageData(this.data);
    }
  }

  prevPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.loadCurrentPageData(this.data);
    }
  }
}
