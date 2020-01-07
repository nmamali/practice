import { Component, OnInit } from '@angular/core';
import {ModalController, NavParams, ToastController} from '@ionic/angular';
import { DragulaService } from 'ng2-dragula';
import {MealsService} from '../../../services/meals.service';
import {Router} from '@angular/router';
@Component({
  selector: 'app-modal-page',
  templateUrl: './modal-page.page.html',
  styleUrls: ['./modal-page.page.scss'],
})
export class ModalPagePage implements OnInit {
  private meal;
  private show = true;
  private quantity = 1;
  private previousPageId;
  private isBusket;
  private oderData;
  private extras;
  private selectedIngridients = [];
  private ingridients = [];
  private extrasAddedToOder = [];
  private custom = false;
  private instraction: any;
  private totalPrice: number;
  public oderStatus = false;
  private extraPrice = 0;
  private decreaseOrIncreaseQuantityForExtra = 0;
  private year;
  private fourthOfJuly: any;
  private seconds = 10;
  private minutes = 0;
  private hideStatus = false;
  private oderObject = {};

  // tslint:disable-next-line:max-line-length
  constructor(private router: Router, private modalController: ModalController, private navParams: NavParams,
              private dragulaService: DragulaService, private toastController: ToastController,
              private mealsService: MealsService) {
    this.dragulaService.removeModel('mealBusket')
        .subscribe(({ item }) => {
          this.selectedIngridients.push(item);
          this.ingridients.push(item);
        });

    this.dragulaService.dropModel('mealBusket')
        .subscribe(({ item }) => {
          item.color = 'primary';
        });
    // destroying the group name before creating the new one.
    this.dragulaService.destroy('mealBusket');

    this.dragulaService.createGroup('mealBusket', {
      removeOnSpill: true
    });
    this.year = new Date().getFullYear();
    this.fourthOfJuly = new Date((this.year + 1), 6, 4).getTime();
  }

  ngOnInit() {
    this.selectedIngridients = this.mealsService.getAllindridients();
    this.meal = this.navParams.get('value');
    this.previousPageId = this.navParams.get('id');
    this.isBusket = this.navParams.get('isBusket');
    this.oderData = this.navParams.get('oderData');
    this.extras = this.mealsService.getExtrasByMealId();
    // view oder status
    if(this.navParams.get('showStatus') === 'true') {
      this.oderStatus = true;
      this.setInterval();
    } else {
      if (!this.isBusket) {
        this.totalPrice = this.meal.price;

      } else {
        this.totalPrice = 0;
        for (let i = 0; i < this.oderData.length; i++) {
          this.totalPrice += this.oderData[i].totalPrice;
        }
      }
    }
  }

  /**
   * closes the modal
   */
  dismiss(data) {
    console.log('on modal',data);
    this.router.navigate(['/display-meal-selection', {id: this.previousPageId}]);
    this.modalController.dismiss(data);
    this.dragulaService.destroy('mealBusket');
  }
  /**
   * remove custom ingridients
   */
  changeCustom() {
    this.custom = !this.custom;
    this.quantity = 1;
  }

  /**
   * increasing the meal quantity
   */
  increaseQuantity() {
    this.quantity++;
    this.totalPrice += this.meal.price;
    this.extraPrice += this.decreaseOrIncreaseQuantityForExtra;

  }

  /**
   * decreasing meal quantity
   */
  decreaseQuantity() {
    if (this.quantity > 1) {
      this.quantity--;
      this.totalPrice -= this.meal.price;
      this.extraPrice -= this.decreaseOrIncreaseQuantityForExtra;


    }
  }

  /**
   * adding the complete oder to cart
   // tslint:disable-next-line:no-redundant-jsdoc
   * @param meal
   */
  addToCard(meal) {
    this.meal.extas = this.extrasAddedToOder;
    this.meal.selectedIngrients = this.selectedIngridients;
    this.meal.instructions = this.instraction;
    this.meal.quantity = this.quantity;
    this.meal.totalPrice = this.totalPrice + this.decreaseOrIncreaseQuantityForExtra;
    this.mealsService.addTocard(this.meal);
    this.dismiss(true);
  }

  /**
   * adding extras to meal
   * @param entry
   * @param ev
   */
  addedExtra(entry, ev) {
    // extrasAddedToOder
    if (ev.detail.checked && this.extrasAddedToOder.indexOf(entry) === -1) {
      this.extraPrice += entry.extraPrice;
      this.decreaseOrIncreaseQuantityForExtra = this.extraPrice;
      this.extrasAddedToOder.push(entry);
    } else if (!ev.detail.checked) {
      this.extraPrice -= entry.extraPrice;
      this.decreaseOrIncreaseQuantityForExtra = this.extraPrice;
      this.extrasAddedToOder = this.mealsService.removeElementFromArray(this.extrasAddedToOder, entry);
    }
    console.log( this.extrasAddedToOder);
  }

  removeOder(item: any) {
    this.totalPrice -= item.totalPrice;
    // this.oderData = this.mealsService.removeElementFromArray(this.oderData, item);
    this.mealsService.deleteFromCart(item);
    this.oderData = this.mealsService.getCart();

    if (this.oderData.length === 0) {
      this.dismiss(true);
      // this.mealsService.emptyCart();
    }
  }

  showOderStatus() {
    this.oderStatus = true;
    this.isBusket = false;
    this.custom = false;
    this.setInterval();
  }
  // oder Timer
  setInterval() {
    setInterval(function() {
      if (this.seconds !== 0) {
        this.seconds--;
      } else if (this.seconds === 0 && this.minutes > 0) {
        this.minutes--;
        this.seconds = 60;
      }

    }.bind(this), 1000);

  }
  hideTimer() {
    this.hideStatus = true;
    this.dismiss('oderComplete');
    this.router.navigate(['/display-meal-selection', {id: this.previousPageId, viewStatus: this.hideStatus}]);

  }
}
