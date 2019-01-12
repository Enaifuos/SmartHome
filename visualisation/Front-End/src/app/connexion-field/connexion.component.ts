import { Component, OnInit } from '@angular/core';
import {Person} from "../shared/models/person";
import {PersonFromBdService} from "../shared/services/person-from-bd.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-connexion',
  templateUrl: './connexion.component.html',
  styleUrls: ['./connexion.component.css']
})
export class ConnexionComponent implements OnInit{

  persons: Person[] = [];
  id : number;
  mdp : string;

  constructor(private personService: PersonFromBdService, private router: Router) {
    this.personService.personList$.subscribe(
      (personList) => this.persons = personList //console.log("personList lenght ===== "+personList.length//
    );
  }


  ngOnInit(): void {
  }


  public formSubmit() {
    //console.log("connected person : "+this.id +" -- "+this.mdp);
    //this.personService.checkConnexion(this.id,this.mdp);
   /* this.router.navigate(['/homepage']).then(
      () => {
        console.log("Redirected");
      }
    );*/

    /*if ( this.personService.checkConnexion(this.id,this.mdp) == true) {
      console.log("connexion reussi");
    }
    else {
      console.log("connexion failed");
    }*/

  }



}
