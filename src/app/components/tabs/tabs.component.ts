import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { IonTab, IonTabs, IonTabButton, IonIcon, IonTabBar, IonLabel, IonRouterOutlet, IonContent, IonHeader, IonToolbar, IonTitle } from "@ionic/angular/standalone";
import { HomePage } from "../../home/home.page";
import { FavoritesComponent } from "../favorites/favorites.component";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.scss'],
  imports: [IonTitle, IonToolbar, IonHeader, IonContent, IonRouterOutlet, IonIcon, IonTabButton, IonTabs, IonTabBar, IonLabel, RouterModule, HomePage, FavoritesComponent, CommonModule]
})
export class TabsComponent  implements OnInit {
  selectedTab: 'home' | 'favorites' = 'home';
  constructor() { }

  ngOnInit() {}

}
