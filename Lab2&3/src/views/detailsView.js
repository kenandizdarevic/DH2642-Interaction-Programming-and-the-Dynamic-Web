import SearchResultsView from "./searchResultsView";
import { searchDishes } from "../dishSource";

function DetailsView(props) {

    return (
        <div class="myMargin">

            <h2>{props.dishData.title}</h2>
            <div class="myMargin">
              <div class="myPrice"><img src={props.dishData.image} height="75"></img></div>
              <div class="myPrice">
                <tr><strong>Price: </strong> {props.dishData.pricePerServing} $</tr>
                <tr><strong>Price for {props.guests} guests: </strong> {(props.dishData.pricePerServing * props.guests).toFixed(2)} $</tr>
              </div>
            </div>

            <div class="myPrice">
                {props.dishData.extendedIngredients.map(renderIngredientsCB)}
            </div>

            <div class="myPrice">
                {props.dishData.instructions}
            </div>
           <strong> <a class="myMargin" href={props.dishData.sourceUrl}>More info</a> </strong>
        
           <div>
                <button class="myButton" onClick={onAddToMenu} disabled={disableButtonACB(props)}>Add to menu! </button>
                <button class="myButton" onClick={toSearchViewACB}>Cancel</button>
            </div>
        </div>
    );

    function onAddToMenu() {
      props.addToMenuACB();
      window.location.hash = "#search";
    }

    function toSearchViewACB() {
      window.location.hash = "#search"; 
    }
    
    function renderIngredientsCB(ingredients) {
      return <div key={ingredients.name}>
        <strong>{ingredients.name}:</strong>
        {ingredients.amount}
        {ingredients.unit}
      </div>;
    }

    function disableButtonACB(dish) {
        return dish.isDishInMenu;
    }
}

export default DetailsView;
