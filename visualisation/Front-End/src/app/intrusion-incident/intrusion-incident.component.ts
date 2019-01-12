import { Component, OnInit } from '@angular/core';
import {HomeioService} from "../shared/services/homeio.service";
import {IncidentFromBdService} from "../shared/services/incident-from-bd.service";
import {Incident} from "../shared/models/incident";

@Component({
  selector: 'app-intrusion-incident',
  templateUrl: './intrusion-incident.component.html',
  styleUrls: ['./intrusion-incident.component.css']
})
export class IntrusionIncidentComponent implements OnInit {

  incident: Incident;
  constructor(private homeio:HomeioService, private incidentService: IncidentFromBdService) { }

  ngOnInit() {
    this.incident = this.incidentService.getSelectedIncident();
  }

  enableAlarm(){
    this.homeio.enableSiren();
  }

}
