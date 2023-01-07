import SidebarView from "../views/sidebarView.js";

export default
function Sidebar(props) {

    const [, setNumberOfGuests]= React.useState();
    const [, setDishes]= React.useState();

    function observerACB() {
        setNumberOfGuests(props.model.numberOfGuests);
        setDishes(props.model.dishes);
    }

    function sidebarWasCreatedACB() {
        console.log("Component created!");
        props.model.addObserver(observerACB);
        function isTakenDownACB() {
            console.log("Component is dying!");
            props.model.removeObserver(observerACB);
        }
        return isTakenDownACB;
    }
    React.useEffect(sidebarWasCreatedACB, []);

    function changeNumberACB(input) {
        props.model.setNumberOfGuests(input);
    }
    function onDishRemoveACB(dish) {
        props.model.removeFromMenu(dish);
    }
    function onDishChangeACB(dish) {
        props.model.setCurrentDish(dish.id);
    }
    return <SidebarView number = {props.model.numberOfGuests} onNumberChange = {changeNumberACB} dishes = {props.model.dishes} dishRemoval = {onDishRemoveACB} changeDish = {onDishChangeACB}/>;
}