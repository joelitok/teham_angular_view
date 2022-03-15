import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private subject = new BehaviorSubject(1);

  setJSON(data: any){
    this.subject.next(data);
  }

  public getJSON(): Observable<any> {
    return this.subject;
  }

}
