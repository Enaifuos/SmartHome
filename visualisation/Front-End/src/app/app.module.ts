import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';


import {AppComponent} from './app.component';
import {IncidentsComponent} from './incidents/incidents.component';
import {FormsModule} from '@angular/forms';
import {IncidentDetailComponent} from './incident-detail/incident-detail.component';
import {IncidentService} from './shared/services/incident.service';
import {IncidentFromBdService} from './shared/services/incident-from-bd.service';
import {AppRoutingModule} from './/app-routing.module';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { ChangeIncidentStatusComponent } from './change-incident-status/change-incident-status.component';
import { FilterPipe } from './filter.pipe';
import { OrderByPipe } from './order-by.pipe';
import { PersonsComboBoxComponent } from './persons-combo-box/persons-combo-box.component';
import {PersonFromBdService} from "./shared/services/person-from-bd.service";
import { CommentsListComponent } from './comments-list/comments-list.component';
import { CommentFieldComponent } from './comment-field/comment-field.component';
import {CommentFromBdService} from "./shared/services/comment-from-bd.service";
import { IncidentsSectionsComponent } from './incidents-sections/incidents-sections.component';
import { ConnexionComponent } from './connexion-field/connexion.component';
import { GlobalStatsComponent } from './global-stats/global-stats.component';
import { StatsComponent } from './stats/stats.component';
import { BarChartComponent } from './bar-chart/bar-chart.component';
import { ChartsModule } from 'ng2-charts/ng2-charts';
import {StatsService} from "./shared/services/stats.service";
import { CategorieComponent } from './categorie/categorie.component';
import { SettingsComponent } from './settings/settings.component';
import { ArchiveComponent} from "./archive/archive.component";
import { StatsSectionsComponent } from './stats-sections/stats-sections.component';
import { HomeioComponent } from './homeio/homeio.component';
import { FireIncidentComponent } from './fire-incident/fire-incident.component';
import { IntrusionIncidentComponent } from './intrusion-incident/intrusion-incident.component';
import {HomeioService} from "./shared/services/homeio.service";

@NgModule({
  declarations: [
    AppComponent,
    IncidentsComponent,
    IncidentDetailComponent,
    ChangeIncidentStatusComponent,
    FilterPipe,
    OrderByPipe,
    PersonsComboBoxComponent,
    CommentsListComponent,
    CommentFieldComponent,
    IncidentsSectionsComponent,
    ConnexionComponent,
    GlobalStatsComponent,
    StatsComponent,
    BarChartComponent,
    CategorieComponent,
    SettingsComponent,
    ArchiveComponent,
    StatsSectionsComponent,
    HomeioComponent,
    FireIncidentComponent,
    IntrusionIncidentComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    ChartsModule,
  ],
  providers: [IncidentService, IncidentFromBdService, HttpClientModule, PersonFromBdService, CommentFromBdService, StatsService, HomeioService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
