import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { PokemonMacro } from '../models/pokemonMacro';
import { Pokemon } from '../models/pokemon';
import { ApiConfig } from '../config/api';

@Injectable({ providedIn: 'root' })
export class PokemonService {
    private config: ApiConfig;

    constructor(
        private http: HttpClient
    )
    { 
        this.config = new ApiConfig();
    }

    getPokemons(): Observable<PokemonMacro> {
        return this.http.get<PokemonMacro>(`${this.config.baseUrl}/pokemon`);
    }

    getPokemon(id: number): Observable<Pokemon> {
        return this.http.get<Pokemon>(`${this.config.baseUrl}/pokemon/${id}`)
    }

    getSprites(uri: string): Observable<any>{
        return this.http.get<any>(uri);
    }
}