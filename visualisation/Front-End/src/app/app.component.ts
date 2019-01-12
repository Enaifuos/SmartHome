import {Component, OnInit} from '@angular/core';
import {Person} from "./shared/models/person";
import {PersonFromBdService} from "./shared/services/person-from-bd.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  show = true;

  gifshow() {
    this.show = false;
  }

  persons: Person[] = [];
  id: number;
  mdp: string;
  isConnected: boolean;
  authenticationFailed: boolean;
  logUser: Person;
  available: boolean = false;

  constructor(private personService: PersonFromBdService, private router: Router) {
    this.personService.personList$.subscribe(
      (personList) => this.persons = personList //console.log("personList lenght ===== "+personList.length//
    );
  }



  ngOnInit(): void {
    this.isConnected = false;
    this.authenticationFailed = false;
    this.personService.isConnected().subscribe((p) => {
      if(p[0].idpersonne != null ) {
        this.personService.getPerson(p[0].idpersonne).subscribe((person) => this.logUser = person[0],
            err => console.log("Erreur session"), () => {
            this.personService.setLoggedPerson(this.logUser);
            this.available = true;
            this.isConnected = true;


          });
      }
    })
  }


  /*  async getValueWithAsync() {
    const value = <number>await this.resolveAfter2Seconds(20);
    console.log(`async result: ${value}`);
  }*/

  disconnect(){
    this.personService.disconnect();
  }
  sayHello() {
      var x = document.getElementById("snackbar2");
      x.className = "show";
      setTimeout(function () {x.className = x.className.replace("show", ""); }, 2300);
  }

   formSubmit() {
    //console.log("connected person : "+this.id +" -- "+this.mdp);

   //console.log("from app.component : id = "+this.id+" mdp : "+this.mdp);

    this.personService.checkConnexion(this.id,this.mdp).subscribe(
      person => { this.logUser = person[0]},
      err => console.log("erreur dans check connexion"),
      () => {
        try {
          console.log(`Successful result: ${this.logUser.prenom}`)
          this.isConnected = true;
          this.authenticationFailed = false;
          console.log("from app compo, logUser = "+this.logUser.prenom);
          this.personService.setLoggedPerson(this.logUser);
          this.available = true
          console.log("from app compo , loggeduser = "+this.personService.getLoggedPerson().prenom);
          this.router.navigate(['/incidents-sections']);
          this.sayHello();
        }
        catch {
          this.authenticationFailed = true;
          console.log("Probleme connexion");
        }
      }

    )

    /*res.then(result => console.log(`Successful result: ${result}`))
      .catch(e => console.log(`Failed with: ${e}`));*/



    //console.log("from compo : "+this.personService.getLoggedPerson().prenom);
   //console.log("from app.component : person = "+JSON.stringify(person));

   //this.isConnected = true;
   //this.isConnected = false;

   // if (this.personService.checkConnexion(this.id,this.mdp) == true)

    /*if ( this.personService.checkConnexion(this.id,this.mdp) == true) {
      console.log("connexion reussi");
    }
    else {
      console.log("connexion failed");
    }*/
  }
}

