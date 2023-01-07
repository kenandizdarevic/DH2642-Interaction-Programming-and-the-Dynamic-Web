import promiseNoData from "../views/promiseNoData";
import SearchFormView from "../views/searchFormView";
import SearchResultsView from "../views/searchResultsView";


export default
function Search(props) {

    if (!props.model.searchResultsPromiseState.promise) {
        props.model.doSearch({});
    }


    function handleTextChangeACB(text) {
        props.model.setSearchQuery(text);
    }

    function handleDropDownACB(choice) {
        props.model.setSearchType(choice);
    }

    function pressedSearchACB() {
        props.model.doSearch(props.model.searchParams);
    }

    function setSearchACB(dish) {
        props.model.setCurrentDish(dish.id);
    }

    return (
        <div>
            {<SearchFormView dishTypeOptions={["starter", "main course", "dessert"]} onTextChange = {handleTextChangeACB} 
            dropDown={handleDropDownACB} onSearchButton={pressedSearchACB}/>}
            {promiseNoData(props.model.searchResultsPromiseState) || <SearchResultsView searchResults={props.model.searchResultsPromiseState.data} userSearchDish={setSearchACB}/>}
        </div>
    );
}
