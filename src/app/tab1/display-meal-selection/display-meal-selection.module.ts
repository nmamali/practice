import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { IonicSelectableModule } from 'ionic-selectable';

import { IonicModule } from '@ionic/angular';

import { DisplayMealSelectionPage } from './display-meal-selection.page';
import {ModalPagePage} from './modal-page/modal-page.page';
import {MatExpansionModule} from '@angular/material';
import {DragulaModule} from 'ng2-dragula';
import {NgxPaginationModule} from 'ngx-pagination'; // <-- import the module


const routes: Routes = [
  {
    path: '',
    component: DisplayMealSelectionPage
  }
];

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        RouterModule.forChild(routes),
        MatExpansionModule,
        DragulaModule,
        IonicSelectableModule,
        NgxPaginationModule
    ],
  declarations: [DisplayMealSelectionPage, ModalPagePage],
  entryComponents: [ ModalPagePage]

})
export class DisplayMealSelectionPageModule {}
