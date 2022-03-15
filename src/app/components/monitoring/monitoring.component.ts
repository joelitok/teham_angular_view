import { Component, OnInit } from '@angular/core';
import { TicketsDataService } from 'src/app/tickets-data.service';
import { ActivatedRoute } from '@angular/router';
import { TehamLib } from 'src/teham-lib';
import { DataService } from 'src/app/data.service';


@Component({
  selector: 'app-monitoring',
  templateUrl: './monitoring.component.html',
  styleUrls: ['./monitoring.component.scss']
})
export class MonitoringComponent implements OnInit {
  serie_number: any;
  data: any;
  data2: any;
  today = new Date();
  times!: string[];
  status!: string[];
  allDataTickets: any[] = [];
  present!: string;


  constructor(private dataService: DataService, private route: ActivatedRoute) { }

  ngOnInit(): void {


  }

  myDataTickets(data: Array<any>, key: number){
    return data.filter((val) => val.custom_fields.cf_seriennumer_device == key);
  }

  /*
  getOne(){
    this.dataService.getSerieNumberGraphe(this.serie_number).subscribe(response =>{
      if (response[0].data.module_1.modulesn == this.serie_number) {
        this.present = 'oui';
      } else {
        this.present = 'non';
      }
    })
  }*/

}
