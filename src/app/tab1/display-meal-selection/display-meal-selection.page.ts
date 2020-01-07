import {Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {MealsService} from '../../services/meals.service';
import {ModalPagePage} from './modal-page/modal-page.page';
import {ModalController, ToastController} from '@ionic/angular';
@Component({
  selector: 'app-display-meal-selection',
  templateUrl: './display-meal-selection.page.html',
  styleUrls: ['./display-meal-selection.page.scss'],
})
export class DisplayMealSelectionPage implements OnInit {
  private sub;
  private meals;
  private catergoryMeals;
  private toggleValue = null;
  private extimatedTime;
  private prices;
  private selecttedTime = [];
  private backUpList = [];

  private selectedPriceList = [];
  private goalList: any;
  private loadedGoalList: any;
  private filterByPrice: boolean;
  public busket = [];
  public title;
  p = 1;
  private pageId;
  private showStatus;
  private oderModalOpen: boolean;

    // tslint:disable-next-line:max-line-length
  constructor(private router: Router, private route: ActivatedRoute, private mealService: MealsService, private modalController: ModalController, private toastController: ToastController) {

  }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
        this.showStatus = params.viewStatus;
        if (params.id === '-1') {
            // Specials
            this.title = 'Meals on Special';
            // this.meals = this.mealService.getMealCatergoryById(1);
            this.catergoryMeals  = this.mealService.getAllMealsOnspecial();
            this.loadedGoalList = this.catergoryMeals;
            this.goalList = this.catergoryMeals;
            this.pageId = '-1';
            console.log('Ping!');

        } else {
            // meal category
            this.meals = this.mealService.getAllMealsByCatergoryId(params.id);
            this.mealService.getAllMeals().subscribe((meals) => {
                this.meals = meals;
                console.log(meals);
            });
            this.title = this.mealService.getMealCatergoryById(this.meals[0].catergoryId).title;
            this.catergoryMeals  = this.meals;
            this.loadedGoalList =   this.catergoryMeals;
            this.goalList =   this.catergoryMeals;
            this.pageId = params.id;

        }
    });
    this.prices = this.mealService.getPriceRage();
    this.extimatedTime = this.mealService.getEstimatedTime();
  }

  async presentModal(id) {
    const modal = await this.modalController.create({
      component: ModalPagePage,
      componentProps: {value: id, id: this.pageId, isBusket: false},
    });
    modal.present();
    modal.onDidDismiss().then(data => {
          console.log('data came back from modal');
          console.log(data);
        this.oderModalOpen = false;
        this.busket = this.mealService.getCart();

    });

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
      } else if (this.filterByPrice) {
          this.goalList = this.selectedPriceList;
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
        if (this.mealService.getCart().length !== 0) {
            this.oderModalOpen = true;
            const modal = await this.modalController.create({
                component: ModalPagePage,
                componentProps: {isBusket: true, id: this.pageId, oderData: this.mealService.getCart() },
            });
             modal.present();
            modal.onDidDismiss().then(data => {
                console.log('data came back from modal busket');
                this.oderModalOpen = false;
                this.busket = this.mealService.getCart();

            });
        }
    }
    /**
     *
     * Goes back to HomePage
     */
    goBack() {
        this.mealService.emptyCart();
        this.router.navigate(['/tabs/tab1', {}]);
    }
    async viewStatus() {
        const modal = await this.modalController.create({
            component: ModalPagePage,
            componentProps: {isBusket: false, id: this.pageId, oderData: null, showStatus: this.showStatus
            },
        });
        await modal.present();
    }
}
