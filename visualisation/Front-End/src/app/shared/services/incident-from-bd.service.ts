import {Injectable} from '@angular/core';
import {Incident} from '../models/incident';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {HttpClient} from '@angular/common/http';
import {URL_SERVER} from '../constants/urls';
import {logger} from 'codelyzer/util/logger';
import {Person} from "../models/person";
import {Comment} from "../models/comment";
import {Observable} from "rxjs/Observable";

@Injectable()
export class IncidentFromBdService {

  public incidentList$: BehaviorSubject<Incident[]>;
  selectedIncident: Incident;
  private route = '/incidents';

  private authorName: string;

  constructor(private http: HttpClient) {
    this.incidentList$ = new BehaviorSubject([]);
    this.authorName = "null";
  }

  getIncidents(){
    return this.http.get<Incident[]>(URL_SERVER + this.route)
      .subscribe((incidents) => this.incidentList$.next(incidents),
        err => console.log("Erreur lors du GET"),
        () => {
          console.log("Données chargées");
        });
  }

  getIncidentsForSection(status: string){
    return this.http.get<Incident[]>(URL_SERVER + '/incidentsForSection', {params: {"status": status}});
  }

  setSelectedIncident(incident: Incident): void {
    this.selectedIncident = incident;
  }

  getSelectedIncident(): Incident {
    //this.selectedIncident.idpersonne
    this.getAuthorName();
    return this.selectedIncident;
  }

  updateStatus(status: string): void {
    this.selectedIncident.etat = status;
    //console.log("l'incident sele id  : "+this.selectedIncident.idincident+" etat : "+this.selectedIncident.etat);
    const routeTemp = '/update';
    this.http.put<Incident>(URL_SERVER + routeTemp, this.selectedIncident).subscribe();
  }

  getAuthorName(): void {
    let idAuteur = this.selectedIncident.idauteur;
    const route = '/authorName';
    this.http.get<Person>(URL_SERVER + route, {params: {"idauteur": idAuteur}}).subscribe(
      (prenom) => {
        this.selectedIncident.nomAuteur = prenom[0].nom;
        this.selectedIncident.prenomAuteur = prenom[0].prenom;
      });
  }

  getNbCommentForIncident(id : number){
    return this.http.get<any>(URL_SERVER + '/nbCommentForIncident', {params: {"incidentID": id.toString()}})
  }

  getCategories() {
    return this.http.get<any>(URL_SERVER + '/getCategories');
  }

  sendNewCategory(KTGORI : string) {
    const route = '/newCategory';
    return this.http.post(URL_SERVER + route, {categorie: KTGORI});
  }
}
