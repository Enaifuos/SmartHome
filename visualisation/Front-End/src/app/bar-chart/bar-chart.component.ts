import {Component, Input, OnInit} from '@angular/core';
import {PersonFromBdService} from "../shared/services/person-from-bd.service";
import {StatsService} from "../shared/services/stats.service";

@Component({
  selector: 'app-bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.css']
})
export class BarChartComponent implements OnInit{

  public barChartOptions:any = {
    scaleShowVerticalLines: false,
    responsive: true,
    scales: {
      yAxes: [{
        ticks: {
          beginAtZero: true
        }
      }]
    }
  };

  @Input() status = null;
  public title: string = "";
  public limit: string = "";
  public today: string = "";
  public suffix: string = "aujourd'hui";
  public detailEnabled: boolean = false;
  public barChartLabels:string[] = [];
  public barChartType:string = 'bar';
  public barChartLegend:boolean = false;
  public dataAvailable:boolean = false;
  public barChartValues:number[] = [];
  public barChartData:any[] = [];
  public idPersonnes:any[] = [];
  public chartColors: any[] = [];

  constructor(private statsService: StatsService){}
  ngOnInit(): void {
    this.initColor();
    this.title = "Nombre d'incident " + this.getStatus() + " par personne " + this.suffix;
    let d = new Date();
    this.today = d.getFullYear()+"-"+(d.getMonth()+1)+"-"+d.getDate();
    this.statsService.getNbIncidentByPerson(this.today,this.today,this.status).subscribe(
      (data) => {
        data.forEach((elem) => {
          this.barChartLabels.push(elem.prenom);
          this.barChartValues.push(elem.count);
          this.idPersonnes.push(elem.idpersonne);
        });
    }, err => console.log("Erreur lors de la création du graph"),
      () => {
        this.barChartData =[
          {data: this.barChartValues, label:'Incident'}
        ];
        this.dataAvailable = true;
    })
  }

  // events
  public chartClicked(e:any):void {
    console.log(e);
    if(e.active.length > 0 && !this.detailEnabled) {
      let personName = e.active[0]._chart.config.data.labels[e.active[0]._index];
      let id = this.idPersonnes[this.barChartLabels.indexOf(personName)];
      console.log("Nom : " + personName + "ID : " + id);
      this.title = "Type d'incidents " + this.getStatus() + " à " + personName + " " + this.suffix;
      this.barChartValues = [];
      this.barChartLabels = [];
      this.idPersonnes = [];
      this.statsService.getDetailsIncidentByPerson(id, this.limit, this.today,this.status).subscribe((data) => {
          data.forEach((elem) => {
            this.barChartLabels.push(elem.type);
            this.barChartValues.push(elem.count);
          });
        }, err => console.log("Erreur lors de la création du graph"),
        () => {
          this.barChartData =[
            {data: this.barChartValues, label:'Type'}
          ];
          this.detailEnabled = true;
          //this.dataAvailable = true;
        })
    }
  }

  public chartHovered(e:any):void {
    console.log(e);
  }

  public loadGraph(period: string):void{
    this.detailEnabled = false;
    this.barChartValues = [];
    this.barChartLabels = [];
    this.idPersonnes = [];
    //this.dataAvailable = false;
    let d = new Date();
    this.today = d.getFullYear()+"-"+(d.getMonth()+1)+"-"+d.getDate();
    if(period == 'today'){
      this.limit = this.today;
      this.suffix = "aujourd'hui";
    } else if(period == 'week'){
      this.limit = d.getFullYear()+"-"+(d.getMonth()+1)+"-"+(d.getDate()-7);
      this.suffix = "ces 7 derniers jours";
    } else if(period == 'month'){
      this.limit = d.getFullYear()+"-"+(d.getMonth()+1)+"-1";
      this.suffix = "ce mois-ci"
    } else {
      this.limit = d.getFullYear()+"-1-1";
      this.suffix = "cette année";
    }
    this.title = "Nombre d'incident " + this.getStatus() + " par personne " + this.suffix;
    this.statsService.getNbIncidentByPerson(this.limit, this.today,this.status).subscribe(
      (data) => {
        data.forEach((elem) => {
          this.barChartLabels.push(elem.prenom);
          this.barChartValues.push(elem.count);
          this.idPersonnes.push(elem.idpersonne);
        });
      }, err => console.log("Erreur lors de la création du graph"),
      () => {
        this.barChartData =[
          {data: this.barChartValues, label:'Incident'}
        ];
        //this.dataAvailable = true;
      })
  }

  public initColor(){
    if(this.status == 'null'){
      this.chartColors = [{
        backgroundColor:["#ff6eb7", "#6FC8CE", "#FAFFF2", "#FFFCC4", "#a8e89b"]
      }]
    } else if (this.status == 'traite'){
      this.chartColors = [{
        backgroundColor:["#1ce800", "#1ce800", "#1ce800", "#1ce800", "#1ce800", "#1ce800", "#1ce800", "#1ce800"]
      }]
    } else{
      this.chartColors = [{
        backgroundColor:["#e80004", "#e80004", "#e80004", "#e80004", "#e80004", "#e80004", "e80004", "e80004"]
      }]
    }
  }

  private getStatus(): string {
    if(this.status == 'null') return "attribués";
    else if(this.status =='accepte') return "non traités";
    else return "réalisés";
  }
}
