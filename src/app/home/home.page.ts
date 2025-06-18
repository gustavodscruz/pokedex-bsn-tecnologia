import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonLabel,
  IonItem,
  IonRow,
  IonButton,
  IonGrid,
  IonCol,
  IonIcon,
} from '@ionic/angular/standalone';
import { Result, SizedResult } from 'src/types/pokemon';
import { PokemonCardComponent } from '../components/pokemon-card/pokemon-card.component';
import { PokemonService } from '../services/pokemon.service';
import { HeaderComponent } from '../components/header/header.component';
import { PokemonSearchService } from '../services/pokemon-search/pokemon-search.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [
    IonIcon,
    IonCol,
    IonGrid,
    IonButton,
    IonRow,
    IonItem,
    IonLabel,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    FormsModule,
    CommonModule,
    PokemonCardComponent,
    HeaderComponent,
  ],
})
export class HomePage {
  pokemons!: SizedResult[];
  filteredPokemons!: SizedResult[];
  searchTerm: string = '';
  constructor(
    private pokemonService: PokemonService,
    private http: HttpClient,
    private searchService: PokemonSearchService
  ) {
    this.loadPokemons(this.apiUrl);
  }

  apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=20&offset=0';

  nextPageUrl: string | null = null;
  prevPageUrl: string | null = null;

  loadPokemons(url: string) {
    this.pokemonService.loadPokemons(url).subscribe((res) => {
      this.nextPageUrl = res.next;
      this.prevPageUrl = res.previous;
      this.pokemons = res.results.map((poke: Result) => {
        const cached = this.pokemonService.getCachedPokemon(poke.name);
        if (cached) {
          return cached;
        }
        const id = poke.url.split('/').filter(Boolean).pop();
        return {
          name: poke.name,
          image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`,
          url: poke.url,
          isFav: false,
        };
      });
      this.filteredPokemons = this.pokemons;
    });
  }

  onSearch(term: string) {
    this.searchTerm = term;
    if (!term) {
      this.filteredPokemons = this.pokemons;
    } else {
      this.filteredPokemons = this.searchService.search(term);
    }
  }

  nextPage() {
    if (this.nextPageUrl) {
      this.loadPokemons(this.nextPageUrl);
    }
  }

  prevPage() {
    if (this.prevPageUrl) {
      this.loadPokemons(this.prevPageUrl);
    }
  }
}
