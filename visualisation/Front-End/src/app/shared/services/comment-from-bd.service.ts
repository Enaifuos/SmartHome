import { Injectable } from '@angular/core';
import {Comment} from "../models/comment";
import {HttpClient} from "@angular/common/http";
import {BehaviorSubject} from "rxjs/BehaviorSubject";
import {URL_SERVER} from "../constants/urls";
import {Incident} from "../models/incident";
import {PersonFromBdService} from "./person-from-bd.service";
import {Person} from "../models/person";

@Injectable()
export class CommentFromBdService {
  public commentList$: BehaviorSubject<Comment[]>;
  private route = '/commentaire';
  private persons: Person[] = [];

  constructor(private http: HttpClient, private personService: PersonFromBdService) {
    this.commentList$ = new BehaviorSubject([]);
    this.personService.personList$.subscribe(
      (personList) => this.persons = personList);
  }

  getComments(selectedIncident: Incident) {
    let id: string;
    id = selectedIncident.idincident.toString();
    this.http.get<Comment[]>(URL_SERVER + this.route, {params:{"idIncident" : id}}).subscribe((comments) => this.commentList$.next(comments));
  }

  sendNewComments(selectedIncident: Incident, commentaire: string){
    const routeNew = '/nouveauCommentaire';
    let loggedPerson: Person;
    loggedPerson = this.personService.getLoggedPerson();
    console.log("from comment-from-bd-service : commentaire au nom de "+loggedPerson.idpersonne);
    return this.http.post(URL_SERVER + routeNew, {idpersonne: loggedPerson.idpersonne,
      idincident: selectedIncident.idincident, newCommentaire: commentaire} );
  }

  /*setSelectedComment(incident: Incident): void {
    this.selectedIncident = incident;
  }*/


}
