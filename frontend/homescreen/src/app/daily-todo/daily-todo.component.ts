import { Component, OnInit, Input } from '@angular/core';
import { TodoService } from '../todo.service';
import { ToDo } from './todo';


@Component({
  selector: 'app-daily-todo',
  templateUrl: './daily-todo.component.html',
  styleUrls: ['./daily-todo.component.scss']
})
export class DailyTodoComponent implements OnInit {
  date = new Date();
  todos: ToDo[] = [];

  constructor(private todoService: TodoService) { }

  ngOnInit(): void {
  }

  date_today(): string {
    return this.date.toLocaleDateString()
  }
  
  getTodos(): void {
    this.todoService.getTodos().subscribe(todos => this.todos = todos);
  }

  add(task: string): void {
    task = task.trim();
    if (!task) { return; };
    this.todoService.addTodo( {task} as ToDo)
      .subscribe(todo => {
        this.todos.push(todo)
      });
  }
}
