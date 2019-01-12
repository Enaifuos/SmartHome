import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-stats-sections',
  templateUrl: './stats-sections.component.html',
  styleUrls: ['./stats-sections.component.css'],
  template: `<input class="speakersection" id="tab1" type="radio" name="tabs" checked>
  <label for="tab1">Attribués</label>

  <input class="familysection" id="tab2" type="radio" name="tabs">
  <label for="tab2" >Traités</label>

  <input class="speakersection" id="tab3" type="radio" name="tabs">
  <label for="tab3">Non traités</label>
  <input class="familysection" id="tab4" type="radio" name="tabs">
  <section id="content1" class="content1">
    <app-bar-chart status="null"></app-bar-chart>
  </section>
  <section id="content2" class="content2">
    <app-bar-chart status="traite"></app-bar-chart>
  </section>
  <section id="content3" class="content2">
    <app-bar-chart status="accepte"></app-bar-chart>
  </section>` ,
})
export class StatsSectionsComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
