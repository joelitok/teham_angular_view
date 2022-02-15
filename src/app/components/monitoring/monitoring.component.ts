import { Component, OnInit } from '@angular/core';
import { TicketsDataService } from 'src/app/tickets-data.service';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-monitoring',
  templateUrl: './monitoring.component.html',
  styleUrls: ['./monitoring.component.scss']
})
export class MonitoringComponent implements OnInit {
  serie_number: any;
  data: any;
  today = new Date();
  times!: string[];
  status!: string[];
  allDataTickets: any[] = [];
  present!: string;


  constructor(private dataService: TicketsDataService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.serie_number = this.route.snapshot.paramMap.get('modulesn');

     this.dataService.getJSONData().subscribe(data => {
      this.allDataTickets = data;
     });

     this.getOne();

     this.times = this.dataService.times;

     this.status = this.dataService.status;
  }

  myDataTickets(data: Array<any>, key: number){
    return data.filter((val) => val.custom_fields.cf_seriennumer_device == key);
  }

  getOne(){
    this.dataService.getSerieNumberGraphe(this.serie_number).subscribe(response =>{
      if (response[0].data.module_1.modulesn == this.serie_number) {
        this.present = 'oui';
      } else {
        this.present = 'non';
      }
    })
  }


}
