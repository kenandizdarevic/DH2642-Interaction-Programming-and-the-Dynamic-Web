import SummaryView from "../views/summaryView.js";
import { shoppingList } from "../utilities.js";
import React from "react";

export default
function Summary(props){
    
    const [number, setNumberOfGuests]= React.useState();
    const [dishes, setDishes]= React.useState();

    function observerACB() {
        setNumberOfGuests(props.model.numberOfGuests);
        setDishes(props.model.dishes)
    }

    function summaryWasCreatedACB() {
        console.log("Component created!");
        props.model.addObserver(observerACB);
        function isTakenDownACB() {
            console.log("Component is dying!");
            props.model.removeObserver(observerACB);
        }
        return isTakenDownACB;
    }
    React.useEffect(summaryWasCreatedACB, []);

    return <SummaryView people={props.model.numberOfGuests} ingredients={shoppingList(props.model.dishes)}/>;
}
