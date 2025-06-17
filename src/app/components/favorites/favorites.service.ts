import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { BehaviorSubject } from 'rxjs';
// import { PokemonService } from 'src/app/services/pokemon.service';

@Injectable({
  providedIn: 'root',
})
export class FavoritesService {
  private storage: Storage | null = null;
  private KEY = 'favorites';

  private favoritesSubject = new BehaviorSubject<string[]>([]);
  public favorites$ = this.favoritesSubject.asObservable();

  constructor(
    private storageCtrl: Storage,
    // private pokemonService: PokemonService
  ) {
    this.init();
  }

  async init() {
    const storage = await this.storageCtrl.create();
    this.storage = storage;

    const storedFavorites = (await this.storage.get(this.KEY)) || [];
    this.favoritesSubject.next(storedFavorites);
  }

  private updateFavorites(favorites: string[]) {
    this.favoritesSubject.next(favorites);
    this.storage?.set(this.KEY, favorites);
  }

  async addFavorite(name: string) {
    console.log("Favoritando no serviço!")
    const current = this.favoritesSubject.value;
    if (!current.includes(name)) {
      console.log("Favoritando realmente no serviço !")
      const updated = [...current, name];
      this.updateFavorites(updated);
    }
  }

  async removeFavorite(name: string) {
    const updated = this.favoritesSubject.value.filter((fav) => fav !== name);
    this.updateFavorites(updated);
  }

  // getPokemonObservables() {
  //   return this.favoritesSubject.value.map((name) =>
  //     this.pokemonService.loadPokemonDetails(name)
  //   );
  // }
}
