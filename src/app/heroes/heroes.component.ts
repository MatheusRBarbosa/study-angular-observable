import { Component, OnInit } from '@angular/core';

import { Hero } from '../models/hero';
import { HeroService } from '../services/hero.service';
import { Pokemon } from '../models/pokemon';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit {
  heroes: Hero[];
  pokemons: Pokemon[];

  constructor(private heroService: HeroService) { }

  ngOnInit() {
    this.getHeroes();
    this.getPokemons();
  }

  getHeroes(): void {
    this.heroService.getHeroes()
    .subscribe(heroes => this.heroes = heroes);
  }

  getPokemons(): void {
    this.heroService.getAll()
    .subscribe(pokemons => {
      this.pokemons = pokemons;
      console.log(this.pokemons);
    });
  }
}