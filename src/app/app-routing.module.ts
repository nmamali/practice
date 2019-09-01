import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  },
  { path: 'display-meal-selection', loadChildren: './tab1/display-meal-selection/display-meal-selection.module#DisplayMealSelectionPageModule' },
  { path: 'modal-page', loadChildren: './tab1/modal-page/modal-page.module#ModalPagePageModule' }
  ];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
