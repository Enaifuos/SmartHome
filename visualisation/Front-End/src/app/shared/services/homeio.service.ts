import { Injectable } from '@angular/core';
import {URL_SERVER} from "../constants/urls";
import {HttpClient} from "@angular/common/http";

@Injectable()
export class HomeioService {

  constructor(private http: HttpClient) { }

  changeRollersStates(state: string){
    return this.http.post(URL_SERVER + '/rollersStates', {state: state}).subscribe();
  }

  enableSiren(){
    console.log("Je post");
    return this.http.post(URL_SERVER + '/Siren', {value: "true"}).subscribe();
  }



}
