import { Component, OnInit } from '@angular/core';
import { IRestaurant } from '../interfaces/restaurant';
import { RestaurantService } from '../restaurant.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: [ './dashboard.component.css' ]
})
export class DashboardComponent implements OnInit {
  restaurants: IRestaurant[] = [];

  constructor(private restaurantService: RestaurantService) { }

  ngOnInit() {
    this.getRestaurants();
  }

  getRestaurants(): void {
    this.restaurantService.getRestaurants()
      .subscribe(restaurants => this.restaurants = restaurants.slice(1, 5));
  }
}