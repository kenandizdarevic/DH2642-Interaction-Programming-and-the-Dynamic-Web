import promiseNoData from "../views/promiseNoData";
import SearchFormView from "../views/searchFormView";
import SearchResultsView from "../views/searchResultsView";
import resolvePromise from "../resolvePromise"
import { searchDishes } from "../dishSource"
import React from "react";

export default
function Search(props) {

    const [querys, setSearchQuery]= React.useState("");
    const [types, setSearchType]= React.useState("");
    const [promiseState]= React.useState( {} );
    const [, reRender] = React.useState();
    const [, setCurrentDish]= React.useState();
    const [, searchResults]= React.useState();
    //const [param, searchParams]= React.useState();

    function forceReRenderACB() {
        reRender(new Object());
    }

    if (!promiseState.promise) {
        console.log(" ")
        resolvePromise(searchDishes({}), promiseState, forceReRenderACB);
    }

    function handleTextChangeACB(event) {
        setSearchQuery(event);
    }

    function handleDropDownACB(event) {
        setSearchType(event);
    }

    function pressedSearchACB() {
        resolvePromise(searchDishes({query: querys, type: types}), promiseState, forceReRenderACB);
        forceReRenderACB();
    }

    function setSearchACB(dish) {
        props.model.setCurrentDish(dish.id);
    }
    return (
        <div>
            {<SearchFormView dishTypeOptions={["starter", "main course", "dessert"]} onTextChange = {handleTextChangeACB} 
            dropDown={handleDropDownACB} onSearchButton={pressedSearchACB}/>}
            {promiseNoData(promiseState) || <SearchResultsView searchResults = {promiseState.data} userSearchDish = {setSearchACB}/>}
        </div>
    );
} 
