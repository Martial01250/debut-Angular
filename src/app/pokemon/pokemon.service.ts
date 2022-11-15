import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, of, tap } from 'rxjs';
import { Pokemon } from './pokemon';

@Injectable()
export class PokemonService {

  constructor(private http: HttpClient){

  }

  getPokemonList(): Observable<Pokemon[]> {
    return this.http.get<Pokemon[]>('api/pokemons').pipe(
      tap((response) => this.log(response)),
      catchError((error)=>this.handelError(error, []))
    );
  }

  getPokemonById(pokemonId: number): Observable<Pokemon|undefined> {
    return this.http.get<Pokemon>(`api/pokemons/${pokemonId}`).pipe(
      tap((response)=> this.log(response)),
      catchError((error)=>this.handelError(error, undefined))
    );
  }

  updatePokemon(pokemon: Pokemon): Observable<null> {
    const HttpOptions = {
      Headers: new HttpHeaders ({'Content-Type': 'application/json'})
    };

    return this.http.put(`api/pokemons`, pokemon).pipe(
      tap((response) => this.log(response)),
      catchError((error)=> this.handelError(error, null))
    );
  }

  deletePokemonById(pokemonId: number): Observable<null>{
    return this.http.delete(`api/pokemons/${pokemonId}`).pipe(
      tap((response) => this.log(response)),
      catchError((error)=> this.handelError(error, null))
    );
  }

  addPokemon(pokemon: Pokemon): Observable<Pokemon>{
    const HttpOptions = {
      Headers: new HttpHeaders ({'Content-Type': 'application/json'})
    };

    return this.http.post<Pokemon>('api/pokemons', pokemon).pipe(
      tap((response) => this.log(response)),
      catchError((error)=> this.handelError(error, null))
    );
  }

  searchPokemonList(term: string): Observable<Pokemon[]>{
    if(term.length <= 1){
      return of([])
    }

    return this.http.get<Pokemon[]>(`api/pokemons/?name=${term}`).pipe(
      tap((response) => this.log(response)),
      catchError((error)=> this.handelError(error, []))
    );
  }

  private log(response: any ) {
    console.table(response);
  }

  private handelError(error: Error, errorValue: any){
    console.error(error);
    return of(errorValue);
  }

  pokemonTypeList():string[] {
    return ['Plante',
     'Feu',
      'Insecte',
      'Normal',
      'Electrik',
      'Poison',
      'Fée',
      'Vol',
      'Combat',
      'Psy'
    ];
  } 
}
