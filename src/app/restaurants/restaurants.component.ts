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

}
