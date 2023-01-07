/* 
   This component uses Vue-specific and React-specific presenters: Sidebar, Summary, Search, Details, Show 
   Therefore it needs to import from alternative paths, depending on the framework. 
   To achieve that, we use require() with a prefix, instead of import.
*/

const PREFIX=window.location.toString().includes("react")?"reactjs":"vuejs";
import Show from "../reactjs/show.js"

const Sidebar=require("../"+PREFIX+"/sidebarPresenter.js").default;
const Summary=require("../"+PREFIX+"/summaryPresenter.js").default;
const Search=require("../"+PREFIX+"/searchPresenter.js").default;
const Details=require("../"+PREFIX+"/detailsPresenter.js").default;

export default
function App(props){
    return (<div class="flexParent">
                <div class="sidebar"><Sidebar model={props.model} /></div>
                <div class = "mainContent" >
                    <Show hash="#search"><Search model={props.model} /></Show>   
                    <Show hash="#details"><Details model={props.model} /></Show>
                    <Show hash="#summary" class="myIngredient"><Summary model={props.model} /></Show>
                </div>
            </div>
           );
}