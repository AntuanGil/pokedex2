import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PokemonService } from '../../services/pokemon.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {
  typeColor = {
    bug: 'B1C12E',
    dark: '4F3A2D',
    dragon: '755EDF',
    electric: 'FCBC17',
    fairy: 'F4B1F4',
    fighting: '823551D',
    fire: 'E73B0C',
    flying: 'A3B3F7',
    ghost: '6060B2',
    grass: '74C236',
    ground: 'D3B357',
    ice: 'A3E7FD',
    normal: 'C8C4BC',
    poison: '934594',
    psychic: 'ED4882',
    rock: 'B9A156',
    steel: 'B5B5C3',
    water: '3295F6'
  };
  pokemon:any;
  evolution:any;
  _id = this.rutaActiva.snapshot.params.id;
  chain = this.rutaActiva.snapshot.params.chain;
  URL_IAMGE = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/';
  EvolutionChain=[];

  constructor(private rutaActiva: ActivatedRoute,
   private pokemonService:PokemonService) {
    this.evolutionOne();
    this.pokemonService.getDEtailPokemon(this._id)
    .subscribe( res =>{
      console.log(res);
      return this.pokemon = res;
    });
  }

  ngOnInit() {
  }
 
  setMyStyles(color) {
    let colores = this.typeColor[color];
    let styles = {
      'background-color':`#${colores}`,
      'color':'white',
      'font-size':'1rem'
    };
    return styles;
  }

  evolutionOne(){
    this.pokemonService.evolutionOne(this.chain)
    .subscribe( evol1 =>{
      this.EvolutionChain[0]= evol1;
    });

    this.pokemonService.evolutionTwo(this.chain)
    .subscribe( evol2 =>{
      this.EvolutionChain[1]= evol2;
    });

    this.EvolutionChain[2]=this.pokemonService.evolutionThree(this.chain)
    .subscribe( evol3 =>{
      this.EvolutionChain[2]= evol3;
    });
  }
}