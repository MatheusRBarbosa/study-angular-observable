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

  arrayColors = {
    normal: '#f3b683',
    fighting: '#fd6969',
    flying:  '#998eff',
    poison: '#7e1470',
    ground: '#5f4017',
    rock: '#818181',
    bug: '#72aa29',
    ghost: '#57138f',
    steel: '#d0caeb',
    fire: '#ff812d',
    water: '#5c50ff',
    grass: '#c2fa78',
    electric: '#ffe600',
    psychic: '#f7bbff',
    ice: '#299baa',
    dragon: '#410808',
    dark: '#333333',
    fairy: '#ff65ea',
    unknown: '',
    shadow: '#250521'
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
    
    const coloredPokemon: string[] = this.findTypeColor(this.arrayColors, pokemon);
    pokemon.color = this.createColor(coloredPokemon);
    this.pokemons.push(pokemon);
    return of(pokemon);
  }

  // Retorna as cores do pokemon
  private findTypeColor = (arrayColors, pokemon: Pokemon): string[] => {
    const colorTypes: string[] = Object.keys(arrayColors);
    const coloredPokemon: string[] = [];

    for(let colorType of colorTypes) {
      for(let type of pokemon.types ){
        if(colorType == type.type.name){
          coloredPokemon.push(arrayColors[colorType]);
        }
      }
    }
    return coloredPokemon;
  } 

  private createColor = (coloredPokemon: string[]): string => {
    let bg: string = `linear-gradient(90deg, ${coloredPokemon[0]} 50%, ${coloredPokemon[0]} 50%)`;

    if(coloredPokemon.length > 1){
      bg = `linear-gradient(90deg, ${coloredPokemon[0]} 50%, ${coloredPokemon[1]} 50%)`;
    }

    return bg;
  }

  private onError = error => console.log(`Falha ao tentar ${error.url}`);
}