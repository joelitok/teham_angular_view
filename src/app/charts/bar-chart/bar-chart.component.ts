import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import { Color, Label } from 'ng2-charts';
import { map } from 'rxjs/operators';
import { TicketsDataService } from 'src/app/tickets-data.service';

@Component({
  selector: 'app-bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.scss']
})
export class BarChartComponent implements OnInit {

  dataVoltage: Array<number> = []; // Array of stat values
  dataCurrent: Array<number> = [];
  barChartData: ChartDataSets[] = [];
  private serie_number: any ;

   serie = new Array<any>();
   serie2 = new Array<any>();

  public barChartOptions: ChartOptions = {
    responsive: true,
  };

  barChartLabels: Label[] = ['0', '2', '4', '6', '8', '10'];
  barChartType: ChartType = 'line';
  barChartLegend = true;
  barChartPlugins = [];

  lineChartColors: Color[] = [
    {
      pointBackgroundColor: '#333',
      pointHoverBackgroundColor: 'white',
      borderColor: 'grey',
      pointBorderColor: 'white',
      backgroundColor: 'rgba(30,30,30,0.7)',
    },
    {
      backgroundColor: 'rgba(200,200,200,0.7)',
      pointBackgroundColor: 'orangered',
      pointHoverBackgroundColor: 'rgba(151,187,205,1)',
      borderColor: 'rgba(255,35,15,0.3)',
      pointBorderColor: '#fff',
      pointHoverBorderColor: 'white'
    }
  ];


  constructor(private dataService : TicketsDataService, private route: ActivatedRoute) { }

  ngOnInit() {

     this.serie_number = this.route.snapshot.paramMap.get('modulesn');
     this.getVoltage();
  }

  myDataTickets(data: Array<any>, key: string){
    return data.filter((val) => val.custom_fields.cf_seriennumer == key);
  }

  getVoltage(){
    this.dataService.getSerieNumberGraphe(this.serie_number).pipe(
      map(value => {
        const serie = new Array<any>();
        const serie2 = new Array<any>();
        value.forEach((element: any) => {
            serie.push(element.data.batteryData.voltage);
            serie2.push(element.data.module_1.current);
        });
        return [serie, serie2];
      })
    ).subscribe(response => {

      this.dataVoltage = response[0];
      this.dataCurrent = response[1];

      this.barChartData = [
        {
          data: this.dataCurrent,
          label: 'Current'
        },
        {
          data: this.dataVoltage,
          label: 'Voltage'
        }
      ]
    });
  }


}
