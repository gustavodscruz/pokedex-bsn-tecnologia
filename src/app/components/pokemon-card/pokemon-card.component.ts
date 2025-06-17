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

  toggleFav(pokemon: SizedResult) {
    pokemon.isFav = !pokemon.isFav;
  }
}
