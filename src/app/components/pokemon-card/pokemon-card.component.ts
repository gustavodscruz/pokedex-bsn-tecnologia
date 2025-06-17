import { Component, Input, OnInit } from '@angular/core';
import { SizedResult } from 'src/types/pokemon';
import {
  IonImg,
  IonIcon,
  IonCard,
  IonButton,
  IonCardHeader,
  IonCardTitle,
} from '@ionic/angular/standalone';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FavoritesService } from '../favorites/favorites.service';

@Component({
  selector: 'app-pokemon-card',
  templateUrl: './pokemon-card.component.html',
  styleUrls: ['./pokemon-card.component.scss'],
  imports: [
    IonCardTitle,
    IonCard,
    IonImg,
    IonButton,
    IonCardHeader,
    IonIcon,
    CommonModule,
  ],
})
export class PokemonCardComponent implements OnInit {
  @Input() pokemon!: SizedResult;
  constructor(
    private favoritesService: FavoritesService,
    private router: Router
  ) {}

  ngOnInit() {}

  async toggleFav(pokemon: SizedResult) {
    console.log("Estou tentando favoritar (ou nao) esse pokemon!")
    if (!pokemon.isFav) {
      console.log("Estou tentando favoritar!")
      await this.favoritesService.addFavorite(pokemon.name);
      pokemon.isFav = !pokemon.isFav;
    } else {
      this.favoritesService.removeFavorite(pokemon.name);
      pokemon.isFav = !pokemon.isFav;
    }
  }

  openPokemonDetails(name: string) {
    if (!name) return;
    this.router.navigate(['/pokemon', name]);
  }
}
