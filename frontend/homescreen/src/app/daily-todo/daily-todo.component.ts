import { Component, OnInit } from '@angular/core';
import { ProgressSpinnerMode } from '@angular/material/progress-spinner';
import { DailyTodoService } from '../dailytodo.service';
import { DailyToDo, DailyToDoUpdate } from './daily-todo';



@Component({
  selector: 'app-daily-todo',
  templateUrl: './daily-todo.component.html',
  styleUrls: ['./daily-todo.component.scss']
})
export class DailyTodoComponent implements OnInit {
  date = new Date();
  daily_todo: DailyToDo | undefined;
  daily_todos: DailyToDo[] = [];
  mode: ProgressSpinnerMode = 'determinate';

  constructor(private dailytodoService: DailyTodoService) { }
  
  ngOnInit(): void {
    this.getDailyTodosByDate(this.date_today());
  }

  date_today(): string {
    return this.date.toLocaleDateString()
  }

  getDailyTodosByDate(date: string): void {
    this.dailytodoService.get_by_date(date)
    .subscribe((data: DailyToDo[]) => this.daily_todos = [
      ...data]
    );
    console.log(this.daily_todos.values, this.daily_todos)
  }

  getDailyToDoById(id: string): void {
    this.dailytodoService.get_by_id(id)
      .subscribe((data: DailyToDo) =>  this.daily_todo = {
        ...data
      });
    console.log(this.daily_todo)
  }
  
  getDailyTodos(): DailyToDo[] {
    this.dailytodoService.get_by_date(this.date_today()).subscribe(daily_todos => this.daily_todos = daily_todos);
    return this.daily_todos
  }

  addDailyTodo(task: string): void {
    task = task.trim(); 
    if (task) {
      let new_daily_todo : DailyToDo = {
        id: "",
        task: task,
        done: false,
        task_date: this.date_today(),
      }; 

      this.dailytodoService.create( new_daily_todo )
        .subscribe(daily_todo => {
          this.daily_todos.push(daily_todo);
        });
      }
  }

  updateDailyTodoStatus(daily_todo: DailyToDo): void {
    var updated_daily_todo = this.daily_todos.find(d_todo => d_todo.id == daily_todo.id)

    if (updated_daily_todo !== undefined) {

      let updated_daily_todo : DailyToDoUpdate = {
        task: daily_todo.task,
        done: !daily_todo.done,
      }

      this.dailytodoService.update(daily_todo.id, updated_daily_todo)
        .subscribe(daily_todo => {
          this.daily_todos.push(daily_todo)
        })
      this.daily_todos.filter(d_todo => d_todo.id == daily_todo.id).pop()
    }
  }

  updateDailyTodoTask(daily_todo: DailyToDo): void {
    if (this.daily_todo) {
      let updated_daily_todo : DailyToDoUpdate = {
        task: daily_todo.task,
        done: daily_todo.done,
      };

      this.daily_todos = this.daily_todos.filter(d_todo => d_todo !== daily_todo);
      this.dailytodoService.update(daily_todo.id, updated_daily_todo)
        .subscribe()
    }
  }

  deleteDailyTodo(daily_todo: DailyToDo): void {
    this.daily_todos = this.daily_todos.filter(d_todo => d_todo !== daily_todo);
    this.dailytodoService.delete(daily_todo.id)
      .subscribe()
  }

  progress(): number{
    var i = 0;
    for (var daily_todo of this.daily_todos)  {
      if (daily_todo.done) i++;
    }
    return (i*100/this.daily_todos.length)    
  }
}
