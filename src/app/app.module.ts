import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BlueChartComponent } from './blue-chart/blue-chart.component';

@NgModule({
  declarations: [	
    AppComponent,
      BlueChartComponent
   ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
