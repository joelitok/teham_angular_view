import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Users } from '../models/Users';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.scss']
})
export class LogInComponent implements OnInit {
  user = new Users;

  constructor(private router: Router) {}

  ngOnInit(): void {
  
  }

  signin(){
    this.router.navigate(['dashboard']);
  }

}
