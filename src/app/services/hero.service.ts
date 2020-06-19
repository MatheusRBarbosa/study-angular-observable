import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';

import { Hero } from '../models/hero';
import { HEROES } from './mock-heroes';
import { MessageService } from './message.service';
import { PokemonMacro } from '../models/pokemonMacro';
import { Pokemon } from '../models/pokemon';

@Injectable({ providedIn: 'root' })
export class HeroService {

  constructor(private messageService: MessageService, private http: HttpClient) { }

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

  //prepareAll():

  getAll(): Observable<Pokemon[]> {
    return this.http.get<Pokemon[]>(`https://pokeapi.co/api/v2/pokemon/1/`);
  }
}