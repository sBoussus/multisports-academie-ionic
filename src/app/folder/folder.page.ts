import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Event } from '../models/event/event';
import { EventService } from '../modules/ms-api/event/event.service';

@Component({
  selector: 'app-folder',
  templateUrl: './folder.page.html',
  styleUrls: ['./folder.page.scss'],
})
export class FolderPage implements OnInit {
  public folder: string;
  public events : Event[] = [];

  constructor(private activatedRoute: ActivatedRoute, private eventService: EventService) { }

  ngOnInit() {
    this.folder = this.activatedRoute.snapshot.paramMap.get('id');
    this.initEvents();
  }

  initEvents() {
    this.eventService.findAll().subscribe(data => {
      this.events = data;
      console.log(data);
    })
  }

}
