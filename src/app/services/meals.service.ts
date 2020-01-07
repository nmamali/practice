import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MealsService {
  public meals = [{
    id: 0,
    url: 'https://sethlui.com/wp-content/uploads/2013/10/singapore-food-05058016.jpg',
    title: ' Eggs and vegitable'

  },
    {
      id: 1,
      url: 'https://static.independent.co.uk/s3fs-public/thumbnails/image/2019/04/26/09/mcdonalds-bigvegants.jpg',
      title: 'Beef Burger'
    }
  ];

  public mealsCatergory = [
    {
      id: 1,
      url: 'https://www.mychadwicks.com/wp-content/uploads/2018/12/lunch-046.jpg',
      title: 'Lunch'
    },
    {
      id: 0,
      url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSo-XCk99kY7labp2ZbzLuTis_1BHvZxJMCOvm6BpCbvu4u3_B3Vg',
      title: 'BreakFast'

    },
    {
      // tslint:disable-next-line:max-line-length
      id: 2,
      url: 'https://www.vegetariantimes.com/.image/t_share/MTQ3MDM3MzQ5NjA2MzM2NDA3/zi3000-shutterstock-buddha-bowl.jpg',
      title: 'Stater'
    },
    {
      id: 3,
      // tslint:disable-next-line:max-line-length
      url: 'https://i.cbc.ca/1.3804826.1476454194!/fileImage/httpImage/image.jpg_gen/derivatives/16x9_780/one-pan-egyptian-chicken-dinner.jpg',
      title: 'Dinner'
    },
    {
      id: 4,
      url: 'https://iambaker.net/wp-content/uploads/2018/08/piggy-dessertBLOG.jpg',
      title: 'Dessert'
    },
    {
      id: 5,
      // tslint:disable-next-line:max-line-length
      url: 'data:image/jpeg;base64,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',
      title: 'Drinks'
    }
  ];

  allMealls
  public allMealls = [{
    id: 0,
    imgUrl: 'https://i0.wp.com/brightestyoungthings.com/wp-content/uploads/2017/03/breakfast-guide.jpg?fit=750%2C500&quality=100&ssl=1',
    name: 'Sunrise',
    description: 'eggs and becon',
    price: 35,
    quantity: 1,
    isPopular: 1,
    preparationDuration: 50,
    catergoryId: 0,
    isAvailable: 1,
    mealType: null
  },
    {
      id: 1,
      imgUrl: 'https://www.bbcgoodfood.com/sites/default/files/recipe-collections/collection-image/2018/02/noodles.jpg',
      name: 'The Champion',
      description: 'Vegitables with potato and onions rings',
      price: 35,
      quantity: 1,
      isPopular: 1,
      preparationDuration: 40,
      catergoryId: 1,
      mealType: 'vegiterian',
      onSpecial: true,
      isAvailable: 1
    },
    {
      // tslint:disable-next-line:max-line-length
      id: 2,
      imgUrl: 'https://www.vegetariantimes.com/.image/t_share/MTQ3MDM3MzQ5NjA2MzM2NDA3/zi3000-shutterstock-buddha-bowl.jpg',
      name: 'Grilled Salad',
      description: ' Chipotle Chickpea Taco Bowls ',
      price: 35,
      quantity: 1,
      isPopular: 1,
      preparationDuration: 10,
      catergoryId: 2,
      mealType: 'vegiterian',
      onSpecial: true,
      isAvailable: 1

    },
    {
      id: 3,
      // tslint:disable-next-line:max-line-length
      imgUrl: 'https://i.cbc.ca/1.3804826.1476454194!/fileImage/httpImage/image.jpg_gen/derivatives/16x9_780/one-pan-egyptian-chicken-dinner.jpg',
      name: 'Fried Hake',
      description: 'Fried hake with medium chips',
      price: 35,
      quantity: 1,
      isPopular: 1,
      preparationDuration: 20,
      catergoryId: 3,
      mealType: null,
      onSpecial: true,
      isAvailable: 0


    },
    {
      id: 4,
      imgUrl: 'https://iambaker.net/wp-content/uploads/2018/08/piggy-dessertBLOG.jpg',
      name: 'Cheesecake',
      description: 'With mixed berry colius',
      price: 35,
      quantity: 1,
      isPopular: 1,
      preparationDuration: 30,
      catergoryId: 4,
      mealType: null,
      onSpecial: false,
      isAvailable: 1


    },
    {
      id: 5,
      // tslint:disable-next-line:max-line-length
      imgUrl: 'https://amp.insider.com/images/5b7fcbe73cccd11a008b462d-750-562.jpg',
      name: 'Cocktails',
      description: 'With cream and Ice',
      price: 35,
      quantity: 1,
      isPopular: 1,
      preparationDuration: 5,
      catergoryId: 5,
      mealType: null,
      onSpecial: true,
      isAvailable: 0


    }
  ];
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
      time: 'Less than 1 hour',
      minValue: 31,
      maxValue: 60
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


  public indridients = [
    {id: 0, name: 'Pepperoni', color: 'primary', imgUrl: 'https://cdnprod.mafretailproxy.com/cdn-cgi/image/format=auto,onerror=redirect/sys-master-prod/h52/hb4/8950304604190/287748_main.jpg_480Wx480H', description: null},
    {id: 1, name: 'Sausage', color: 'primary', imgUrl: 'https://honest-food.net/wp-content/uploads/2009/09/toulouse-duck-sausage1-320x248.jpg' , description: null},
    {id: 2, name: 'Mushroom', color: 'primary', imgUrl: 'data:image/jpeg;base64,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', description: null},
    {id: 3, name: 'Beef', color: 'primary', imgUrl: 'https://cdnprod.mafretailproxy.com/cdn-cgi/image/format=auto,onerror=redirect/sys-master-prod/h3b/hfe/9010199429150/68990_main.jpg_480Wx480H', description: null },
    {id: 0, name: 'Becon', color: 'primary', imgUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTkOGCf8IjBAbVQqUWWaFqGJ0iXGUh4Oi6WSlqDYI6k9wAE6hJd', description: null },
    {id: 1, name: 'Tomato', color: 'primary', imgUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT6MpfzqEitKP8mGw7vejjG3HDqUsAJPmiyJjI6Nr78Ywt3bLz-iw', description: null }

  ];
  public cart = [];

  public extras = [
    {id: 1, name: 'Pepperoni', isChecked: false, extraPrice: 10, mealId: 1},
    {id: 2, name: 'Sausage', isChecked: false , extraPrice: 5, mealId: 1},
    {id: 3, name: 'Mushroom', isChecked: false, extraPrice: 20, mealId: 1}
  ];
  constructor( public httpClient: HttpClient) {
  }
  public getAllMeals() {
    return this.httpClient.get('http://localhost:8080/meals')
  }
  public getEstimatedTime() {
    return this.extimatedTime;
  }
  public getPriceRage() {
    return this.prices;
  }
  /**
   * returns the all meals on special
   */
  // getAllMeals() {
  //   // spread Operator, return the copy not the actual object
  //   return this.meals;
  // }
  /**
   * spread operator works exactly the same as clone
   * returns specific meal on special
   */
  getMealById(mealId: number) {
    return {
      ...this.meals.find(meal => {
        return meal.id === mealId;
      })
    };
  }
  getAllMealCatergory() {
    return this.mealsCatergory;

  }
  getAllMeal() {
    return this.allMealls;

  }
  getAllindridients() {
    return this.indridients;
  }
  getAllMealsByCatergoryId(catergoryId: any) {
    const filteredMeal = [];
    for ( let i = 0; i < this.allMealls.length; i++) {
      if (this.allMealls[i].catergoryId == catergoryId) {
        filteredMeal.push(this.allMealls[i]);
      }
    }
    return filteredMeal;
  }
  getMealCatergoryById(mealId: number) {
    return {
      ...this.mealsCatergory.find(meal => {
        return Number(meal.id ) === Number(mealId);
      })
    };
  }

  addTocard(cartdata) {
    this.cart.push(cartdata);
  }
  getCart() {
    return this.cart;
  }
  emptyCart() {
    this.cart = [];
  }

  /**
   * Generate uniqueID
   * @param length
   */
  makeid(length) {
    let result           = '';
    const characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    for ( let i = 0; i < length; i++ ) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }

  getAllMealsOnspecial() {
    const filteredMeal = [];
    console.log(this.allMealls);
    for ( let i = 0; i < this.allMealls.length; i++) {
      if (this.allMealls[i].onSpecial == true) {
        filteredMeal.push(this.allMealls[i]);
      }
    }
    return filteredMeal;
  }

  /**
   * Removes the elemet from array
   * @param array
   * @param value
   */
  removeElementFromArray(array, value) {
    return array.filter(function(ele) {
      return ele !== value;
    });

  }
  /**
   * return extras for that meal
   * @param mealId
   */
  getExtrasByMealId() {
    return this.extras;
  }

  deleteFromCart(value) {
    this.cart = this.removeElementFromArray(this.cart, value);
  }
}

