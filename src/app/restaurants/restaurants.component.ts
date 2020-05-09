import { Component, OnInit } from '@angular/core';
import { IRestaurant } from '../interfaces/restaurant';
import { RESTAURANTS } from './mock-restaurants';
import { inject } from '@angular/core/testing';
import { RestaurantService } from '../restaurant.service';
import { MessageService } from '../message.service';

@Component({
  selector: 'app-restaurants',
  templateUrl: './restaurants.component.html',
  styleUrls: ['./restaurants.component.css']
})
export class RestaurantsComponent implements OnInit {

  constructor(private restaurantService: RestaurantService,
              private messageService: MessageService ) {}

  restaurants: IRestaurant[];

  ngOnInit(): void {
    this.getRestaurants();
  }

  getRestaurants(): void {
    this.restaurantService.getRestaurants().subscribe((restaurants) => {
      this.restaurants = restaurants;
    });
  }

  add(name: string): void {
    name = name.trim();
    if (!name) { return; }
    this.restaurantService.addRestaurant({ name } as IRestaurant)
      .subscribe(restaurant => {
        this.restaurants.push(restaurant);
      });
  }

  delete(restaurant: IRestaurant): void {
    this.restaurants = this.restaurants.filter(r => r !== restaurant);
    this.restaurantService.deleteRestaurant(restaurant).subscribe();
  }

  search(term: string): void {
    if (term.length){
      this.restaurantService.searchRestaurants(term).subscribe(restaurants => {
        this.restaurants = restaurants;
      });
    } else {
      this.getRestaurants(); 
    }
  }

}
