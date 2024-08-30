import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { PhoneCardComponent } from './phone-card.component';
import { DataService } from '../../services/data.service';



@NgModule({
  declarations: [PhoneCardComponent],
  imports: [
    CommonModule, RouterModule
  ],
  providers: [DataService],
  exports: [
    PhoneCardComponent
  ]
})
export class PhoneModule { }
