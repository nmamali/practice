import { Component, OnInit } from '@angular/core';
import {ModalController, NavParams, ToastController} from '@ionic/angular';
import { DragulaService } from 'ng2-dragula';
import {MealsService} from '../../../services/meals.service';
import {Router} from '@angular/router';
import {DisplayMealSelectionPage} from '../display-meal-selection.page';
@Component({
  selector: 'app-modal-page',
  templateUrl: './modal-page.page.html',
  styleUrls: ['./modal-page.page.scss'],
})
export class ModalPagePage implements OnInit {
  meal;
  dat;
  show = true;
  quantity = 1;
  previousPageId;
  isBusket;
  oderData;
  public extras = [
    { val: 'Pepperoni', isChecked: false, extraPrice: 10},
    { val: 'Sausage', isChecked: false , extraPrice: 5},
    { val: 'Mushroom', isChecked: false, extraPrice: 20}
  ];

  selectedIngridients = [
    {id: 0, name: 'Becon', color: 'primary', imgUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTkOGCf8IjBAbVQqUWWaFqGJ0iXGUh4Oi6WSlqDYI6k9wAE6hJd', description: null },
    {id: 1, name: 'Tomato', color: 'primary', imgUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT6MpfzqEitKP8mGw7vejjG3HDqUsAJPmiyJjI6Nr78Ywt3bLz-iw', description: null }
  ];

  public ingridients;

  custom = false;
  // tslint:disable-next-line:max-line-length
  constructor(private router: Router, private modalController: ModalController, public navParams: NavParams,
              private dragulaService: DragulaService, private toastController: ToastController,
              private mealsService: MealsService) {
    this.dragulaService.removeModel('mealBusket')
        .subscribe(({ item }) => {
          this.selectedIngridients.push(item);
          this.ingridients.push(item);
          // this.toastController.create({
          //   message: item.name + ' Added',
          //   duration: 2000
          // }).then(toast => toast.present());
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
  }

  ngOnInit() {

    // getAllindridients
    this.ingridients = this.mealsService.getAllindridients();
    this.meal = this.navParams.get('value');
    this.previousPageId = this.navParams.get('id');
    this.isBusket = this.navParams.get('isBusket');
    this.oderData = this.navParams.get('oderData');
  }
  dismiss() {
    // this.displayMealSelectionPage.anza();
    this.modalController.dismiss();
    // destroying the group name when exiting the modal.
    this.dragulaService.destroy('mealBusket');
    this.router.navigate(['/display-meal-selection', {id: this.previousPageId}]);
    // this.previousPageId
  }
  showExtra() {
    this.show = !this.show;
  }
  changeCustom() {
    this.custom = !this.custom;
    this.quantity = 1;
  }
  increaseQuantity() {
    this.quantity++;
  } decreaseQuantity() {
    if (this.quantity > 1) {
      this.quantity--;

    }
  }
  addToCard(meal) {
    let mealData;
    if (meal) {
      mealData = meal;
    } else {
      console.log(this.selectedIngridients);
      mealData = this.selectedIngridients;
    }
    this.mealsService.addTocard(mealData);
    this.dismiss();
    // this.displayMealSelectionPage.displayCart();
  }
  changeOption(data) {
    console.log(data);
  }


}
