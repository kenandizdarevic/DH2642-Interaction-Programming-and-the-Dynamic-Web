import { render } from "react-dom";
import { sortDishes } from "../utilities";

function SearchFormView(props) {

    function textChangeACB(event) {
        props.onTextChange(event.target.value);
    }

    function tempFunctionDropDownACB(event) {
        props.dropDown(event.target.value);
    }

    function searchButtonACB() {
        props.onSearchButton();
    }

    return (
        <div>
            <input onChange={textChangeACB}>
            </input>
            <select class="myButton" onChange={tempFunctionDropDownACB}>
                <option>
                    Choose:
                </option>
                {props.dishTypeOptions.map(renderOptionsCB)}
            </select>
            <button class="myButton" onClick={searchButtonACB}>
                Search!
            </button>
            <button class="myButton" onClick={summaryACB}>
                To Summary!
            </button>
        </div>
    );

    function summaryACB() {
        window.location.hash = "#summary";
    }

    function renderOptionsCB(courseOptions) {
        return <option>
            {courseOptions}
        </option>;
    }
}

export default SearchFormView;