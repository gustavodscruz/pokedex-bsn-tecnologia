import { SizedResult } from './../../../types/pokemon';
import { Component, OnInit } from '@angular/core';
import { IonItem, IonGrid, IonLabel, IonCol, IonRow, IonContent, IonHeader, IonToolbar, IonTitle } from "@ionic/angular/standalone";
import { PokemonCardComponent } from "../pokemon-card/pokemon-card.component";
import { FavoritesService } from './favorites.service';
import { PokemonService } from 'src/app/services/pokemon.service';
import { IonicStorageModule } from '@ionic/storage-angular';
import { HeaderComponent } from "../header/header.component";

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.scss'],
  imports: [IonTitle, IonToolbar, IonHeader, IonContent, IonGrid, PokemonCardComponent, IonLabel, IonCol, IonRow, IonItem, IonicStorageModule, HeaderComponent],
})
export class FavoritesComponent  implements OnInit {

  favoritos : SizedResult[] = [];


  constructor(
    private favoritesServices : FavoritesService,
    private pokemonService : PokemonService
  ) { 
    this.loadFavorites()
   }

  ngOnInit() {}

  loadFavorites() {
  this.favoritesServices.favorites$.subscribe(favorites => {
    this.favoritos = favorites
      .map(name => {
        const pokemon = this.pokemonService.getCachedPokemon(name);
        if (pokemon) {
          pokemon.isFav = true; // Marque como favorito
        }
        return pokemon;
      })
      .filter((pokemon): pokemon is SizedResult => pokemon !== undefined)
  });
}

}
