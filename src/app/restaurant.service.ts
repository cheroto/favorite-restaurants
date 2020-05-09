import { Injectable } from '@angular/core';
import { IRestaurant } from './interfaces/restaurant';
import { Observable, of } from 'rxjs';
import { MessageService } from './message.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
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

  updateRestaurant(restaurant: IRestaurant): Observable<void> {
    return this.http.put(`${this.restaurantsAPI}`, restaurant, this.httpOptions).pipe(
      tap(() => this.log(`Updated restaurant ${restaurant.id}`)),
      catchError(this.handleError<any>('updateHero'))
    )
  }

  /** POST: add a new hero to the server */
  addRestaurant(restaurant: IRestaurant): Observable<IRestaurant> {
    return this.http.post<IRestaurant>(this.restaurantsAPI, restaurant, this.httpOptions).pipe(
      tap((newRestaurant: IRestaurant) => this.log(`added restaurant w/ id=${newRestaurant.id}`)),
      catchError(this.handleError<IRestaurant>('addRestaurant'))
    );
  }

  /** DELETE: Delete Restaurant from Server */
deleteRestaurant(restaurant: IRestaurant | number): Observable<IRestaurant> {
  const id = typeof restaurant === 'number' ? restaurant : restaurant.id;
  const url = `${this.restaurantsAPI}/${id}`;

  return this.http.delete<IRestaurant>(url, this.httpOptions).pipe(
    tap(_ => this.log(`deleted restaurant id=${id}`)),
    catchError(this.handleError<IRestaurant>('deleteRestaurant'))
  );
}

/* GET Restaurants whose name contains search term */
searchRestaurants(term: string): Observable<IRestaurant[]> {
  if (!term.trim()) {
    // if not search term, return empty hero array.
    return of([]);
  }
  return this.http.get<IRestaurant[]>(`${this.restaurantsAPI}/?name=${term}`).pipe(
    tap(x => x.length ?
       this.log(`found restaurants matching "${term}"`) :
       this.log(`no restaurants matching "${term}"`)),
    catchError(this.handleError<IRestaurant[]>('searchRestaurants', []))
  );
}

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

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
