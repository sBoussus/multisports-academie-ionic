import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Event } from 'src/app/models/event/event';
import { Team } from 'src/app/models/teams/team';
import { EventService } from 'src/app/modules/ms-api/event/event.service';


@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.scss'],
})
export class EventComponent implements OnInit {

  id: string;
  event: Event;

  eventDatesStatus: number;

  eventTeams: Team[] = [];

  constructor(
    private eventService: EventService,
    private route : ActivatedRoute,
  ) { }

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];
    this.initEvent();    
  }

  initEvent() {
    this.eventService.findById(this.id).subscribe(data => {
      this.event = data;
      this.defineEventsDatesStatus();
      this.initEventTeams();
    })    
  }

  dateDiff(first, second) {
    return Math.round((second-first)/(1000*60*60*24));
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

  initEventTeams() {
    let registrations = this.event.registrations;
    let nbTeams = registrations.length;
    let i = 0;
    if (nbTeams > 0) {
      for (let registration of registrations) { 
        this.eventTeams.push(registration.team);
      }
    }
  }

}
