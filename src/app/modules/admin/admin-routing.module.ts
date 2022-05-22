import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin.component';
import { EventActivityScoresComponent } from './pages/event-activity-scores/event-activity-scores.component';
import { EventComponent } from './pages/event/event.component';
import { EventsComponent } from './pages/events/events.component';


const routes: Routes = [
  { 
    path: '', component: AdminComponent,
    children: [
      { path: 'events', component: EventsComponent },
      { path: 'event/:id', component: EventComponent },
      { path: 'event/:eventid/activities/:activityid/scores', component: EventActivityScoresComponent },
      { path: '**', redirectTo: "home" }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
