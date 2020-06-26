import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { Pokemon } from '../models/pokemon';

import { PokemonService } from '../services/pokemon.service';
import { PokemonMacro } from '../models/pokemonMacro';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: [ './dashboard.component.css', './types.css' ]
})
export class DashboardComponent implements OnInit {
  pokemons: Pokemon[] = [];

  pokemonCount: number = 0;
  readonly _offsetParser = 50;
  offset: number = 0;
  limit: number = 50;

  throttle = 300;
  scrollDistance = 1;
  alwaysCallback = true;

  constructor(private service: PokemonService) {}

  ngOnInit() {
    this.preparePokemons(this.offset);
  }

  preparePokemons = (offset: number): void => {
    this.service.getPokemons(offset).subscribe(this.getPokemons, this.onError);
  }

  onScrollDown = () => {
    this.offset += this._offsetParser;
    this.preparePokemons(this.offset);
    console.log(this.offset)
  }

  private getPokemons = (macro: PokemonMacro) => {
    if(this.alwaysCallback){
      for(let i = 0; i < macro.results.length; i++) {
        this.service.getPokemon(macro.results[i].url)
        .pipe(
          mergeMap(pokemon => this.getPokemon(pokemon))
        )
        .subscribe({error: this.onError})
      }
      if(this.offset >= macro.count){
        this.alwaysCallback = false;
      }    
    }
  }

  private getPokemon = (pokemon: Pokemon): Observable<Pokemon> => {
    this.pokemons.push(pokemon);
    return of(pokemon);
  }

  private onError = error => console.log(`Falha ao tentar ${error.url}`);
}