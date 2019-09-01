import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {MealsService} from '../../services/meals.service';
import {ModalPagePage} from './modal-page/modal-page.page';
import {ModalController} from '@ionic/angular';

@Component({
  selector: 'app-display-meal-selection',
  templateUrl: './display-meal-selection.page.html',
  styleUrls: ['./display-meal-selection.page.scss'],
})
export class DisplayMealSelectionPage implements OnInit {
  sub;
  meals;
  allMeals;
  catergoryMeals;
  constructor(private route: ActivatedRoute, private mealService: MealsService, private modalController: ModalController) { }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.meals = this.mealService.getMealCatergoryById(params.id);
      this.catergoryMeals  = this.mealService.getAllMeal();
      // this.catergoryMeals = this.mealService.getAllMealsByCatergoryId(params.id);

      console.log(this.catergoryMeals );

    });
  }

  async presentModal(id) {
    const modal = await this.modalController.create({
      component: ModalPagePage,
      componentProps: {value: id}
    });
    await modal.present();
  }

}
