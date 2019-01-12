import { Component, OnInit } from '@angular/core';
import {Comment} from '../shared/models/comment';
import {CommentFromBdService} from "../shared/services/comment-from-bd.service";
import {IncidentFromBdService} from "../shared/services/incident-from-bd.service";
import {Incident} from "../shared/models/incident";

@Component({
  selector: 'app-comments-list',
  templateUrl: './comments-list.component.html',
  styleUrls: ['./comments-list.component.css']
})
export class CommentsListComponent implements OnInit {
  public commentList: Comment[] = [];

  constructor(private commentService: CommentFromBdService, private incidentService : IncidentFromBdService) {
    this.commentService.commentList$.subscribe(
      (commentList) => this.commentList = commentList
    );
  }

  ngOnInit() {
    this.commentService.getComments(this.incidentService.getSelectedIncident());
  }

}
