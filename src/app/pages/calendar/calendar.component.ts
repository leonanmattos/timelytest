import { Component, OnInit } from '@angular/core';
import { Event } from '../../models/event.model';
import { Calendar } from '../../models/calendar.model'
import { CalendarService } from '../../services/calendar.service';
import * as moment from 'moment';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit {

  calendar : Calendar = {
    id: 0,
    title: ''
  };

  events : Event[] = []

  constructor(private calendarService : CalendarService) {}

  ngOnInit(): void {
    this.calendarService.getCalendar().subscribe((resp : any) => {
      this.calendar.id = resp.data.id;
      this.calendar.title = resp.data.title;


      const momentVar = moment('')
      this.calendarService.getEvents(this.calendar.id).subscribe((resp : any) => {
        if(resp.data.items) {
          resp.data.items.map((item : any) => {

            const event = {
              title: item.title,
              image: item.images[0]?.sizes?.small.url,
              description: item.description_short,
              startDate: moment(item.start_datetime).format('DD MMM YYYY'),
              cost: Number(item.cost_display)
            }

            this.events.push(event)
          })
        }
        console.log(this.events)
      });

    });

  }
}
