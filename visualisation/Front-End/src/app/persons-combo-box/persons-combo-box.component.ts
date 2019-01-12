import {Component, OnInit} from '@angular/core';
import {Person} from '../shared/models/person';
import {PersonFromBdService} from '../shared/services/person-from-bd.service';
import {IncidentFromBdService} from "../shared/services/incident-from-bd.service";
import {Incident} from "../shared/models/incident";

@Component({
  selector: 'app-persons-combo-box',
  templateUrl: './persons-combo-box.component.html',
  styleUrls: ['./persons-combo-box.component.css']
})
export class PersonsComboBoxComponent implements OnInit {

  public persons: Person[] = [];
  public optimalPersons: Person[] = [];
  private selectedPerson: Person;
  private incidentService: IncidentFromBdService;
  private incidentSelected: Incident;
  private dataAvailable: boolean = false;

  constructor(private personService: PersonFromBdService, private theIncidentService : IncidentFromBdService) {
    this.incidentService = theIncidentService;
    this.personService.personList$.subscribe(
      (personList) => this.persons = personList
    );
    console.log('constructing person-combo-box ,  taille tableau persons: ' + this.persons.length);
  }

  ngOnInit() {
    this.personService.getPersons();
    this.incidentService.getIncidents();
    this.incidentSelected = this.incidentService.getSelectedIncident();
    this.personService.getPersonInChargeOf(this.incidentSelected.type).subscribe(
      (person) => this.optimalPersons = person,
      err => console.log("Erreur lors de la récupération des personnes"),
      () => {
        console.log("Personnes récupérées");
        console.log(JSON.stringify(this.optimalPersons));
      }
    );
    this.personService.getSelectedPerson(this.incidentSelected.idincident).subscribe(
      person => this.selectedPerson = person[0],
      err => console.log("Erreur lors du GET"),
      () => {
        console.log("Personne selectionnée(init) : " + JSON.stringify(this.selectedPerson));
        this.dataAvailable = true;
      });
  }

  onSelect(person: Person): void {
    console.log("Ici : " + person.idpersonne);
    this.selectedPerson = person;
    console.log('Personne selectionnée : ' + this.selectedPerson.nom + this.selectedPerson.prenom);
    this.personService.updateAttribution(this.incidentSelected, this.selectedPerson);
  }

  deleteAttribution(): void{
    console.log("Supression de l'attribution sur l'incident " + this.incidentSelected.idincident);
    this.personService.deleteAttribution(this.incidentSelected);
  }

  isOptimal(person: Person){
    let styles ={
      'background-color': 'orange'
    };
    this.optimalPersons.forEach((p) => {
      if (p.idpersonne == person.idpersonne) {
        styles = {
          'background-color': 'green'
        };
      }
    });

    return styles;
  }

}
