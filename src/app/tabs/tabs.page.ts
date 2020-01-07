import { Component } from '@angular/core';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage {
  // creating menu layout for later use
  public appMenu = [
    {title: 'Home', url: '/home', icon: 'list'},
    {title: 'MenuA', url: '/home', icon: 'add'},
    {title: 'MenueB', url: '/home', icon: 'trash'}
  ];
  constructor() {}

}
