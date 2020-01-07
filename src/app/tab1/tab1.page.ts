import {Component, ViewChild, ViewChildren} from '@angular/core';
import {IonSlides, ModalController, NavController} from '@ionic/angular';
import {MealsService} from '../services/meals.service';
import {DisplayMealSelectionPage} from './display-meal-selection/display-meal-selection.page';
import {NavigationExtras, Router} from '@angular/router';
import {ModalPagePage} from './display-meal-selection/modal-page/modal-page.page';
import { DragulaService } from 'ng2-dragula';

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
    // autoHeight: true,
    // watchSlidesProgress: true

  };
  public meals;
  public mealsCatergory;
  private goalList: any;
  private loadedGoalList: any;
  constructor(public mealsService: MealsService, public navCtr: NavController, private router: Router, private modalController: ModalController) {
     this.meals = mealsService.getAllMealsOnspecial();
     console.log(this.meals );
     this.mealsCatergory = mealsService.getAllMealCatergory();
     this.goalList = this.mealsCatergory;
     this.loadedGoalList = this.mealsCatergory;

  }
  visitPage(meal) {
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

    presentModal(id) {
        this.router.navigate(['/display-meal-selection', {id: id}]);

        // console.log(id);
        // const modal = await this.modalController.create({
        //     component: ModalPagePage,
        //     componentProps: {value: id, id: this.meals.id, isBusket: false},
        // });
        // await modal.present();
    }

  allSpecial() {
    this.router.navigate(['/display-meal-selection', {id: '-1'}]);

  }
}
