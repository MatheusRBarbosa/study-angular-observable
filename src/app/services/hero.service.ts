import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

import { Observable, of, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { Hero } from '../models/hero';
import { HEROES } from './mock-heroes';
import { MessageService } from './message.service';
import { PokemonMacro } from '../models/pokemonMacro';
import { Pokemon } from '../models/pokemon';
import { ApiConfig } from '../config/api';

@Injectable({ providedIn: 'root' })
export class HeroService {

  private pokemons: Pokemon[];
  private config: ApiConfig;

  constructor(
    private messageService: MessageService, private http: HttpClient
  )
  { 
    this.config = new ApiConfig();
    this.pokemons = [];
  }


  getHeroes(): Observable<Hero[]> {
    // TODO: send the message _after_ fetching the heroes
    this.messageService.add('HeroService: fetched heroes');
    return of(HEROES);
  }

  getHero(id: number): Observable<Hero> {
    // TODO: send the message _after_ fetching the hero
    this.messageService.add(`HeroService: fetched hero id=${id}`);
    return of(HEROES.find(hero => hero.id === id));
  }

  prepareAll(): void {
    this.http.get<PokemonMacro>(`${this.config.baseUrl}/pokemon`)
      .subscribe((macro) => this.getPokemons(macro), this.onError);
  }

  private getPokemons(macro: PokemonMacro): void {
    //TODO: Limitar a quantidade de na requisicao
    // para ir fazendo a requisicao conforme a pagina eh rolada
    for(let id=1; id <= 10; id++){
      this.http.get<Pokemon>(`${this.config.baseUrl}/pokemon/${id}`)
        .pipe(
          catchError( (err:HttpErrorResponse) => {
              return throwError(err);
          })
        )
        .subscribe(this.commit, this.onError);
    }
  }

  private commit(pokemon: Pokemon): void {
    // Escopo o this.pokemons nao ta funcionando..
    if(this.pokemons.length == 0){
      console.log(this.pokemons)
    }
  }

  private onError = error => console.log(`Falha ao tentar ${error.url}`);
}