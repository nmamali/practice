import { Component, OnInit } from '@angular/core';
import {ModalController, NavParams} from '@ionic/angular';

@Component({
  selector: 'app-modal-page',
  templateUrl: './modal-page.page.html',
  styleUrls: ['./modal-page.page.scss'],
})
export class ModalPagePage implements OnInit {
  meal;
  constructor(private modalController: ModalController, public navParams: NavParams) { }

  ngOnInit() {
    this.meal = this.navParams.get('value');
    // console.log(this.meal);
  }
  dismiss(){
    this.modalController.dismiss();
  }

}
