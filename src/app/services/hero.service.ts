import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, of } from 'rxjs';

import { Hero } from '../models/hero';
import { HEROES } from './mock-heroes';
import { MessageService } from './message.service';

import { ApiConfig } from '../config/api';

@Injectable({ providedIn: 'root' })
export class HeroService {

  private config: ApiConfig;

  constructor(
    private messageService: MessageService, private http: HttpClient
  )
  { 
    this.config = new ApiConfig();
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
}