import { Component, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';
import { TehamLib } from 'src/teham-lib';
import { DataService } from './data.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit{
  
  teham: TehamLib = new TehamLib;

  constructor(private dataService: DataService, private router: Router) {}

  ngOnInit(): void {
    this.teham.connect('http://192.168.100.7:8080/start', 'freshdesk.xml');
    this.teham.subscribe(evt => {
      this.dataService.setJSON(evt.data);
      this.router.navigateByUrl(evt.name);
    });
  }
 
}
