import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import { Color, Label } from 'ng2-charts';
import { map } from 'rxjs/operators';
import { DataService } from 'src/app/data.service';
import { TicketsDataService } from 'src/app/tickets-data.service';

@Component({
  selector: 'app-line-chart',
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.scss']
})
export class LineChartComponent implements OnInit {

  dataSoc: Array<number> = []; // Array of stat values
  barChartData: ChartDataSets[] = [];
  private serie_number: any;

  barChartOptions: ChartOptions = {
    responsive: true,
  };

  barChartLabels: Label[] = ['00:00', '06:00', '12:00', '18:00', '22:00', ''];
  barChartType: ChartType = 'line';
  barChartLegend = true;
  barChartPlugins = [];

  lineChartColors: Color[] = [
    {
      backgroundColor: 'rgba(202, 91, 0, 0.7)',
      pointBackgroundColor: 'orangered',
      pointHoverBackgroundColor: 'rgba(151,187,205,1)',
      borderColor: 'rgba(255,35,15,0.3)',
      pointBorderColor: '#fff',
      pointHoverBorderColor: 'white'
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
            serie.push(element.data.module_1.soc);
        });
        return serie;
      })
    ).subscribe(response => {
      this.dataSoc = response;
      this.barChartData = [
        {
          data: this.dataSoc,
          label: 'System Bacterie Soc (State of charge)'
        }
      ]
    });
  }


}
