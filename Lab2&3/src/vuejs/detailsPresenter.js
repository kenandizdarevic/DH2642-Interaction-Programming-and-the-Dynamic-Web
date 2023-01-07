import DetailsView from "../views/detailsView.js";
import promiseNoData from "../views/promiseNoData";

export default
function Details(props) {
    
    function addToMenuHandlerACB() {
        props.model.addToMenu(props.model.currentDishPromiseState.data);
    }

    function checkDishInMenuACB(temp) {
        return props.model.currentDish === temp.id;
    }

    return (promiseNoData(props.model.currentDishPromiseState) || <DetailsView dishData = {props.model.currentDishPromiseState.data} 
        isDishInMenu = {props.model.dishes.filter(checkDishInMenuACB).length > 0} guests = {props.model.numberOfGuests} addToMenuACB = {addToMenuHandlerACB} />)
}