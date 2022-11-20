import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, of, tap } from 'rxjs';
import { WeeklyToDo, WeeklyToDoUpdate } from './weekly-todo/weekly-todo';

@Injectable({
  providedIn: 'root'
})
export class WeeklytodoService {

  url = "http://127.0.0.1:5000/weekly-todos"
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

  get_by_week(week_number: number): Observable<WeeklyToDo[]> {
    const url = `${this.url}/week/${week_number}`;
    return this.http.get<WeeklyToDo[]>(url, this.httpOptions).pipe(
      tap(_ => console.log(`Got all Weekly-todos for week ${week_number}`)),
      catchError(this.handleError<WeeklyToDo[]>(`get_by_week`, []))
    )
  }

  create(weekly_todo: WeeklyToDo): Observable<WeeklyToDo> {
    return this.http.post<WeeklyToDo>(this.url, weekly_todo, this.httpOptions).pipe(
      tap(weekly_todo => console.log(`Created Weekly-todo with ID=${weekly_todo._id}`)),
      catchError(this.handleError<WeeklyToDo>(`create ID=${weekly_todo._id}`))
    )
  }

  update(weekly_todo: WeeklyToDo, updated_weekly_todo: WeeklyToDoUpdate): Observable<any> {
    const url = `${this.url}/${weekly_todo._id}`
    return this.http.put(url, updated_weekly_todo, this.httpOptions).pipe(
      tap(element => console.log(`Updated Weekly-todo with ID=${weekly_todo._id}`)),
      catchError(this.handleError(`update ID=${weekly_todo._id}`))
    )
  }

  delete(id: string): Observable<any> {
    const url = `${this.url}/${id}`
    return this.http.delete<WeeklyToDo>(url, this.httpOptions).pipe(
      tap(_ => console.log(`Deleted Weekly-Todo with ID=${id}`)),
      catchError(this.handleError(`delete ID=${id}`))
    )
  }
}
