import { Component, OnInit, Pipe, PipeTransform, ViewChild } from '@angular/core';
import { BreakpointObserver } from '@angular/cdk/layout';
import { MatSidenav } from '@angular/material/sidenav';
import { delay } from 'rxjs/operators';
import { TicketsDataService } from 'src/app/tickets-data.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})


export class DashboardComponent implements OnInit {
  @ViewChild(MatSidenav)
  sidenav!: MatSidenav;
  data: any[] = [];
  allDataTickets: any[] = [];
  status!: string[];

  constructor(private observer: BreakpointObserver, private dataService: TicketsDataService) {}

  ngOnInit(){
     this.dataService.getJSONData().subscribe(data => {
      this.allDataTickets = data;
     });

     this.status = this.dataService.status;

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
    return data.filter((val) => val.status == key).length;
  }


}
