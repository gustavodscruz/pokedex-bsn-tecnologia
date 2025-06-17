import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, of, shareReplay } from 'rxjs';
import { Pokemon } from 'src/types/pokemon';

@Injectable({
  providedIn: 'root',
})
export class PokemonService {
  private storage!: Storage;
  private readonly key = 'favorites';
  pokemon!: Pokemon;

  constructor(private httpClient: HttpClient) {
    this.storage = window.localStorage;
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
