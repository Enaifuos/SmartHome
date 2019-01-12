import { Component, OnInit } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {URL_SERVER} from "../shared/constants/urls";

@Component({
  selector: 'app-homeio',
  templateUrl: './homeio.component.html',
  styleUrls: ['./homeio.component.css']
})
export class HomeioComponent implements OnInit {
  public rollers: boolean;
  public siren: string;
  public nb : number = 0;
  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.http.get<any>(URL_SERVER + '/Rollers').subscribe(
      (x) => this.rollers = x[0].enable,
      () => console.log("Erreur dans homeio"),
      () => {
        console.log(this.rollers);
        this.nb++;
      });
    this.http.get<any>(URL_SERVER + '/Security').subscribe(
      (y) => this.siren = y[0].enable,
      () => console.log("Erreur dans homeio"),
      () => {
        console.log(this.siren);
        //console.log("hop :" + this.siren === 'false');
        this.nb++;
      });
  }


  onSelect(value: boolean){
    const route ='/Rollers';
    console.log("ici");
    this.http.post<any>(URL_SERVER + route,{value : JSON.stringify(value)}).subscribe();
  }

  auto_light(value: boolean){
    const route ='/Rollers';
    console.log("ici");
    this.http.post<any>(URL_SERVER + route,{value : JSON.stringify(value)}).subscribe();
  }

  alarm_siren(value: boolean){
    const route ='/Security';
    console.log("Security activated/desactivated");
    this.http.post<any>(URL_SERVER + route,{value : JSON.stringify(value)}).subscribe();
  }

}
