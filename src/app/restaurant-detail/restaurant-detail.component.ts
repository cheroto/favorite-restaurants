import { Component, OnInit, Input } from '@angular/core'
import { IRestaurant } from '../interfaces/restaurant'
import { ActivatedRoute } from '@angular/router';
import { RestaurantService } from '../restaurant.service';
import { Location } from '@angular/common';


@Component({
  selector: 'app-restaurant-detail',
  templateUrl: './restaurant-detail.component.html',
  styleUrls: ['./restaurant-detail.component.css']
})
export class RestaurantDetailComponent implements OnInit {

  restaurant: IRestaurant;

  constructor(
    private route: ActivatedRoute,
    private restaurantService: RestaurantService,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.getRestaurant();
  }

  getRestaurant(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.restaurantService.getRestaurant(id).subscribe(restaurant => {
      this.restaurant = restaurant;
    });
  }

  goBack(): void {
    this.location.back();
  }

  save(): void {
    this.restaurantService.updateRestaurant(this.restaurant).subscribe(() => {
      this.location.back();
    });
  }

}
