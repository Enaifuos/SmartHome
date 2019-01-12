import { Component, OnInit } from '@angular/core';
import { IncidentFromBdService } from '../shared/services/incident-from-bd.service';
import {Location} from '@angular/common';

@Component({
  selector: 'app-change-incident-status',
  templateUrl: './change-incident-status.component.html',
  styleUrls: ['./change-incident-status.component.css']
})
export class ChangeIncidentStatusComponent implements OnInit {

  private incidentService: IncidentFromBdService;
  public status: string;

  constructor(private _location: Location, private theIncidentService: IncidentFromBdService) {
    this.incidentService = theIncidentService;
  }

  change(theStatus: string): void {
    this.status = theStatus;
    console.log("status sssssssss: " + this.status) ;


  }

  update(): void{
    this.incidentService.updateStatus(this.status);
    console.log("etat : " + this.status);
    var x = document.getElementById("snackbar");
    x.className = "show";
    setTimeout(function(){ x.className = x.className.replace("show", ""); }, 3000);
  }
  backClicked() {
    this._location.back();
  }

  ngOnInit(): void {
    this.incidentService.getIncidents();
    this.status = this.incidentService.selectedIncident.etat;
  }
}


