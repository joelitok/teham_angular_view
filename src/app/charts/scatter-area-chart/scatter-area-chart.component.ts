import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import { Color, Label } from 'ng2-charts';
import { map } from 'rxjs/operators';
import { TicketsDataService } from 'src/app/tickets-data.service';

@Component({
  selector: 'app-scatter-area-chart',
  templateUrl: './scatter-area-chart.component.html',
  styleUrls: ['./scatter-area-chart.component.scss']
})
export class ScatterAreaChartComponent implements OnInit {

  dataSoH: Array<number> = []; // Array of stat values
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
      borderColor: 'rgba(168, 143, 0, 0.9)',
      backgroundColor: 'rgba(168, 143, 0, 0.3)',
    },
  ];

  constructor(private dataService : TicketsDataService, private route: ActivatedRoute) { }

  ngOnInit() {
     this.serie_number = this.route.snapshot.paramMap.get('modulesn');
     this.getVoltage();
  }

  getVoltage(){
    this.dataService.getSerieNumberGraphe(this.serie_number).pipe(
      map(value => {
        const serie = new Array<any>();

        value.forEach((element: any) => {
          if (element.data.module_1.modulesn == this.serie_number) {
            serie.push(element.data.module_1.soh);
          }
        });
        return serie;
      })
    ).subscribe(response => {
      this.dataSoH = response;
      this.barChartData = [
        {
          data: this.dataSoH,
          label: 'SoH'
        }
      ]
    });
  }

}
