import { menuPrice, sortDishes, dishType } from "../utilities"

function SidebarView(props) {
    
    function increaseNumberACB(){
        props.onNumberChange(props.number + 1)
    }
    
    function decreaseNumberACB() {
        props.onNumberChange(props.number - 1)
    }
    return (
            <div class="main">
                <button disabled={props.number <= 1} onClick={decreaseNumberACB}>
                    -
                </button>
                    <span>
                        {props.number}
                    </span>
                <button onClick={increaseNumberACB}>
                    +
                </button>
                {
                    renderDishes(props.dishes, props.number)
                }
            </div>
    );

    function renderDishes(dishArray, people) {
        function dishTableRowCB(dish) {

            function removeDishCB() {
                props.userRemoveDish(dish)
            }

            function addDishCB() {
                props.userAddDish(dish)
            }
           
            return <tr key={dish.id}>
                <td>
                    <button onClick={removeDishCB}>
                        X
                    </button>
                </td>
                <td>
                    <a onClick={addDishCB} href='#'>
                        {dish.title}
                    </a>
                </td>
                <td>
                    {dishType(dish)}
                </td>
                <td class="alignRight">
                    {(dish.pricePerServing * people).toFixed(2)}
                </td>
            </tr>;
        }
        
        // Follow the guide from powerpoint slide 19
        // tr: [-----------------]
        // td: [------[td]-------]
        return <table>
            <tbody>
                {
                    sortDishes(dishArray).map(dishTableRowCB)
                }
                <tr>
                    <td> </td>
                    <td> 
                        Total: 
                    </td>
                    <td> </td>
                    <td class="alignRight">
                        {(menuPrice(dishArray) * people).toFixed(2)}
                    </td>
                </tr>
            </tbody>
        </table>
    }
}
export default SidebarView;