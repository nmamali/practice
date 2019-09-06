import {Component, OnInit, ViewChild} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {MealsService} from '../../services/meals.service';
import {ModalPagePage} from './modal-page/modal-page.page';
import {ModalController, ToastController} from '@ionic/angular';
import {IonicSelectableComponent} from 'ionic-selectable';

@Component({
  selector: 'app-display-meal-selection',
  templateUrl: './display-meal-selection.page.html',
  styleUrls: ['./display-meal-selection.page.scss'],
})
export class DisplayMealSelectionPage implements OnInit {
  sub;
  meals;
  catergoryMeals;
  filter = false;
  toggleValue = null;
  extimatedTime = [
    {
      id: 0,
      minValue: 0,
      maxValue: 10,
      time: 'less than 10 minutes'
    },
    {
      id: 1,
      time: 'less than 20 minutes',
      minValue: 11,
      maxValue: 20
    },
    {
      id: 2,
      time: 'less than 30 minutes',
      minValue: 21,
      maxValue: 30
    },
    {
      id: 3,
      time: 'More than 30 minutes',
      minValue: 31,
      maxValue: 100000000
    }
  ];

  prices = [
    {
      priceRage: 'R0 - R50',
      id: 0,
      type: 'Framework'
    },
    {
      priceRage: 'R51 - R100',
      id: 1,
      type: 'Framework'
    },
    {
      priceRage: 'R101 - R150',
      id: 3,
      type: 'Language'
    },
    {
      priceRage: 'R151 and above',
      id: 4,
      type: 'Language'
    },
  ];
  selecttedPrice = null;
  selecttedTime = [];
  backUpList = [];
  // Interesting part starts here
  // @ts-ignore
  // @ViewChild('selectComponent') selectComponent: IonicSelectableComponent;
  toggle = true;
  group = null;
  selectedPriceList = [];
  private goalList: any;
  private loadedGoalList: any;
    private filterByPrice: boolean;

  constructor(private route: ActivatedRoute, private mealService: MealsService, private modalController: ModalController, private toastController: ToastController) {

  }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.meals = this.mealService.getMealCatergoryById(params.id);
      this.catergoryMeals  = this.mealService.getAllMeal();
      console.log(this.catergoryMeals );
      this.goalList = this.catergoryMeals;
      this.loadedGoalList = this.catergoryMeals;
    });

  }

  async presentModal(id) {
    const modal = await this.modalController.create({
      component: ModalPagePage,
      componentProps: {value: id, id: this.meals.id, isBusket: false},
    });
    await modal.present();
  }
  showFilter() {
    this.filter = !this.filter;
  }
  initializeItems(): void {
    this.goalList = this.loadedGoalList;
    this.toggleValue = false;
  }

    /**
     * Search Filtering
     * @param evt
     */
  filterList(evt) {
    if (this.goalList.length === 0) {
      if (this.toggleValue === false) {
        this.initializeItems();
      } else if (this.filterByPrice) {
          this.goalList = this.selectedPriceList;
      } else {
        this.goalList = this.backUpList;
      }

    }

    const searchTerm = evt.srcElement.value;
    if (!searchTerm) {
      if (this.toggleValue === true) {
        this.goalList = this.backUpList;
      } else {
        this.initializeItems();
      }
      return;
    }

    this.goalList = this.goalList.filter(currentGoal => {
      if ((currentGoal.name) && searchTerm) {
        if (currentGoal.name.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1)  {
          return true;
        }
        return false;
      }
    });
  }

    /**
     * filtering by mealType
     * @param evt
     */
  filterMealType(evt) {
    const filtereMeal = [];
    if (evt) {
      for (let i = 0; i < this.goalList.length; i++) {
        if (this.goalList[i].mealType === 'vegiterian') {
          filtereMeal.push(this.goalList[i]);
        }
      }
      this.goalList = filtereMeal;
      this.backUpList = filtereMeal;
    } else {
        if (!this.filterByPrice) {
            this.goalList = this.loadedGoalList;
        } else {
          this.goalList = this.selectedPriceList;
        }
    }

  }

    /**
     * filtering by estimated time
     * @param time
     */
    estimatedTime(time) {
      if (time !== null) {
          if (!this.toggleValue ) {
              this.goalList = this.loadedGoalList;
          } else {
              this.goalList = this.backUpList;
          }
          const filteredMeal = [];
          console.log(time);
          for (let i = 0; i < this.goalList.length; i++) {
              if (this.goalList[i].preparationDuration <= time.maxValue ) {
                  filteredMeal.push(this.goalList[i]);
              }
          }
          this.goalList = filteredMeal;
          this.selectedPriceList = filteredMeal;
          this.filterByPrice = true;
      } else {
          this.filterByPrice = false;
          if (this.toggleValue) {
              this.goalList = this.backUpList;
          } else {
              this.goalList = this.loadedGoalList;
          }

      }

    }

    async showBusket() {
        console.log(this.mealService.getCart());
        if (this.mealService.getCart().length !== 0) {
            const modal = await this.modalController.create({
                component: ModalPagePage,
                componentProps: {isBusket: true, id: this.meals.id, oderData: this.mealService.getCart() },
            });
            await modal.present();
        } else {
            this.toastController.create({
                message: 'Basket is empty , create an oder first',
                color: 'danger',
                duration: 2000
            }).then(toast => toast.present());
        }


        return this.mealService.getCart();

    }

}
