import { DateTime } from 'luxon';
import { Component, OnInit } from '@angular/core';
import { WeeklytodoService } from '../weeklytodo.service';
import { WeeklyToDo, WeeklyToDoUpdate } from './weekly-todo';
import { ProgressSpinnerMode } from '@angular/material/progress-spinner';
import { v4 as uuidv4 } from 'uuid';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from './dialog/dialog.component';

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
  date = DateTime.now()
  week_number = DateTime.now().weekNumber;
  weekly_todo: WeeklyToDo | undefined;
  weekly_todos: WeeklyToDo[] = [];
  mode: ProgressSpinnerMode = 'determinate';
  selectedDay: Day | undefined;
  days: Day[] = [
    {value: 'day1', viewValue: 'Montag'},
    {value: 'day2', viewValue: 'Dienstag'},
    {value: 'day3', viewValue: 'Mittwoch'}, 
    {value: 'day4', viewValue: 'Donnerstag'}, 
    {value: 'day5', viewValue: 'Freitag'}, 
    {value: 'day6', viewValue: 'Samstag'},
    {value: 'day7', viewValue: 'Sonntag'}
  ];

  constructor(
    private weeklytodoService: WeeklytodoService,
    private dialog: MatDialog
    ) { }

  ngOnInit(): void {
    this.getWeeklyTodosByDate(this.week_number);
  }
  
  getWeeklyTodosByDate(week_number: number): void {
    this.weeklytodoService.get_by_week(week_number).subscribe(weekly_todos => this.weekly_todos = weekly_todos);
  }

  addWeeklyTodo(task: string, done_by: string): void {

    task = task.trim();

    if (!task) { return; };

    let new_weekly_todo : WeeklyToDo = {
      _id: uuidv4(),
      task: task,
      done: false,
      task_week: this.week_number,
      done_by: done_by,
    }; 

    this.weeklytodoService.create( new_weekly_todo )
      .subscribe(todo => {
        this.weekly_todos.push(todo)
      }
    );
  }
  
  updateStatus(weekly_todo: WeeklyToDo){
    let updated_weekly_todo : WeeklyToDoUpdate = {
      task: weekly_todo.task,
      done: !(weekly_todo.done),
      done_by: weekly_todo.done_by,
    }

    this.weeklytodoService.update(weekly_todo, updated_weekly_todo).subscribe()
  }

  openDialog(weekly_todo: WeeklyToDo): void{
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '250px',
      data: {task: weekly_todo.task, done_by: weekly_todo.done_by},
    })
    dialogRef.afterClosed().subscribe(result => {
      console.log(result.task)
      let updated_weekly_todo : WeeklyToDoUpdate = {
        task: result.task,
        done: weekly_todo.done,
        done_by: result.done_by
      }
      this.weeklytodoService.update(weekly_todo, updated_weekly_todo).subscribe() 
    });
  }

  deleteWeeklyTodo(weekly_todo: WeeklyToDo){
    this.weekly_todos = this.weekly_todos.filter(w_todo => w_todo !== weekly_todo);
    this.weeklytodoService.delete(weekly_todo._id).subscribe()
  }

  progress(): number{
    var i = 0;
    for (var daily_todo of this.weekly_todos)  {
      if (daily_todo.done) i++;
    }
    return (i*100/this.weekly_todos.length)    
  }

  week_before(week_number: number){
    this.date = this.date.minus(604800000);
    this.week_number = this.date.weekNumber;
    console.log(this.week_number)
    this.getWeeklyTodosByDate(this.week_number)
  }

  week_after(week_after: number) {
    this.date = this.date.plus(604800000);
    this.week_number = this.date.weekNumber;
    console.log(this.week_number)
    this.getWeeklyTodosByDate(this.week_number)
  }
}
