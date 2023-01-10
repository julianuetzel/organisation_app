import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, of, tap } from 'rxjs';
import { DailyToDo } from './daily-todo/daily-todo';
import { Finances } from './finances/finances';

@Injectable({
  providedIn: 'root'
})
export class FinancesService {
  url = "http://127.0.0.1: 5000/finances"
  httpOption = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  };
  constructor(
    private http: HttpClient
  ) { }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      console.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }

  get_by_month(month: number): Observable<Finances[]> {
    const url = `${this.url}/month/${month}`;
    return this.http.get<Finances[]>(url, this.httpOption).pipe(
      tap(_ => console.log(`Got all Finances for ${month}`)),
      catchError(this.handleError<Finances[]>("get_by_month", []))
    )
  }

  get_by_id(id: string): Observable<Finances>{
    const url = `${this.url}/${id}`;
    return this.http.get<Finances>(url, this.httpOption).pipe(
      tap(id => console.log(`Got finance with ID=${id}`)),
      catchError(this.handleError<Finances>(`get_by_id ID=${id}`))
    )
  }

  create(finance: Finances): Observable<Finances> {
    return this.http.post<Finances>(this.url, finance, this.httpOption).pipe(
      tap(finance => console.log(`Created finance ${finance}`)),
      catchError(this.handleError<Finances>(`create ID=${finance.id}`))
    )
  }

  update(updated_finance: Finances): Observable<any>{
    const url = `${this.url}/${updated_finance.id}`;
    return this.http.put(url, updated_finance, this.httpOption).pipe(
      tap(_ => console.log(`Updated Finance with ID=${updated_finance.id}`)),
      catchError(this.handleError(`updated ID=${updated_finance.id}`))
    )
  }

  delete(id: string): Observable<any> {
    const url = `${this.url}/${id}`;
    return this.http.delete(url, this.httpOption).pipe(
      tap(_ => console.log(`Deleted finance ${id}`)),
      catchError(this.handleError(`delete ID=${id}`))
    )
  }
}
