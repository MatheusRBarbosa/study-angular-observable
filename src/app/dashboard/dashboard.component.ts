import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { Hero } from '../models/hero';
import { Pokemon } from '../models/pokemon';

import { HeroService } from '../services/hero.service';
import { PokemonService } from '../services/pokemon.service';
import { PokemonMacro } from '../models/pokemonMacro';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: [ './dashboard.component.css' ]
})
export class DashboardComponent implements OnInit {
  heroes: Hero[] = [];
  pokemons: Pokemon[] = [];

  constructor(private h: HeroService, private service: PokemonService) { }

  ngOnInit() {
    //this.getHeroes();
    this.prepare();
  }

  getHeroes(): void {
    this.h.getHeroes()
      .subscribe(heroes => this.heroes = heroes.slice(1, 5));
  }

  prepare(): void{
    this.service.getPokemons().subscribe(this.getPokemons, this.onError);
  }

  private getPokemons = (macro: PokemonMacro) => {
    for(let id = 1; id <= macro.count; id++){
      this.service.getPokemon(id)
      .pipe(
        mergeMap(pokemon => this.getPokemon(pokemon))
      )
      .subscribe({error: this.onError})
    }    
  }

  private getPokemon = (pokemon: Pokemon): Observable<Pokemon> => {
    this.pokemons.push(pokemon);
    return of(pokemon);
  }

  private onError = error => console.log(`Falha ao tentar ${error.url}`);
}