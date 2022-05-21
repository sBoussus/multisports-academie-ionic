import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { MsApiModule } from '../ms-api/ms-api.module';
import { EventsComponent } from './pages/events/events.component';
import { EventsEventComponent } from './components/events/events-event/events-event.component';
import { MsUiModule } from '../ms-ui/ms-ui.module';
import { ActivityThumbnailComponent } from './components/activities/activity-thumbnail/activity-thumbnail.component';
import { EventActivitiesComponent } from './components/activities/event-activities/event-activities.component';
import { EventComponent } from './pages/event/event.component';



@NgModule({
  declarations: [
    AdminComponent,
    EventsComponent,
    EventsEventComponent,
    EventComponent,
    EventActivitiesComponent,
    ActivityThumbnailComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    MsApiModule,
    MsUiModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule
  ]
})
export class AdminModule { }
