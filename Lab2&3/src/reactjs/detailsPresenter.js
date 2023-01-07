import React from "react";
import DetailsView from "../views/detailsView.js";
import promiseNoData from "../views/promiseNoData";

export default
function Details(props) {

    const [, setNumberOfGuests] = React.useState(props.model.numberOfGuests);
    const [, setDishes] = React.useState(props.model.dishes.filter(checkDishInMenuACB).length>0);
    const [, setPromise] = React.useState();
    const [, setCurrentDishData] = React.useState(props.model.currentDishPromiseState.data);
    const [, setCurrentDishError] = React.useState("");

    function observerACB(){    // no need for payload
        setDishes(props.model.dishes.filter(checkDishInMenuACB).length>0);
        setNumberOfGuests(props.model.numberOfGuests);
        setPromise(props.model.currentDishPromiseState.promise);
        setCurrentDishData(props.model.currentDishPromiseState.data);
        setCurrentDishError(props.model.currentDishPromiseState.error);
    }

    function detailsWasCreatedACB() {
        console.log("Component created!");
        props.model.addObserver(observerACB);
        function isTakenDownACB() {
            console.log("Component is dying!");
            props.model.removeObserver(observerACB);
        }
        return isTakenDownACB;
    }
    React.useEffect(detailsWasCreatedACB, []);

    function addToMenuHandlerACB() {
        props.model.addToMenu(props.model.currentDishPromiseState.data);
    }

    function checkDishInMenuACB(temp) {
        return props.model.currentDish === temp.id;
    }

    return (promiseNoData(props.model.currentDishPromiseState) || <DetailsView dishData = {props.model.currentDishPromiseState.data} 
        isDishInMenu = {props.model.dishes.filter(checkDishInMenuACB).length > 0} guests = {props.model.numberOfGuests} addToMenuACB = {addToMenuHandlerACB} />)
}