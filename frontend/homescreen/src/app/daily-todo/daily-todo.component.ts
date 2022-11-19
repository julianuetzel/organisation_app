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
<<<<<<< HEAD
    this.getDailyTodosByDate(this.date_today());
  }

  date_today(): string {
    return this.date.toLocaleDateString()
=======
    this.getDailyTodosByDate(this.formatDate(this.date));
>>>>>>> 4a1d74f00a18a9f43ef604b68d2963c3b8ab2c36
  }

  genId(daily_todos: DailyToDo[]): number {
    return daily_todos.length > 0 ? Math.max(...daily_todos.map(daily_todo => daily_todo.id)) + 1 : 11;
  }

  getDailyTodosByDate(date: string): void {
    this.dailytodoService.get_by_date(date)
    .subscribe((data: DailyToDo[]) => this.daily_todos = [
      ...data]
    );
    console.log(this.daily_todos.values, this.daily_todos)
  }

  getDailyToDoById(id: number): void {
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
<<<<<<< HEAD
    if (task) {
      let new_daily_todo : DailyToDo = {
        id: this.genId(this.daily_todos),
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
    let updated_daily_todo : DailyToDo = {
      id: daily_todo.id,
      task: daily_todo.task,
      done: !daily_todo.done,
      task_date: daily_todo.task_date
    }

    this.dailytodoService.update(updated_daily_todo)
      .subscribe()
  }
  updateDailyTodoTask(daily_todo: DailyToDo): void {
/*     if (this.daily_todo) {
      let updated_daily_todo : DailyToDoUpdate = {
        id: daily_todo.id,
        task: value.task,
        done: daily_todo.done,
        task_date: daily_todo.task_date
      };
      this.dailytodoService.update(updated_daily_todo)
        .subscribe()
    } */
  } 

  deleteDailyTodo(id: number): void {
    this.daily_todos = this.daily_todos.filter(d_todo => d_todo.id !== id);
    this.dailytodoService.delete(id)
=======
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
>>>>>>> 4a1d74f00a18a9f43ef604b68d2963c3b8ab2c36
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
