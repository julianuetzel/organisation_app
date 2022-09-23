import { Component, OnInit } from '@angular/core';
import { DailyTodoService } from '../dailytodo.service';
import { DailyToDo, DailyToDoStatus } from './daily-todo';


@Component({
  selector: 'app-daily-todo',
  templateUrl: './daily-todo.component.html',
  styleUrls: ['./daily-todo.component.scss']
})
export class DailyTodoComponent implements OnInit {
  date = new Date();
  daily_todos: DailyToDo[] = [];
  task!: DailyToDo['task'];
  checked: DailyToDo['status'] = DailyToDoStatus.open

  constructor(private dailytodoService: DailyTodoService) { }
  
  ngOnInit(): void {
    this.getDailyTodosByDate(this.date_today());
  }

  getDailyTodosByDate(date: string): void {
    this.dailytodoService.get_by_date(date)
    .subscribe(daily_todos => this.daily_todos = daily_todos);
    console.log(this.daily_todos.values)
  }

  date_today(): string {
    return this.date.toLocaleDateString()
  }

  change_status(status: DailyToDo['status']): void {
    if (status == DailyToDoStatus.closed) status = DailyToDoStatus.open;
    else status = DailyToDoStatus.closed;
  }
  
  getDailyTodos(): DailyToDo[] {
    this.dailytodoService.get_by_date(this.date_today()).subscribe(daily_todos => this.daily_todos = daily_todos);
    return this.daily_todos
  }

  addDailyTodo(task: string): void {

    task = task.trim();

    if (!task) { return; };

    let new_daily_todo : DailyToDo = {
      id: "",
      task: task,
      status: DailyToDoStatus.open,
      task_date: this.date_today(),
    }; 

    this.dailytodoService.create( new_daily_todo as DailyToDo )
      .subscribe(todo => {
        this.daily_todos.push(todo)
      });
  }

}
