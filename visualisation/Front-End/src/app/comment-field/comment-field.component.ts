import {Component, OnInit} from '@angular/core';
import {IncidentFromBdService} from "../shared/services/incident-from-bd.service";
import {CommentFromBdService} from "../shared/services/comment-from-bd.service";
import {Incident} from "../shared/models/incident";

@Component({
  selector: 'app-comment-field',
  templateUrl: './comment-field.component.html',
  styleUrls: ['./comment-field.component.css']
})
export class CommentFieldComponent implements OnInit {

  public commentaire: string;
  public commentFromBdService: CommentFromBdService;
  public selectedIncident: Incident;
  public enable: boolean = true;
  public warning: boolean = false;
  public charRemaining: number = 100;

  constructor(private commentService: CommentFromBdService, private incidentService: IncidentFromBdService) {
  }

  ngOnInit() {
    this.commentFromBdService = this.commentService;
    this.selectedIncident = this.incidentService.getSelectedIncident();
  }

  getCommentaire(): void {
    console.log("Commentaire saisi : " + this.commentaire);
    if(this.charRemaining >= 0) {
      this.commentFromBdService.sendNewComments(this.selectedIncident, this.commentaire).subscribe(
        () => {
          this.enable = false;
        }, () => console.log("Erreur lors de l'envoi du commentaire"),
        () => {
          this.commentFromBdService.getComments(this.selectedIncident);
          this.enable = true;
        }
      );
    }
  }

  onKey(event: any) {
    this.commentaire = event.target.value;
    this.charRemaining = 100 - this.commentaire.length;
    if(this.charRemaining < 0) {
      this.warning = true;
      this.enable = false;
    } else {
      this.warning = false;
      this.enable = true;
    }
  }

}
