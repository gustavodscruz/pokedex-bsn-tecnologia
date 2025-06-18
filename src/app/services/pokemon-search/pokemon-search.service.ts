import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PokemonShorted, Result, SizedResult } from 'src/types/pokemon';
import { PokemonService } from '../pokemon.service';

@Injectable({
  providedIn: 'root',
})
export class PokemonSearchService {
  private localPokemons!: Result[];
  constructor(
    private httpClient: HttpClient,
    private cacheService: PokemonService
  ) {
    this.loadPokemons();
  }

  private loadPokemons() {
    this.httpClient
      .get<PokemonShorted>('assets/pokemons.json')
      .subscribe((data: PokemonShorted) => (this.localPokemons = data.results));
  }

  search(term: string): SizedResult[] {
    if (!term.trim()) return [];
    const lower = term.toLowerCase();
    return this.localPokemons
      .filter((p) => p.name.includes(lower))
      .map((poke) => {
        const id = poke.url.split('/').filter(Boolean).pop();
        const sizedResult: SizedResult = {
          name: poke.name,
          url: poke.url,
          image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`,
          isFav: this.cacheService.getCachedPokemon(poke.name)?.isFav ?? false,
        };
        this.cacheService.updateCachedPokemon(sizedResult); // adiciona ao cache
        return sizedResult;
      });
  }
}
