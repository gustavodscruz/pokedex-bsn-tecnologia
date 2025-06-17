import { Component, inject, Input, OnInit } from '@angular/core';
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
  constructor() {}

  ngOnInit() {}

  router = inject(Router)

  toggleFav(pokemon: SizedResult) {
    pokemon.isFav = !pokemon.isFav;
  }

  openPokemonDetails(name : string){
    if (!name) return;
    this.router.navigate(['/pokemon', name])
  }
}
