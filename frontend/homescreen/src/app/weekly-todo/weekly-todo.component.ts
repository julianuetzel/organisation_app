import { DateTime } from 'luxon';
import { Component, OnInit } from '@angular/core';
import { WeeklytodoService } from '../weeklytodo.service';
import { WeeklyToDo } from './weekly-todo';

interface Day {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-weekly-todo',
  templateUrl: './weekly-todo.component.html',
  styleUrls: ['./weekly-todo.component.scss']
}) 
export class WeeklyTodoComponent implements OnInit {
  selectedValue!: string;
  weekly_todos: WeeklyToDo[] = [];
  task!: WeeklyToDo['task'];
  checked: WeeklyToDo['status'] = WeeklyToDoStatus.open;
  days: Day[] = [
    {value: 'day1', viewValue: 'Montag'},
    {value: 'day2', viewValue: 'Dienstag'},
    {value: 'day3', viewValue: 'Mittwoch'}, 
    {value: 'day4', viewValue: 'Donnerstag'}, 
    {value: 'day5', viewValue: 'Freitag'}, 
    {value: 'day6', viewValue: 'Samstag'},
    {value: 'day7', viewValue: 'Sonntag'}
  ];

  constructor(private weeklytodoService: WeeklyToDoService) { }

  ngOnInit(): void {
  }

  this_week(): string {
    return DateTime.now().weekNumber.toString();
  }

  change_status(status: WeeklyToDo['status']): void {
    if (status == WeeklyToDoStatus.closed) status = WeeklyToDoStatus.open;
    else status = WeeklyToDoStatus.closed;
  }
  
  getWeeklyTodos(): void {
    this.weeklytodoService.get_by_date(this.this_week()).subscribe(weekly_todos => this.weekly_todos = weekly_todos);
  }

  addWeeklyTodo(task: string, done_by: string): void {

    task = task.trim();

    if (!task) { return; };

    let new_weekly_todo : WeeklyToDo = {
      id: "",
      task: task,
      status: WeeklyToDoStatus.open,
      task_week: this.this_week(),
      done_by: done_by,
    }; 

    this.weeklytodoService.create( new_weekly_todo as WeeklyToDo )
      .subscribe(todo => {
        this.weekly_todos.push(todo)
      });
  }

  getWeeklyTodosByDate(date: string): void {
    this.weeklytodoService.get_by_date(date).subscribe(weekly_todos => this.weekly_todos = weekly_todos);
  }
}
