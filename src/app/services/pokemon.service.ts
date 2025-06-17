import { PokemonShorted, SizedResult } from './../../types/pokemon';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, of, shareReplay, tap } from 'rxjs';
import { Pokemon } from 'src/types/pokemon';

@Injectable({
  providedIn: 'root',
})
export class PokemonService {
  private storage!: Storage;
  private pokemonCache = new Map<string, SizedResult>();
  private readonly baseUrl = 'https://pokeapi.co/api/v2/pokemon/';
  private readonly key = 'favorites';

  constructor(private httpClient: HttpClient) {
    this.storage = window.localStorage;
  }

  loadPokemons(url : string) : Observable<PokemonShorted>{
    return this.httpClient.get<PokemonShorted>(url).pipe(
      tap(response => {
        response.results.forEach(poke => {
          const id = poke.url.split('/').filter(Boolean).pop();
          const sizedResult : SizedResult = {
            name: poke.name,
            image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`,
            url : poke.url,
            isFav: false
          };
          this.pokemonCache.set(poke.name, sizedResult);
        });
      })
    )
  }
  
  getCachedPokemon(name : string) : SizedResult | undefined {
    console.log("Trying to use getCachedPokemon method")
    return this.pokemonCache.get(name);
  }

  getAllCachedPokemons() : SizedResult[]{
    return Array.from(this.pokemonCache.values())
  }

  loadPokemonDetails(name: string): Observable<Pokemon | null> {
    return this.httpClient.get<Pokemon>(
      `https://pokeapi.co/api/v2/pokemon/${name}`
    ).pipe(
      catchError(() => of(null)),
      shareReplay(1)
    );
  }
}
