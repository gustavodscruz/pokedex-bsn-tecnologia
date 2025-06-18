import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import {
  IonHeader,
  IonSearchbar,
  IonToolbar,
  IonTitle,
  IonButtons,
  IonBackButton,
} from '@ionic/angular/standalone';
import { filter } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  imports: [
    IonBackButton,
    IonButtons,
    IonTitle,
    IonToolbar,
    IonHeader,
    IonSearchbar
  ],
})
export class HeaderComponent implements OnInit {
  title = 'Pokedex';
  isInHome = true;
  constructor(private router: Router) {}

  ngOnInit() {
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => {
        const url = this.router.url;
        if (url.includes('tabs/home')) {
          this.title = 'Pokédex';
          this.isInHome = true;
        } else if (url.includes('favorites')) {
          this.title = 'Favoritos';
          this.isInHome = false;
        } else {
          const parts = url.split('/');
          const pokemonName = parts[parts.length - 1];
          this.title = `Detalhes do ${
            pokemonName.charAt(0).toUpperCase() + pokemonName.slice(1)
          }`;
          this.isInHome = false;
        }
      });
  }
}
