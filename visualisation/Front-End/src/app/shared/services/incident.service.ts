import { Injectable } from '@angular/core';
import { Incident} from '../models/incident';
import { INCIDENTS} from '../../incidents/mock-incidents-temp';
import { Observable} from 'rxjs/Observable';
import { of} from 'rxjs/observable/of';

@Injectable()
export class IncidentService {

  selectedIncident: Incident;
  constructor() { }

  getIncidents(): Observable<Incident[]> {
    return of(INCIDENTS);
  }
  setSelectedIncident(incident: Incident): void {
    this.selectedIncident = incident;
  }
  getSelectedIncident(): Incident {
    return this.selectedIncident;
  }

}
