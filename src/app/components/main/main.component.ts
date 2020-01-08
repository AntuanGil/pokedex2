import { Component, OnInit } from '@angular/core';
import { PokemonService } from '../../services/pokemon.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})

export class MainComponent implements OnInit {

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
  
	searchPoke='';
	pokemon=[];
	pokemonBK=[];
	history=[];
	offset=0;
	next=16;
	
constructor(private pokemonService:PokemonService) { 
    this.cargarStorage();
}

ngOnInit() {
    this.getPokemons();
}

cargarStorage(){
    let existe = JSON.parse( localStorage.getItem("history") );
    if(existe === null ){
      localStorage.setItem( "history", JSON.stringify(this.history));
    }else{
      this.history = JSON.parse( localStorage.getItem("history") );
    }
}

getPokemons(){
    this.pokemonService.getPokemon(this.offset,0)
    .subscribe(res =>{
      console.log(res);
      this.pokemon = res;
      this.pokemonBK = this.pokemon;
    });
}
  
getMorePokemons(){
    this.next = this.next + 16;
    this.pokemonService.getPokemon(this.offset,this.next)
    .subscribe(res =>{
      console.log(res);
      this.pokemon = res;
      this.pokemonBK = this.pokemon;
    });
}

setMyStyles(color) {
    let colores = this.typeColor[color];
    let styles = {
      'background-color':`#${colores}`,
      'color':'white',
      'font-size':'Arial'
    };
    return styles;
}
  
detailPokemon(idPoke){
    this.history.push(this.pokemonBK[idPoke-1]);
    localStorage.setItem( "history", JSON.stringify(this.history));
}

search(){
    this.pokemon = this.pokemonBK;
    if(this.searchPoke != ''){
      this.pokemon = this.pokemon.filter(res=>{
        return res.name.toLocaleLowerCase().match(this.searchPoke.toLocaleLowerCase());
      });
    }else if (this.searchPoke == ''){
      this.ngOnInit();
    }
}

searchType(type: string){
    this.pokemon = this.pokemonBK;
    this.pokemon = this.pokemon.filter(res=>{
      return res.types.find(data =>{
        return data.type.name.toLocaleLowerCase().match(type.toLocaleLowerCase());
      });
    });
}

historyPokemon(){ 
    this.cargarStorage();
    return this.pokemon = this.history.reverse().slice(0, 5);
  }
}