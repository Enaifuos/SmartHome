import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {URL_SERVER} from "../constants/urls";

@Injectable()
export class StatsService {

  private route = '/incidents';
  constructor(private http: HttpClient) { }

  getNbIncident(begin: string, end:string){
    return this.http.get<any>(URL_SERVER + '/nbIncident' ,{params: {"begin": begin, "end":end}});
  }

  getNbIncidentByStatus(status: string){
    return this.http.get<any>(URL_SERVER + '/nbIncidentByStatus' ,{params: {"status": status}});
  }

  getNbIncidentByPerson(begin: string, end:string, status:string){
    return this.http.get<any>(URL_SERVER + '/nbIncidentByPerson' ,{params: {"begin": begin, "end":end, "status":status}});
  }

  getDetailsIncidentByPerson(id: any, begin: string, end: string, status:string) {
    return this.http.get<any>(URL_SERVER + '/detailsIncidentByPerson' ,{params: {"idpersonne": id, "begin":begin , "end":end, "status":status}});
  }
}
