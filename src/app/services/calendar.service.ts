import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Calendar } from '../models/calendar.model';
import { Observable } from 'rxjs';

const urlCalendar = 'https://timelyapp.time.ly/api/calendars/info'
const body = {
  url: 'https://calendar.time.ly/6a37fb6n'
}

@Injectable({
  providedIn: 'root'
})
export class CalendarService {

  constructor(private http : HttpClient) { }

  getCalendar() : Observable<Object> {
    return this.http.post<Object>(urlCalendar, body);
  }

  getEvents(calendarId : Number) : Observable<Object> {
    return this.http.get<Object>(`https://timelyapp.time.ly/api/calendars/${calendarId}/events`);
  }
}
