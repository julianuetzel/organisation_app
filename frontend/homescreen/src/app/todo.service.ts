import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { ToDo } from './daily-todo/todo';


@Injectable({
  providedIn: 'root'
})
export class TodoService {

  constructor(private http: HttpClient) { }

  private todosUrl = 'api/daily_todos';

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json'})
  };

  private handleError<T>(operation: 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      console.log(`${operation} failed: ${error.message}`);
      return of(result as T);     
    }
  }

  getTodos(): Observable<ToDo[]> {
    return this.http.get<ToDo[]>(this.todosUrl)
  }

  getTodo(id: number): Observable<ToDo> {
    const url = `${this.todosUrl}/${id}`;
    return this.http.get<ToDo>(url);
  }

  updateTodo(todo: ToDo): Observable<any> {
    return this.http.put(this.todosUrl, todo, this.httpOptions);
  }

  addTodo(todo: ToDo): Observable<ToDo> {
    return this.http.post<ToDo>(this.todosUrl, todo, this.httpOptions);
  }
}
