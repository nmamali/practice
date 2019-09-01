import {Component, ViewChild, ViewChildren} from '@angular/core';
import {IonSlides, NavController} from '@ionic/angular';
import {MealsService} from '../services/meals.service';
import {DisplayMealSelectionPage} from './display-meal-selection/display-meal-selection.page';
import {NavigationExtras, Router} from '@angular/router';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  slideOpts = {
    initialSlide: 1,
    speed: 400,
    autoplay: true,
    pager: true,
    loop: true

  };
  public meals;
  public mealsCatergory;
  constructor(mealsService: MealsService, public navCtr: NavController, private router: Router) {
     this.meals = mealsService.getAllMeals();
     this.mealsCatergory = mealsService.getAllMealCatergory();

  }
  visitPage(meal){
    this.router.navigate(['/display-meal-selection', {id: meal.id}]);

  }

}
