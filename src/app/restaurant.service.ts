import { Injectable } from '@angular/core';
import { IRestaurant } from './interfaces/restaurant';
import { Observable, of } from 'rxjs';
import { MessageService } from './message.service';
import { HttpClient } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class RestaurantService {

  private restaurantsAPI = 'api/restaurants';
  constructor(private messageService: MessageService,
    private http: HttpClient,
  ) { }

  getRestaurants(): Observable<IRestaurant[]> {
    return this.http.get<IRestaurant[]>(this.restaurantsAPI)
      .pipe(
        tap(_ => this.log('fetched restaurants.')),
        catchError(this.handleError<IRestaurant[]>('getRestaurants', []))
      );
  }

  /** GET hero by id. Will 404 if id not found */
getRestaurant(id: number): Observable<IRestaurant> {
  const url = `${this.restaurantsAPI}/${id}`;
  return this.http.get<IRestaurant>(url).pipe(
    tap(_ => this.log(`fetched restaurant id=${id}`)),
    catchError(this.handleError<IRestaurant>(`getHero id=${id}`))
  );
}

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  log(message: string): void {
    this.messageService.add(`RestaurantService: ${message}`);
  }
}
