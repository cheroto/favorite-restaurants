import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { IRestaurant } from './interfaces/restaurant';

@Injectable({
  providedIn: 'root',
})
export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const restaurants = [
      {
        id: 1,
        name: 'Kibo Sushi',
        address: 'Blabla Avenue West',
        rating: 5
      },
      {
        id: 2,
        name: 'Dominos',
        address: 'Blabla Avenue East',
        rating: 4
      },
      {
        id: 3,
        name: 'Wendy\'s',
        address: 'Blabla Avenue East',
        rating: 4
      }, {
        id: 4,
        name: 'Cheesecake Factory',
        address: 'Blabla Avenue East',
        rating: 4
      }, 
      {
        id: 5,
        name: 'Mc Donalds',
        address: 'Blabla Avenue East',
        rating: 4
      }, 
      {
        id: 6,
        name: 'Wild Wings',
        address: 'Blabla Avenue East',
        rating: 4
      }, 
      {
        id: 7,
        name: 'Harveys',
        address: 'Blabla Avenue East',
        rating: 4
      }, 
      {
        id: 8,
        name: 'Hooters',
        address: 'Blabla Avenue East',
        rating: 4
      },
    ];
    return { restaurants };
  }

  genId(restaurants: IRestaurant[]): number {
    return restaurants.length > 0 ? Math.max(...restaurants.map(hero => hero.id)) + 1 : 11;
  }
}