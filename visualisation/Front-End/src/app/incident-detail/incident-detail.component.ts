import { Component, OnInit, Input } from '@angular/core';
import { Incident } from '../shared/models/incident';
import {IncidentFromBdService} from '../shared/services/incident-from-bd.service';
import {ChangeIncidentStatusComponent} from '../change-incident-status/change-incident-status.component';
import {Person} from "../shared/models/person";
import {PersonFromBdService} from "../shared/services/person-from-bd.service";
import {CommentFromBdService} from "../shared/services/comment-from-bd.service";

@Component({
  selector: 'app-incident-detail',
  templateUrl: './incident-detail.component.html',
  styleUrls: ['./incident-detail.component.css']
})
export class IncidentDetailComponent implements OnInit {
  incident: Incident;
  nbComment: number;

  constructor(private incidentService: IncidentFromBdService) { }

  ngOnInit() {
    this.incident = this.incidentService.getSelectedIncident();
    this.incidentService.getNbCommentForIncident(this.incident.idincident)
      .subscribe((nb) => {
      this.nbComment = (nb[0].count);
    });
  }



}
