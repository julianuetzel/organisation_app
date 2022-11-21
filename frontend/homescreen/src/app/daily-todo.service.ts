import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, of, tap } from 'rxjs';
import { DailyToDo, DailyToDoUpdate } from './daily-todo/daily-todo';


@Injectable({
  providedIn: 'root'
})
export class DailyTodoService {
  url = "http://127.0.0.1:5000/daily-todos"
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  constructor(
    private http: HttpClient
    ) { }

    private handleError<T>(operation = 'operation', result?: T) {
      return (error: any): Observable<T> => {
        console.error(error); // log to console instead
        console.log(`${operation} failed: ${error.message}`);
        return of(result as T);
      };
    }

  get_by_date(date: string): Observable<DailyToDo[]> {
    const url = `${this.url}/date/${date}`
    return this.http.get<DailyToDo[]>(url, this.httpOptions).pipe(
      tap(_ => console.log(`Got all ToDos for ${date}`)),
      catchError(this.handleError<DailyToDo[]>("get_by_date", []))
    )
  }

  get_by_id(id: string): Observable<DailyToDo> {
    const url = `${this.url}/${id}`
    return this.http.get<DailyToDo>(url, this.httpOptions).pipe(
      tap(element => console.log(`Got daily-todo with Id ${id}`)),
      catchError(this.handleError<DailyToDo>(`get_by_id ID=${id}`))
    )
  }

  create(daily_todo: DailyToDo): Observable<DailyToDo> {
    return this.http.post<DailyToDo>(this.url, daily_todo, this.httpOptions).pipe(
      tap(daily_todo => console.log(`Created daily-todo ${daily_todo}`)),
      catchError(this.handleError<DailyToDo>(`create ID=${daily_todo._id}`))
    )
  }

  update(daily_todo: DailyToDo, updated_daily_todo: DailyToDoUpdate): Observable<any> {
    const url = `${this.url}/${daily_todo._id}`;
    return this.http.put(url, updated_daily_todo, this.httpOptions).pipe(
      tap(new_daily_todo => console.log(`Updated daily-todo with ID ${daily_todo._id}`)),
      catchError(this.handleError(`update ID=${daily_todo._id}`))
    )
  }

  delete(id: string): Observable<any> {
    const url = `${this.url}/${id}`;
    return this.http.delete(url, this.httpOptions).pipe(
      tap(_ => console.log(`Deleted daily-todo ${id}`)),
      catchError(this.handleError(`delete ID=${id}`))
    )
  }
}
