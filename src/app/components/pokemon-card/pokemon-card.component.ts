import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
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
import { PokemonService } from 'src/app/services/pokemon.service';

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
    private router: Router,
    private cdr: ChangeDetectorRef,
    private pokemonService: PokemonService
  ) {}

  ngOnInit() {}

  async toggleFav(pokemon: SizedResult, event?: Event) {
    event?.stopPropagation();
    if (!pokemon.isFav) {
      pokemon.isFav = true;
      this.pokemonService.updateCachedPokemon(pokemon);
      await this.favoritesService.addFavorite(pokemon.name);
    } else {
      pokemon.isFav = false;
      this.pokemonService.updateCachedPokemon(pokemon);
      await this.favoritesService.removeFavorite(pokemon.name);
    }
    this.cdr.detectChanges();
  }

  openPokemonDetails(name: string) {
    if (!name) return;
    this.router.navigate(['/pokemon', name]);
  }
}
