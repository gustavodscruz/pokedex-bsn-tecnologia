import { PokemonService } from './../../services/pokemon.service';
import { POKEMON_COLOR_TYPES } from './../../../types/pokemon-color-types';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonLabel, IonImg, IonChip, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonButtons, IonBackButton, IonSpinner } from '@ionic/angular/standalone';
import { Pokemon } from 'src/types/pokemon';


@Component({
  selector: 'app-pokemon-page',
  templateUrl: './pokemon-page.component.html',
  styleUrls: ['./pokemon-page.component.scss'],
  imports: [IonSpinner, IonBackButton, IonButtons, IonCardContent, IonCardTitle, IonCardHeader, IonCard, IonChip, IonImg, IonLabel, IonContent, IonHeader, IonToolbar, IonTitle, CommonModule],
})
export class PokemonPageComponent implements OnInit {
  route = inject(ActivatedRoute);
  http = inject(HttpClient);

  name = this.route.snapshot.paramMap.get('name');
  loading = true;

  pokemon!: Pokemon;

  constructor(
    private pokemonService : PokemonService 
  ) {
    this.loadPokemonData()
  }

  

  getTypeColor(type : string) : string {
    return POKEMON_COLOR_TYPES[type as keyof typeof POKEMON_COLOR_TYPES ] || '#777777';
  }

  private loadPokemonData() {
    if (this.name) {
      this.loading = true;
      this.pokemonService.loadPokemonDetails(this.name).subscribe({
        next: (value) => {
          if (value) {
            this.pokemon = value;
          }
        },
        error: (error) => {
          console.error('Error loading pokemon:', error);
        },
        complete: () => {
          this.loading = false;
        }
      });
    }
  }

  ngOnInit() {}
}
