import { dishType } from "../utilities.js";
import { sortDishes } from "../utilities.js";
import { menuPrice } from "../utilities.js";

function SidebarView(props) {

    function decreaseACB(event) {
        props.onNumberChange(props.number - 1);
    }

    function increaseACB(event) {
        props.onNumberChange(props.number + 1);
    }

    return (
        <div class = "main">
            <button class="myButton" disabled = {props.number === 1} 
            onClick = {decreaseACB}>-</button> 
            {props.number} guests
            <button class="myButton" onClick = {increaseACB}>+</button>
            {renderDishes(props.dishes, props.number)}
        </div>
    );
    
    function renderDishes(dishArray, guests) {
        function dishTableRowCB(dish) {
            function toRemoveDishACB() {
                props.dishRemoval(dish);
            }
            function toChangeDishACB(newDish) {
                props.changeDish(dish);
                newDish.preventDefault();
                window.location.hash = "#details"; 
            }
            return <tr key = {dish.id}>
                <td><button class="myButton" onClick = {toRemoveDishACB}>x</button></td>
                <td><a onClick={toChangeDishACB} href="#">{dish.title}</a></td>
                <td>{dishType(dish)}</td>
                <td class="divA">{(dish.pricePerServing*guests).toFixed(2)}</td>
            </tr>;
        }
    
        return <table>
            <tbody>
                {
                    sortDishes(dishArray).map(dishTableRowCB)
                }
                <tr>
                    <td></td>
                    <td>Total:</td>
                    <td></td>
                    <td class="divA">{(guests*menuPrice(dishArray)).toFixed(2)}</td>
                </tr>
            </tbody>
        </table>;
    }
}

export default SidebarView;