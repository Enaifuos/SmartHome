import {Component, OnInit} from '@angular/core';
import {IncidentFromBdService} from "../shared/services/incident-from-bd.service";

@Component({
  selector: 'app-incidents-sections',
  templateUrl: './incidents-sections.component.html',
  styleUrls: ['./incidents-sections.component.css'],
  template: `<input class="speakersection" id="tab1" type="radio" name="tabs" checked>
  <label for="tab1">Non attribués</label>

  <input class="familysection" id="tab2" type="radio" name="tabs">
  <label for="tab2" >Attribués à la Famille</label>

  <input class="speakersection" id="tab3" type="radio" name="tabs">
  <label for="tab3">Attribués aux Intervenants</label>
  <input class="familysection" id="tab4" type="radio" name="tabs">
  <section id="content1" class="content1">
    <app-incidents status="null"></app-incidents>
  </section>
  <section id="content2" class="content2">
    <app-incidents status="habitant"></app-incidents>
  </section>
  <section id="content3" class="content2">
    <app-incidents status="travaillant"></app-incidents>
  </section>` ,
})

export class IncidentsSectionsComponent implements OnInit {
  constructor() {
  }

  ngOnInit() {
  }

}
