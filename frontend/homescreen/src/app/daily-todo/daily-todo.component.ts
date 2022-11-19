import { Component, OnInit } from '@angular/core';
import { ProgressSpinnerMode } from '@angular/material/progress-spinner';
import { DailyTodoService } from '../dailytodo.service';
import { DailyToDo, DailyToDoUpdate } from './daily-todo';
import { DialogComponent } from './dialog/dialog.component'
import { MatDialog } from '@angular/material/dialog';



@Component({
  selector: 'app-daily-todo',
  templateUrl: './daily-todo.component.html',
  styleUrls: ['./daily-todo.component.scss']
})
export class DailyTodoComponent implements OnInit {
  date = new Date();
  print_date = this.date.toLocaleDateString();
  daily_todo: DailyToDo | undefined;
  daily_todos: DailyToDo[] = [];
  mode: ProgressSpinnerMode = 'determinate';

  constructor(
    private dailytodoService: DailyTodoService, 
    public dialog: MatDialog
    ) { }
  
  ngOnInit(): void {
    this.getDailyTodosByDate(this.formatDate(this.date));
  }

  formatDate(date: Date) {
    return (
      [
        date.getFullYear(),
        (date.getMonth() + 1).toString().padStart(2, '0'),
        (date.getDate()).toString().padStart(2, '0'),
      ].join('.')
    );
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
    this.dailytodoService.get_by_date(this.formatDate(this.date)).subscribe(daily_todos => this.daily_todos = daily_todos);
    return this.daily_todos
  }

  addDailyTodo(task: string): void {
    task = task.trim(); 
    if (!task) { return; }

    let new_daily_todo : DailyToDo = {
      _id: "",
      task: task,
      done: false,
      task_date: this.formatDate(this.date),
    }; 

    this.dailytodoService.create( new_daily_todo )
      .subscribe(daily_todo => {
        this.daily_todos.push(daily_todo);
      });
  }

  updateStatus(daily_todo: DailyToDo): void {
    var new_status = !daily_todo.done;
    let updated_daily_todo : DailyToDoUpdate = {
      task: daily_todo.task,
      done: new_status,
    }
    this.dailytodoService.update(daily_todo, updated_daily_todo).subscribe() ;
  }

  updateDailyTodo(daily_todo: DailyToDo, new_task: string): void {
    let updated_daily_todo : DailyToDoUpdate = {
      task: new_task,
      done: daily_todo.done,
    }
    this.dailytodoService.update(daily_todo, updated_daily_todo).subscribe() ;
  }

  deleteDailyTodo(daily_todo: DailyToDo): void {
    this.daily_todos = this.daily_todos.filter(d_todo => d_todo !== daily_todo);
    this.dailytodoService.delete(daily_todo._id)
      .subscribe()
  }

  openDialog(daily_todo: DailyToDo): void{
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '250px',
      data: daily_todo.task,
    })
    dialogRef.afterClosed().subscribe(result => {
      daily_todo.task=result;
      this.updateDailyTodo(daily_todo, daily_todo.task)
    });
  }

  progress(): number{
    var i = 0;
    for (var daily_todo of this.daily_todos)  {
      if (daily_todo.done) i++;
    }
    return (i*100/this.daily_todos.length)    
  }

  day_before(date: Date): void {   
    var bday = new Date(date);
    this.date = new Date(bday.setDate(bday.getDate() - 1));
    this.print_date = this.date.toLocaleDateString();
    console.log(this.date)
    this.getDailyTodosByDate(this.formatDate(this.date))
  }

  day_after(date: Date): void {
    var nday = new Date(date);
    this.date = new Date(nday.setDate(nday.getDate() + 1));
    this.print_date = this.date.toLocaleDateString();
    console.log(this.date)
    this.getDailyTodosByDate(this.formatDate(this.date))
  }
}
