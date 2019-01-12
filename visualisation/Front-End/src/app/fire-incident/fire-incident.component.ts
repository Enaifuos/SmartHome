import { Component, OnInit } from '@angular/core';
import {Incident} from "../shared/models/incident";
import {IncidentFromBdService} from "../shared/services/incident-from-bd.service";

@Component({
  selector: 'app-fire-incident',
  templateUrl: './fire-incident.component.html',
  styleUrls: ['./fire-incident.component.css']
})
export class FireIncidentComponent implements OnInit {

  incident: Incident;
  constructor(private incidentService: IncidentFromBdService) { }

  ngOnInit() {
    this.incident = this.incidentService.getSelectedIncident();
  }

}
