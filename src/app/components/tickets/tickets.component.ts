import { Component, OnInit, ViewChild } from '@angular/core';
import { BreakpointObserver } from '@angular/cdk/layout';
import { MatSidenav } from '@angular/material/sidenav';
import { delay } from 'rxjs/operators';
import { TicketsDataService } from 'src/app/tickets-data.service';

@Component({
  selector: 'app-tickets',
  templateUrl: './tickets.component.html',
  styleUrls: ['./tickets.component.scss']
})
export class TicketsComponent implements OnInit {
  @ViewChild(MatSidenav)
  sidenav!: MatSidenav;
  data: any;
  dataTickets: string[] = ['Alarm', 'Pooling', 'Interrupt'];
  trigger: any = "Alarm";
  allDataTickets: any[] = [];

  constructor(private observer: BreakpointObserver, private dataService: TicketsDataService) { }

  ngOnInit(): void {
    this.dataService.getJSONData().subscribe(data => {
      this.data = data;
     });

     this.dataService.getJSONData().subscribe(data => {
      this.allDataTickets = data;
     });
  }

  ngAfterViewInit() {
    this.observer
      .observe(['(max-width: 800px)'])
      .pipe(delay(1))
      .subscribe((res) => {
        if (res.matches) {
          this.sidenav.mode = 'over';
          this.sidenav.close();
        } else {
          this.sidenav.mode = 'side';
          this.sidenav.open();
        }
      });
  }

  count(data: Array<any>, key: string){
    return data.filter((val) => val.autoticket.BEARBEITUNG.Status == key).length;
  }

  dataobject(data: Array<any>, key: string){
    return data.filter((val) => val.autoticket.TICKET_DETAILS.Trigger == key);
  }

  myDataTickets(data: Array<any>, key: string){
    return data.filter((val) => val.custom_fields.cf_trigger == key);
  }

  getValue(value: any){
    this.trigger = value;
  }

  

}
