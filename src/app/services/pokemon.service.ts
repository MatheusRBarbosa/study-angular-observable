import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
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

    getPokemons(offset, limit: number = 50): Observable<PokemonMacro> {
        let params = new HttpParams()
            .set('offset', offset.toString())
            .set('limit', limit.toString());

        return this.http.get<PokemonMacro>(`${this.config.baseUrl}/pokemon`, {params});
    }

    getPokemon(url: string): Observable<Pokemon> {
        return this.http.get<Pokemon>(url);
    }

    getSprites(uri: string): Observable<any> {
        return this.http.get<any>(uri);
    }
}