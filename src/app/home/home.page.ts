import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonLabel,
  IonItem,
  IonImg, IonRow, IonButton, IonGrid, IonCol, IonCard, IonCardHeader, IonCardTitle, IonIcon } from '@ionic/angular/standalone';
import { Pokemon, PokemonShorted, Result, SizedResult } from 'src/types/pokemon';
import { PokemonCardComponent } from "../components/pokemon-card/pokemon-card.component";

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [IonIcon, IonCardTitle, IonCardHeader, IonCard, IonCol, IonGrid, IonButton, IonRow,
    IonImg,
    IonItem,
    IonLabel,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    FormsModule,
    CommonModule, PokemonCardComponent],
})
export class HomePage {
  http = inject(HttpClient);

  users: any[] = [];

  constructor() {
    this.loadPokemons(this.apiUrl);
  }
  pokemons!: SizedResult[];

  apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=20&offset=0';

  nextPageUrl: string | null = null;
  prevPageUrl: string | null = null;


  loadPokemons(url: string) {
    this.http.get<PokemonShorted>(url).subscribe((res) => {
      this.nextPageUrl = res.next;
      this.prevPageUrl = res.previous;
      this.pokemons = res.results.map((poke: Result) => {
        const id = poke.url.split('/').filter(Boolean).pop();
        return {
          name: poke.name,
          image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`,
          url: poke.url,
          isFav : false
        };
      });
    });
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
