import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Logs } from 'selenium-webdriver';
import { Activity } from 'src/app/models/activity/activity.model';
import { Event } from 'src/app/models/event/event';
import { Score } from 'src/app/models/event/score';
import { ActivityService } from 'src/app/modules/ms-api/activity/activity.service';
import { EventService } from 'src/app/modules/ms-api/event/event.service';

@Component({
  selector: 'app-event-activity-scores',
  templateUrl: './event-activity-scores.component.html',
  styleUrls: ['./event-activity-scores.component.scss'],
})
export class EventActivityScoresComponent implements OnInit {

  eventId: string|null;
  event: Event;
  activityId: string|null;
  activity: Activity;  

  teamsScores: any[] = [];

  constructor(
    private eventService: EventService,
    private activityService: ActivityService,
    private route : ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    this.eventId = this.route.snapshot.params['eventid'];
    this.activityId = this.route.snapshot.params['activityid'];
    this.initEvent();
    this.initActivity();
  }

  initEvent() {
    this.eventService.findById(this.eventId).subscribe(data => {
      this.event = data;
      this.initTeamsScores();
    })    
  }

  initActivity() {
    this.activityService.findById(this.activityId).subscribe(data => {
      this.activity = data;
    })    
  }

  initTeamsScores() {
    let registrations = this.event.registrations;
    for (let registration of registrations) {
      if (registration.scores != undefined) {
        let existingScore = false;
        registration.scores.map((score, index) => {          
          if (score.activity._id == this.activityId) {
            existingScore = true;
            // create a teamScore with the points of the existing score
            let teamScore = {
              team : registration.team,
              points: score.points
            }; 
            this.teamsScores.push(teamScore);
          }          
        })
        // if the score for this acivity hasn't been recorded yet
        if (! existingScore) {
          // create a teamScore with empty points
          let teamScore = {
            team : registration.team,
            points: null
          }; 
          this.teamsScores.push(teamScore);
        }
      } else {
        // create a teamScore with empty points
        let teamScore = {
          team : registration.team,
          points: null
        }; 
        this.teamsScores.push(teamScore);
      }
    }
    console.log(this.teamsScores);
  }

  onChangepoints(event: any, teamId: string) {
    // build a new score
    let newScore = new Score();
    newScore.activity = this.activity;
    newScore.points = event.target.value;
    // update Registration
    let registrations = this.event.registrations;
    for (let registration of registrations) {
      if (registration.team._id == teamId) {
        // if some scores has already been recorded
        if (registration.scores != undefined) {
          let existingScore = false;
          registration.scores.map((score, index) => {            
            if (score.activity._id == this.activityId) {
              existingScore = true;
              // delete the previous score from the registration
              registration.scores.splice(index, 1);
              // add the new score to the registration
              registration.scores.push(newScore);
            }            
          })
          // if the score for this acivity hasn't been recorded yet
          if (! existingScore) {
            // add a new score to the registration
            registration.scores.push(newScore);
          }
        } else {
          // add a new score to the registration
          registration.scores = [];
          registration.scores.push(newScore);
        }
      }
      // persist in database
      this.eventService.updateRegistration(this.eventId, registration).subscribe(data => {
        console.log(data);
      })    
    }   

  }

  goToEvent() {
    this.router.navigateByUrl(`/event/${this.eventId}`);
  }

}
