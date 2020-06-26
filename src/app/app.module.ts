import { NgModule }       from '@angular/core';
import { BrowserModule }  from '@angular/platform-browser';
import { FormsModule }    from '@angular/forms';
import { HttpClientModule }    from '@angular/common/http';

import { AppComponent }         from './app.component';
import { DashboardComponent }   from './dashboard/dashboard.component';

import { InfiniteScrollModule } from 'ngx-infinite-scroll';

import { AppRoutingModule }     from './app-routing.module';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    InfiniteScrollModule,
  ],
  declarations: [
    AppComponent,
    DashboardComponent,
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }