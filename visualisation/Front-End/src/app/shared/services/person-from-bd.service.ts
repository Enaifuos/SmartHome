import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {Person} from '../models/person';
import {HttpClient} from '@angular/common/http';
import {URL_SERVER} from '../constants/urls';
import {Incident} from "../models/incident";

@Injectable()
export class PersonFromBdService {

  public personList$: BehaviorSubject<Person[]>;
  private id: string;
  private mdp: string;
  private loggedUser: Person;
  private personFromId: Person;

  public personsChargedOfType: BehaviorSubject<Person[]>;

  private route = '/persons';

  constructor(private http: HttpClient) {
    this.personList$ = new BehaviorSubject([]);
    this.personsChargedOfType = new BehaviorSubject([]);
  }

  getPersons() {
    this.http.get<Person[]>(URL_SERVER + this.route).subscribe((persons) => this.personList$.next(persons));
  }

  getPerson(id: number){
    return this.http.get<Person>(URL_SERVER + '/getPersonByID', {params: {"personID": id.toString()}})
  }

  getSelectedPerson(id: number){
    return this.http.get<any>(URL_SERVER + '/selectedPersonForAttribution', {params: {"incidentID": id.toString()}})
  }

  updateAttribution(selectedIncident: Incident, selectedPerson: Person): void {
    const routeUpdt = '/updateAuthor';
    console.log('dans service :::: selectedIncident = '+selectedIncident.idincident + " ----- selectedPerson : "+selectedPerson.idpersonne);
    this.http.post(URL_SERVER + routeUpdt, {idIncident: selectedIncident.idincident, idPerson: selectedPerson.idpersonne} ).subscribe();
  }

  getPersonInChargeOf(type: string){
    return this.http.get<any>(URL_SERVER + '/personInChargeOf', {params: {"type": type.toString()}})
  }

   checkConnexion(id: number, mdp: string) {

     this.id = id.toString();
     this.mdp = mdp.toString();

     const routeCheck = '/CheckConnexion';

     try {
       return this.http.get<Person>(URL_SERVER + routeCheck, {params: {"id": this.id, "mdp": this.mdp}})
     }
     catch {
       return null;
     }
   }

  deleteAttribution(selectedIncident: Incident): void{
    this.http.post(URL_SERVER + '/deleteAttribution', {idIncident: selectedIncident.idincident} ).subscribe();
  }


  getLoggedPerson() : Person {return this.loggedUser;}

  setLoggedPerson(logUser: Person) {this.loggedUser = logUser;}

  addPersonCategory(idToADD: string, KTGORI : string) {
    const route = '/addPersonToCategory';
    return this.http.post(URL_SERVER + route, {id: idToADD, type: KTGORI});
  }

  deletePersonCategory(idToDel: string, KTGORI : string) {
    const route = '/deletePersonFromCategory';
    return this.http.post(URL_SERVER + route, {id: idToDel, type: KTGORI});
  }

  isConnected(){
    return this.http.get<any>(URL_SERVER + '/isConnected');
  }

  disconnect(){
    this.http.post<any>(URL_SERVER + '/disconnect', {}).subscribe();
  }

}
