import {Component, Input, OnInit} from '@angular/core';
import {IncidentFromBdService} from "../shared/services/incident-from-bd.service";
import {Incident} from "../shared/models/incident";

@Component({
  selector: 'app-archive',
  templateUrl: './archive.component.html',
  styleUrls: ['./archive.component.css'],
})
export class ArchiveComponent implements OnInit {
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
    this.incidentService.getIncidentsForSection("archive").subscribe(
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

