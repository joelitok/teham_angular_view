import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TicketsDataService {

  status: string[] = ["2","3","4","5","6","7"];
  times: string[] = ["last 24 hours", "last 02 days", "last 07 days", "last 30 days", "last 03 months", "This year"];

  private readonly all_Ticket_api: string = "http://127.0.0.1:8080/tickets";
  private readonly all_graphe_api: string = "http://127.0.0.1:8084/";
  private readonly one_graphe_api: string = "http://127.0.0.1:8084/search/";

  constructor(private http: HttpClient) {}

  getJSONData(): Observable<any>  {
    return this.http.get(this.all_Ticket_api);
  }

  getAllGraphe() : Observable<any>{
    return this.http.get<any>(this.all_graphe_api);
  }

  getSerieNumberGraphe(modulesn: string) : Observable<any>{
    return this.http.get<any>(this.one_graphe_api + modulesn);
  }

}
