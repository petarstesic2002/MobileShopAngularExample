import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { HomeComponent } from './components/home/home.component';
import { PhoneListComponent } from './components/phone-list/phone-list.component';
import { PhoneDetailsComponent } from './components/phone-details/phone-details.component';
import { CartComponent } from './components/cart/cart.component';
import { DataService } from './services/data.service';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { AuthorComponent } from './components/author/author.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    PhoneListComponent,
    HttpClientModule,
    BrowserModule,
    CommonModule
],
  bootstrap: [AppComponent]
})
export class AppModule { }
