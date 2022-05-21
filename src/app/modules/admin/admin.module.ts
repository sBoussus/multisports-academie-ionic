import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { MsApiModule } from '../ms-api/ms-api.module';
import { EventsComponent } from './pages/events/events.component';



@NgModule({
  declarations: [
    AdminComponent,
    EventsComponent,
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    MsApiModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule
  ]
})
export class AdminModule { }
