import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import { Color, Label } from 'ng2-charts';
import { map } from 'rxjs/operators';
import { DataService } from 'src/app/data.service';
import { TicketsDataService } from 'src/app/tickets-data.service';

@Component({
  selector: 'app-doughnut-chart',
  templateUrl: './doughnut-chart.component.html',
  styleUrls: ['./doughnut-chart.component.scss']
})
export class DoughnutChartComponent implements OnInit {

  dataTemperature_uc: Array<number> = []; // Array of stat values
  barChartData: ChartDataSets[] = [];
  private serie_number: any;

  barChartOptions: ChartOptions = {
    responsive: true,
  };

  barChartLabels: Label[] = ['0.1', '0.2', '0.3', '0.4', '0.5', '0.6'];
  barChartType: ChartType = 'line';
  barChartLegend = true;
  barChartPlugins = [];

  lineChartColors: Color[] = [
    {
      borderColor: 'rgba(0, 163, 22, 0.7)',
      backgroundColor: 'rgba(0, 163, 22, 0.4)',
    },
  ];


  constructor(private dataService : DataService, private route: ActivatedRoute) { }

  ngOnInit() {
     this.getVoltage();
  }

  getVoltage(){
    this.dataService.getJSON().pipe(
      map(value => {
        const serie = new Array<any>();

        value.body.data.forEach((element: any) => {
            serie.push(element.data.module_1.temperature_uc);
        });
        return serie;
      })
    ).subscribe(response => {
      this.dataTemperature_uc = response;
      this.barChartData = [
        {
          data: this.dataTemperature_uc,
          label: 'Temperature Microcontroller'
        }
      ]
    });
  }

}
