
function SearchResultsView(props) {
    return (
        <div>
            {props.searchResults.map(renderSearchCB)}
        </div>
    );

    function renderSearchCB(dish) {
        function buttonPressedACB() {
            props.userSearchDish(dish);
            window.location.hash = "#details"; 
        }

        return <span class="searchResult"
        onClick={buttonPressedACB}>
            <img class="myButton" src={"https://spoonacular.com/recipeImages/" + dish.image} height="100"></img>
            <div class="myButton">
                {dish.title}
            </div>
        </span>
    }
}
export default SearchResultsView;