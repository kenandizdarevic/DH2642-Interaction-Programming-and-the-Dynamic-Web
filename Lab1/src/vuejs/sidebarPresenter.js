import SidebarView from "../views/sidebarView";

export default
function Sidebar(props) {
    function changeNumberACB(nr) {
        props.model.setNumberOfGuests(nr)
    }

    function removeDishACB(dish){
        props.model.removeFromMenu(dish)
    }

    function addDishACB(dish) {
        props.model.setCurrentDish(dish.id)
    }

    return <SidebarView number={props.model.numberOfGuests} onNumberChange={changeNumberACB} dishes={props.model.dishes}
    userRemoveDish={removeDishACB} userAddDish={addDishACB}/>;
}