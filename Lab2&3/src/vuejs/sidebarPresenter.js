import SidebarView from "../views/sidebarView.js";

export default
function Sidebar(props) {
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