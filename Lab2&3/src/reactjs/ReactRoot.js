// Add relevant imports here 
import { firebaseModelPromise, updateFirebaseFromModel, updateModelFromFirebase } from "../firebaseModel";
import resolvePromise from "../resolvePromise";
import promiseNoData from "../views/promiseNoData";
import App from "../views/app";

// Define the ReactRoot component
function ReactRoot() {
    const [promiseState]= React.useState( {} );
    const [, reRender] = React.useState();

    function forceReRenderACB() {
        reRender(new Object());
    }

    if (!promiseState.promise) {
        resolvePromise(firebaseModelPromise(), promiseState, forceReRenderACB);
    }

    if (promiseState.data) {
        updateFirebaseFromModel(promiseState.data);
        updateModelFromFirebase(promiseState.data);
    }

    return promiseNoData(promiseState) || <App model={promiseState.data}/>;
}

export default ReactRoot;