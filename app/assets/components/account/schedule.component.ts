import {Component, Input} from "@angular/core"
import {Injectable} from '@angular/core';
import {Http, Headers, Response, RequestOptions} from '@angular/http';
import {OnInit,AfterViewInit} from '@angular/core';
import {AlertService, AuthenticationService} from "../../services/index";
import {Options} from "@types/fullcalendar";

@Component({
  selector: "todo-account-schedule",
  templateUrl: "assets/components/account/schedule.component.html",
})

@Injectable()
export class ScheduleComponent implements OnInit,AfterViewInit {

  options:Options = {droppable: true};
  text: string;
  calendarInitiated:boolean;

  constructor(public http: Http, private authService: AuthenticationService) {
    $(document).ready(function() {
      $('#external-events .fc-event').each(function () {

        // store data so the calendar knows to render an event upon drop
        $(this).data('event', {
          title: $.trim($(this).text()), // use the element's text as the event title
          stick: true // maintain when user navigates (see docs on the renderEvent method)
        });

        // make the event draggable using jQuery UI
        $(this).draggable({
          zIndex: 999,
          revert: true,      // will cause the event to go back to its
          revertDuration: 0  //  original position after the drag
        });

      });

      $('#external-events .fc-event').each(function () {
        // store data so the calendar knows to render an event upon drop
        $(this).data('event', {
          title: $.trim($(this).text()), // use the element's text as the event title
          stick: true // maintain when user navigates (see docs on the renderEvent method)
        });

        // make the event draggable using jQuery UI
        $(this).draggable({
          zIndex: 999,
          revert: true,      // will cause the event to go back to its
          revertDuration: 0  //  original position after the drag
        });

      });

      $('#calendar').fullCalendar({
        header: {
          left: 'prev,next today',
          center: 'title',
          right: 'month,agendaWeek,agendaDay'
        },
        dayClick: function(date, jsEvent, view) {
          // change the day's background color just for fun

        },
        editable: true,
        droppable: true, // this allows things to be dropped onto the calendar
        drop: function() {
          // is the "remove after drop" checkbox checked?
          if ($('#drop-remove').is(':checked')) {
            // if so, remove the element from the "Draggable Events" list
            $(this).remove();
          }
        }
      });
    });
  }

  ngOnInit():void {
    console.log("ngOnInit");
  }


  ngAfterViewInit(){
    console.log("100ms after ngAfterViewInit ");
  }
}
