import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Event } from 'src/app/models/event/event';

@Component({
  selector: 'app-events-event',
  templateUrl: './events-event.component.html',
  styleUrls: ['./events-event.component.scss'],
})
export class EventsEventComponent implements OnInit {

  @Input() event :Event;
  eventRegistrationStatus: number;
  eventDatesStatus: number;

  constructor(
    private router: Router,
  ) { }

  ngOnInit() {
    this.defineEventRegistrationStatus();
    this.defineEventsDatesStatus();
  }

  /** Event redirection */

  goToEvent() {
    this.router.navigateByUrl(`/event/${this.event._id}`);
  }

  /** Event registration */

  defineEventRegistrationStatus() {
    let currentDate = new Date();
    let startRegistration = new Date(this.event.startRegistration);
    let endRegistration = new Date(this.event.endRegistration);

    // before registration
    if (currentDate < startRegistration) {
      this.eventRegistrationStatus = 1;
    // during registration
    } else if (currentDate >= startRegistration && currentDate <= endRegistration) {
      this.eventRegistrationStatus = 2;
    // after registration
    } else {
      this.eventRegistrationStatus = 3;
    }
  }
  
  
  /** Event dates */

  defineEventsDatesStatus() {
    let currentDate = new Date();
    let startEvent = new Date(this.event.startEvent);
    let endEvent = new Date(this.event.endEvent);

    // before event dates
    if (currentDate < startEvent) {
      this.eventDatesStatus = 1;
    // during dates
    } else if (currentDate >= startEvent && currentDate <= endEvent) {
      this.eventDatesStatus = 2;
    // after dates
    } else {
      this.eventDatesStatus = 3;
    }
  }

}
