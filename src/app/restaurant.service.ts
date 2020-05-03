import { Injectable } from '@angular/core';
import { IRestaurant } from './interfaces/restaurant';
import { RESTAURANTS } from './restaurants/mock-restaurants';
import { Observable, of } from 'rxjs';
import { MessageService } from './message.service';

@Injectable({
  providedIn: 'root'
})
export class RestaurantService {

  constructor(private messageService: MessageService) { }

  getRestaurants(): Observable<IRestaurant[]> {
    this.messageService.add('RestaurantService: Fetched Restaurants')
    return of(RESTAURANTS);
  }

  getRestaurant(id: number): Observable<IRestaurant> {
    // TODO: send the message _after_ fetching the hero
    this.messageService.add(`RestaurantService: fetched restaurant id=${id}`);
    return of(RESTAURANTS.find(restaurant => restaurant.id === id));
  }
}
