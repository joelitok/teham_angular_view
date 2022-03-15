import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import { Color, Label } from 'ng2-charts';
import { map } from 'rxjs/operators';
import { DataService } from 'src/app/data.service';
import { TicketsDataService } from 'src/app/tickets-data.service';

@Component({
  selector: 'app-pie-chart',
  templateUrl: './pie-chart.component.html',
  styleUrls: ['./pie-chart.component.scss']
})
export class PieChartComponent implements OnInit {

  dataTemperature: Array<number> = []; // Array of stat values
  barChartData: ChartDataSets[] = [];
  private serie_number: any;

  barChartOptions: ChartOptions = {
    responsive: true,
  };

  barChartLabels: Label[] = ['-20', '-10', '0', '10', '20', '30'];
  barChartType: ChartType = 'line';
  barChartLegend = true;
  barChartPlugins = [];

  lineChartColors: Color[] = [
    {
      borderColor: 'aqua',
      backgroundColor: 'rgba(0,255,255,0.22)',
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
            serie.push(element.data.module_1.temperature_senior);
        });
        return serie;
      })
    ).subscribe(response => {
      this.dataTemperature = response;
      this.barChartData = [
        {
          data: this.dataTemperature,
          label: 'Bacterie Temperature Sensor [512]'
        }
      ]
    });
  }

}
