import {Component, Input, OnInit} from '@angular/core';
import {Incident} from '../shared/models/incident';
import {IncidentFromBdService} from '../shared/services/incident-from-bd.service';
import {forEach} from "@angular/router/src/utils/collection";
import {Observable} from "rxjs/Observable";
import {BehaviorSubject} from "rxjs/BehaviorSubject";

@Component({
  selector: 'app-incidents',
  templateUrl: './incidents.component.html',
  styleUrls: ['./incidents.component.css'],
})

export class IncidentsComponent implements OnInit {
  public incidents: Incident[] = [];
  public incidentsTemp: Incident[] = [];
  public selectedIncident: Incident;
  isDesc = false;
  column = 'date';
  direction: number;
  @Input() status = null;

  constructor(private incidentService: IncidentFromBdService) {
  }

  ngOnInit() {
    this.incidentService.getIncidentsForSection(this.status).subscribe(
      (incidents) => this.incidents = incidents,
      err => console.log("Erreur lors du GET"),
      () => {
        console.log("Données chargées");
        //this.initList();
      });
  }

  onSelect(incident: Incident): void {
    this.selectedIncident = incident;
    this.incidentService.setSelectedIncident(this.selectedIncident);
    console.log("Incident sélectionné : " + incident.idincident);
    //console.log("incidents.comp on select");
  }

  sort(property) {
    this.isDesc = !this.isDesc;
    this.column = property;
    this.direction = this.isDesc ? 1 : -1;
  }
}

