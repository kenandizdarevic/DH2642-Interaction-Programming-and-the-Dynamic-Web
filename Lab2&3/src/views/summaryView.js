/* Functional JSX component. Name starts with capital letter */
import { sortIngredients } from "../utilities.js";

function SummaryView(props){
    return (
            <div class="debug">
                Summary for <span title="nr guests">{props.people}</span> persons:
            
                {
                       renderIngredients(props.ingredients, props.people) 
                }
                <button class="myButton" onClick={toSearchViewACB}>Back to search!</button>
            </div>
    );
}

function toSearchViewACB() {
    window.location.hash = "#search";
}

function renderIngredients(ingredientArray, people){
    function ingredientTableRowCB(ingr){
        return <tr key={ingr.id}><td>{ingr.name}</td> <td>{ingr.aisle}</td><td class="divA">{(ingr.amount*people).toFixed(2)
                                                                                      }</td><td> {ingr.unit} </td></tr>;
    }
    
    return <table>
        <thead>
        <tr><th>Name</th><th>Aisle</th><th>Quantity</th><th>unit</th></tr>
        </thead>
        <tbody>

           {
             sortIngredients(ingredientArray).map(ingredientTableRowCB) 
           }

        </tbody>
        </table>;
}

export default SummaryView;
export {renderIngredients};