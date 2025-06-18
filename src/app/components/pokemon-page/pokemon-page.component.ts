import { PokemonService } from './../../services/pokemon.service';
import { POKEMON_COLOR_TYPES, STATUS_COLORS } from './../../../types/pokemon-color-types';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonLabel,
  IonImg,
  IonChip,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonButtons,
  IonBackButton,
  IonSpinner, IonRow } from '@ionic/angular/standalone';
import { Pokemon } from 'src/types/pokemon';
import { HeaderComponent } from '../header/header.component';

@Component({
  selector: 'app-pokemon-page',
  templateUrl: './pokemon-page.component.html',
  styleUrls: ['./pokemon-page.component.scss'],
  imports: [IonRow, 
    IonSpinner,
    IonBackButton,
    IonButtons,
    IonCardContent,
    IonCardTitle,
    IonCardHeader,
    IonCard,
    IonChip,
    IonImg,
    IonLabel,
    IonContent,
    IonHeader,
    IonToolbar,
    IonTitle,
    CommonModule,
    HeaderComponent,
  ],
})
export class PokemonPageComponent implements OnInit {
  name = this.route.snapshot.paramMap.get('name');
  loading = true;

  pokemon!: Pokemon;

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private pokemonService: PokemonService
  ) {
    this.loadPokemonData();
  }

  getTypeColor(type: string): string {
    return (
      POKEMON_COLOR_TYPES[type as keyof typeof POKEMON_COLOR_TYPES] || '#777777'
    );
  }

  private loadPokemonData() {
    if (this.name) {
      this.loading = true;
      this.pokemonService.loadPokemonDetails(this.name).subscribe({
        next: (value) => {
          if (value) {
            this.pokemon = value;
            console.log(this.pokemon);
          }
        },
        error: (error) => {
          console.error('Error loading pokemon:', error);
        },
        complete: () => {
          this.loading = false;
        },
      });
    }
  }

  convertDecimetersToMeters(decimeters: number) {
    return decimeters / 10;
  }

  convertHectogramsToKilograms(hectograms: number) {
    return hectograms / 10;
  }

  formatPokemonId(id: number): string {
    const idStr = id.toString();
    return idStr.length > 3 ? idStr : idStr.padStart(3, '0');
  }

  convertToPascalCase(nerdCaps : string){
    const lista = nerdCaps.split('-')
    return lista.join(' ')
  }

  getColorOfStat(statName : string){
    return (
      STATUS_COLORS[statName as keyof typeof STATUS_COLORS] || "#777777"
    );
  }

  ngOnInit() {}
}
