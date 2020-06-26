import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { Pokemon } from '../models/pokemon';
import { Type } from '../models/type';

import { PokemonService } from '../services/pokemon.service';
import { PokemonMacro } from '../models/pokemonMacro';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: [ './dashboard.component.css', './types.css' ]
})
export class DashboardComponent implements OnInit {
  pokemons: Pokemon[] = [];

  arrayColors = {
    normal: '#f3b683',
    fighting: '#fd6969',
    flying:  '998eff'
  }

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
    
    this.findTypeColor(this.arrayColors, pokemon);
    this.pokemons.push(pokemon);
    return of(pokemon);
  }

  // Retorna as cores do pokemon
  private findTypeColor = (arrayColors, pokemon: Pokemon) => {
    const colorTypes: string[] = Object.keys(arrayColors);
    let colors: string[] = [];

    for(let colorType of colorTypes){
      for(let type of pokemon.types ){
        if(colorType == type.type.name){
          colors.push(arrayColors[colorType])
        }
      }
    }

    return colors;
  } 

  // Todo: fazer metodo que captura o array de cores e cria a classe css

  private onError = error => console.log(`Falha ao tentar ${error.url}`);
}