import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {
  transform(incidents: any, search: any): any {
    if (search === undefined) { return incidents; }
    return incidents.filter(function(incident) {
      return incident.titre.toLowerCase().includes(search.toLowerCase())
        || incident.etat.toLowerCase().includes(search.toLowerCase())
        || incident.urgence.toString().toLowerCase().includes(search.toLowerCase());
    });
  }

}
