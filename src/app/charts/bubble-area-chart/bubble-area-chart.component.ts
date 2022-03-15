import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import { Color, Label } from 'ng2-charts';
import { map } from 'rxjs/operators';
import { DataService } from 'src/app/data.service';
import { TicketsDataService } from 'src/app/tickets-data.service';

@Component({
  selector: 'app-bubble-area-chart',
  templateUrl: './bubble-area-chart.component.html',
  styleUrls: ['./bubble-area-chart.component.scss']
})
export class BubbleAreaChartComponent implements OnInit {

  dataoutputVoltage: Array<number> = []; // Array of stat values
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
      borderColor: 'rgba(142, 0, 170, 0.7)',
      backgroundColor: 'rgba(142, 0, 170, 0.4)',
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
            serie.push(element.data.batteryData.outputVoltage);       
        });
        return serie;
      })
    ).subscribe(response => {
      this.dataoutputVoltage = response;
      this.barChartData = [
        {
          data: this.dataoutputVoltage,
          label: 'outputVoltage'
        }
      ]
    });
  }


}
