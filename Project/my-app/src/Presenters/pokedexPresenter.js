import React, { useEffect } from "react";
import PokedexView from '../Views/pokedexView';
import SearchView from "../Views/searchView";
import {fetchPokemonDetails, getPokemonList, getPokeDetailsFromURL} from '../pokemonSource';
import PokemonDetails from '../Views/pokemonDetailsView';
import axios from "axios";
import { bigPromise } from "../pokemonSource";
// import LoadingIndicator from "../Views/loadingView";
import { trackPromise } from 'react-promise-tracker';
import { usePromiseTracker } from "react-promise-tracker";

function Pokedex() {

  const [isLoadingData, setLoadingData] = React.useState(true)
  const [pokeData, setPokeData] = React.useState([]);//
  const [search, setSearch] = React.useState('');
  const [pokeDetails, setPokemonDetails] = React.useState();

  const [nextPage, setNextPage] = React.useState();
  const [previousPage, setPreviousPage] = React.useState();
  const { promiseInProgress } = usePromiseTracker();

  function searchPokemonACB(pokemonSearched) {setSearch(pokemonSearched);}

  async function getPokemon() {
    if(search === "") return setPokemonDetails("Not Found");
    const response = await trackPromise(fetchPokemonDetails(search.toLowerCase()))

    setPokemonDetails(response.data)
    
  }

  function pokeUndefined(poke) {
    if(!poke) {
      return <div></div>
    }
  }
  
  function pokemonTBR() {setPokemonDetails(null)}
  function pokemonPressed(pokemon) {setPokemonDetails(pokemon)}

  async function nextPrevPokemon(param) {
    const response = await bigPromise(param === 1 ? nextPage : previousPage)
    setPokeData(await response[0])
    setNextPage(response[1])
    setPreviousPage(response[2])
  }

  useEffect(() => {
    async function setup() {
      const response = await bigPromise("https://pokeapi.co/api/v2/pokemon")
      setPokeData(await response[0])
      setNextPage(response[1])
      setPreviousPage(response[2])
    }
    setup()
  }, []);

  return (
      <div className="pokeDexView">
          {!pokeUndefined(pokeDetails) || <div className ="viewBorder">
            {<PokedexView pokemon = {pokeData} setPokeDetail={pokemonPressed} isloadingData = {isLoadingData}/>}
            <SearchView  next = {nextPage} prev = {previousPage} nextPokemon = {nextPrevPokemon} previousPokemon = {nextPrevPokemon} 
              searchPokemon ={searchPokemonACB} findPokemon={getPokemon} setSearch={() => {setSearch('')}}/>
          </div>}
            { pokeUndefined(pokeDetails) || <PokemonDetails removeDTV={pokemonTBR} pokemon = {pokeDetails} promiseInProgress={promiseInProgress}/>}
      </div>
    );
}

export default Pokedex;

