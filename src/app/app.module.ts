import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { DashboardComponent } from './components/dashboard/dashboard.component';

import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { TicketsComponent } from './components/tickets/tickets.component';
import { MonitoringComponent } from './components/monitoring/monitoring.component';

import { ChartsModule } from 'ng2-charts';


import { BarChartComponent } from './charts/bar-chart/bar-chart.component';
import { DoughnutChartComponent } from './charts/doughnut-chart/doughnut-chart.component';
import { PieChartComponent } from './charts/pie-chart/pie-chart.component';
import { BubbleAreaChartComponent } from './charts/bubble-area-chart/bubble-area-chart.component';
import { ScatterAreaChartComponent } from './charts/scatter-area-chart/scatter-area-chart.component';
import { LineChartComponent } from './charts/line-chart/line-chart.component';




@NgModule({
  declarations: [
    AppComponent, 
    DashboardComponent, 
    TicketsComponent, 
    MonitoringComponent, 
    BarChartComponent, 
    DoughnutChartComponent, 
    PieChartComponent, 
    BubbleAreaChartComponent, 
    ScatterAreaChartComponent, 
    LineChartComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatSidenavModule,
    MatButtonModule,
    MatIconModule,
    MatDividerModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatIconModule,
    MatButtonModule,
    MatToolbarModule,
    FormsModule,
    ChartsModule
  ],
  providers: [

  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
