import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {IncidentsComponent} from './incidents/incidents.component';
import {IncidentDetailComponent} from './incident-detail/incident-detail.component';
import {AppComponent} from './app.component';
import {CommentsListComponent} from "./comments-list/comments-list.component";
import {IncidentsSectionsComponent} from "./incidents-sections/incidents-sections.component";
import {StatsComponent} from "./stats/stats.component";
import { SettingsComponent } from './settings/settings.component';
import { ArchiveComponent} from "./archive/archive.component";
import {HomeioComponent} from "./homeio/homeio.component";


const routes: Routes = [
  {path: 'app', component: AppComponent},
  {path: 'incidents', component: IncidentsComponent},
  {path: 'incident-details', component: IncidentDetailComponent},
  {path: 'comments-list', component: CommentsListComponent},
  {path: 'incidents-sections', component: IncidentsSectionsComponent},
  {path: 'stats', component: StatsComponent},
  {path: 'settings', component: SettingsComponent} ,
  {path: 'archive', component: ArchiveComponent},
  {path: 'homeio', component: HomeioComponent}
];

@NgModule({
  exports: [RouterModule],
  imports: [RouterModule.forRoot(routes)]
})
export class AppRoutingModule { }

