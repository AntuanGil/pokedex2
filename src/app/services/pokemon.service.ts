import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class PokemonService {

  URL_API = 'https://pokeapi.co/api/v2';
  URL_IAMGE = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/';
  limit=16;
  constructor(private http: HttpClient ){}

  getPokemon(offset,next){
    return this.http.get(`${this.URL_API}/pokemon?offset=${offset}&&limit=${this.limit + next }`).pipe(
      map(result => {
        return result['results'];
      }),
      map(pokemons =>{
        return pokemons.map((poke, index)=>{
          poke.image = this.getPokemonImg(index + offset + 1 );
          poke._id = offset + index + 1;
          this.getDEtailPokemon(poke._id).subscribe(res=>{
            poke.types = res['types'];
          });
          this.getEvolutionChain(poke._id).subscribe(res=>{
            poke.evolutionChain = res['evolution_chain'].url.split('/').reverse()[1];
          })
          return poke;
        });
      })
    )
  }

  getPokemonImg(index){
    return `${this.URL_IAMGE}${index}.png`;
  }

  getDEtailPokemon(index){
    return this.http.get(`${this.URL_API}/pokemon/${index}`);
  }

  getEvolutionChain(index){
    return this.http.get(`${this.URL_API}/pokemon-species/${index}`);
  }

  evolutionOne(index){
    return this.http.get(`${this.URL_API}/evolution-chain/${index}`).pipe(
      map(result =>{
        return result['chain'].species;
      }),
      map( evol1 =>{
        let _id = evol1.url.split('/').reverse()[1];
        let evolution1 = {
          _id: _id,
          name: evol1.name,
          image: this.getPokemonImg(_id)
        };
        return evolution1;
      })
    )
  }

  evolutionTwo(index){
    return this.http.get(`${this.URL_API}/evolution-chain/${index}`).pipe(
      map(result =>{
        return result['chain'].evolves_to[0].species;
      }),
      map( evol2 =>{
        let _id = evol2.url.split('/').reverse()[1];
        let evolution1 = {
          _id: _id,
          name: evol2.name,
          image: this.getPokemonImg(_id)
        };
        return evolution1;
      })
    )
  }

  evolutionThree(index){
    return this.http.get(`${this.URL_API}/evolution-chain/${index}`).pipe(
      map(result =>{
        return result['chain'].evolves_to[0].evolves_to[0].species;
      }),
      map( evol3 =>{
        let _id = evol3.url.split('/').reverse()[1];
        let evolution1 = {
          _id: _id,
          name: evol3.name,
          image: this.getPokemonImg(_id)
        };
        return evolution1;
      })
    )
  }
}

