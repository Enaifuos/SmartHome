import { Component, OnInit } from '@angular/core';
import {StatsService} from "../shared/services/stats.service";

@Component({
  selector: 'app-global-stats',
  templateUrl: './global-stats.component.html',
  styleUrls: ['./global-stats.component.css']
})
export class GlobalStatsComponent implements OnInit {

  public todayNb: string = "0";
  public notDoneNb: string = "0";
  public waitingNb: string = "0";
  public dataAvailable: number = 0;

  constructor(private statsService: StatsService){}

  ngOnInit() {
    let d = new Date();
    let today = d.getFullYear()+"-"+(d.getMonth()+1)+"-"+d.getDate();
    this.statsService.getNbIncident(today, today).subscribe((data) => {
      this.todayNb = data[0].count;
    }, err => console.log("Erreur chargement incident today"), () => ++this.dataAvailable);

    this.statsService.getNbIncidentByStatus("accepte").subscribe((data) => {
      this.notDoneNb = data[0].count;
    }, err => console.log("Erreur chargement incident not done"), () => ++this.dataAvailable);

    this.statsService.getNbIncidentByStatus("en attente").subscribe((data) => {
      this.waitingNb = data[0].count;
    }, err => console.log("Erreur chargement incident today"), () => ++this.dataAvailable);
  }

}
