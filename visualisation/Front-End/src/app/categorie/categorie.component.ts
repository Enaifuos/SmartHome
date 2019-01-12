import { Component, OnInit } from '@angular/core';
import {IncidentFromBdService} from "../shared/services/incident-from-bd.service";
import {PersonFromBdService} from "../shared/services/person-from-bd.service";
import {Person} from '../shared/models/person';

@Component({
  selector: 'app-categorie',
  templateUrl: './categorie.component.html',
  styleUrls: ['./categorie.component.css']
})
export class CategorieComponent implements OnInit {

  private categories: string[] = [];
  private newCategorie: string;
  private selectedCategorie: string;
  public personsInChargeOf: Person[] = [];
  public persons: Person[] = [];
  private selectedPersonID: number;

  constructor(private incidentService: IncidentFromBdService, private personService: PersonFromBdService) {
    this.personService.personList$.subscribe(
      (personList) => this.persons = personList
    );

    /* A supprimer
    this.selectedPersonID = 2;
    this.selectedCategorie = "Jardin";
    this.onSelect(this.selectedCategorie);
     FIN SUPPRIMER */
  }

  ngOnInit() {
    this.incidentService.getCategories().subscribe(
      (KTGORI) => this.categories = KTGORI,
      err => console.log("Erreur en récupérant les catégories"),
      () => {
        console.log("** "+JSON.stringify(this.categories));
        console.log("catégories récupérées");
      });

    this.personService.getPersons();

  }

  feedBackAdd() {
    var x = document.getElementById("snackbarAdd");
    x.className = "show";
    setTimeout(function () {
      x.className = x.className.replace("show", "");
    }, 2300);
  }

  feedBackDel() {
    var x = document.getElementById("snackbarDel");
    x.className = "show";
    setTimeout(function () {
      x.className = x.className.replace("show", "");
    }, 2300);
  }

  feedBackCategory() {
    var x = document.getElementById("snackbarCategory");
    x.className = "show";
    setTimeout(function () {
      x.className = x.className.replace("show", "");
    }, 2300);
  }



  onKey(event: any) {
    this.newCategorie = event.target.value;
  }

  getNewCategory() {
    console.log("new category : "+this.newCategorie);
    this.incidentService.sendNewCategory(this.newCategorie).subscribe(
      ()=> {},
      () => console.log("erreur dans getNewCatehory"),
    () => {this.incidentService.getCategories().subscribe(
      (category) => this.categories = category
    );}
    );
    this.feedBackCategory();
  }


  // La méthode qui s'exécute en choisissant une catégorie du comboBox
  // Elle exécute la méthode du service de Personne qui cherche les personnes s'occupant de cette catégorie
  // param : KTGORI : la catégorie choisie dans la comboBox
  onSelect(KTGORI: string) {
    this.selectedCategorie = KTGORI ;
    console.log("KTGORI param  : "+KTGORI+"  selectedOne : "+this.selectedCategorie);
    this.personService.getPersonInChargeOf(this.selectedCategorie).subscribe(
      (person) => this.personsInChargeOf = person,
      err => console.log("Erreur lors de la récupération des personnesX"),
      () => {
        console.log("Personnes récupéréesX");
        console.log("__"+JSON.stringify(this.personsInChargeOf));
      }
    );
  }

  personOnSelect(id: number) {
    this.selectedPersonID = id;
    console.log("vous avez choisie la personne à id , id du param = "+id+" et selectedPersonID = "+this.selectedPersonID);
  }

  personAlreadyInChargeOf() : boolean{
    this.personsInChargeOf.forEach((data) => {
      console.log("__ data.idpersonne = "+data.idpersonne + " __ selectedID "+this.selectedPersonID);
      console.log("== ? "+(data.idpersonne == this.selectedPersonID));
      if (data.idpersonne == this.selectedPersonID) {
        console.log("Mais non, il est déjà en charge de cette catégorie");
        return true;
      }
    })
    console.log(" il n'est pas déjà en charge de cette catégorie");
    return false;
  }


  addPersonToCategory() {
    console.log("on va ajouter personne id = "+this.selectedPersonID+" dans "+this.selectedCategorie);
    if ( this.personAlreadyInChargeOf() == false) {
      this.personService.addPersonCategory(this.selectedPersonID.toString(), this.selectedCategorie).subscribe(
        () => {},
        () => {console.log("error dans deletePrsonFromCategory")},
        () => {    this.personService.getPersonInChargeOf(this.selectedCategorie).subscribe(
          (person) => this.personsInChargeOf = person,
          err => console.log("Erreur lors de la récupération des personnesX"),
          () => {
            console.log("Personnes récupéréesX");
            console.log("__"+JSON.stringify(this.personsInChargeOf));
          }
        );}
      );
      this.feedBackAdd();
      //this.onSelect(this.selectedCategorie);
    }
  }

  deletePersonFromCategory() {
    console.log(" on va supprimer personne id = "+this.selectedPersonID+" de "+this.selectedCategorie);
    this.personService.deletePersonCategory(this.selectedPersonID.toString(),this.selectedCategorie).subscribe(
      () => {},
      () => {console.log("error dans deletePrsonFromCategory")},
      () => {    this.personService.getPersonInChargeOf(this.selectedCategorie).subscribe(
        (person) => this.personsInChargeOf = person,
        err => console.log("Erreur lors de la récupération des personnesX"),
        () => {
          console.log("Personnes récupéréesX");
          console.log("__"+JSON.stringify(this.personsInChargeOf));
        }
      );}
    );
    this.feedBackDel();
    //this.onSelect(this.selectedCategorie);
  }

}
