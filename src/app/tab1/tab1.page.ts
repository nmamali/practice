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
  private goalList: any;
  private loadedGoalList: any;
  constructor(mealsService: MealsService, public navCtr: NavController, private router: Router) {
     this.meals = mealsService.getAllMeals();
     this.mealsCatergory = mealsService.getAllMealCatergory();
     this.goalList = this.mealsCatergory;
     this.loadedGoalList = this.mealsCatergory;

  }
  visitPage(meal){
    this.router.navigate(['/display-meal-selection', {id: meal.id}]);

  }

  initializeItems(): void {
    this.goalList = this.loadedGoalList;
  }
  filterList(evt) {
    this.initializeItems();
    const searchTerm = evt.srcElement.value;
    if (!searchTerm) {
      return;
    }
    this.goalList = this.goalList.filter(currentGoal => {
      if ((currentGoal.title) && searchTerm) {
        if (currentGoal.title.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1)  {
          return true;
        }
        return false;
      }
    });
  }

}
