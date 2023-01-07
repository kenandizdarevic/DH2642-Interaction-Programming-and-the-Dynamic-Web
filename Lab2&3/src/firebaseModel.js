// Add relevant imports here 
import firebaseConfig from "/src/firebaseConfig.js";
import { getDishDetails } from "./dishSource.js"
import DinnerModel from "./DinnerModel";
import { def } from "@vue/shared";


// Initialise firebase
firebase.initializeApp(firebaseConfig);
const REF = "dinnerModel47";
firebase.database().ref(REF+"/test").set("dummy");


function observerRecap(model) {
    function observerToAddACB(payload) {
        console.log(payload);
    }
    model.addObserver(observerToAddACB);
}

function firebaseModelPromise() {
    function makeBigPromiseACB(firebaseData) {
        if (!firebaseData.val()) {
            return new DinnerModel(2, []);
        }
        
        function createModelACB(arrayOfDishes) {
            return new DinnerModel(firebaseData.val().numberOfGuests, arrayOfDishes);
        }

        function makeDishPromiseCB(dishId) {
            return getDishDetails(dishId);
        }
        
        const dishPromiseArray = Object.keys(firebaseData.val().addDish || []).map(makeDishPromiseCB);
        return Promise.all(dishPromiseArray).then(createModelACB);
    }
    return firebase.database().ref(REF).once("value").then(makeBigPromiseACB);
}

function updateFirebaseFromModel(model) {
    function addObserverACB(payload) {
        if(payload && payload.hasOwnProperty("newNumberOfGuests")) {
            firebase.database().ref(REF+"/numberOfGuests").set(model.numberOfGuests);
        }

        if (payload && payload.hasOwnProperty("setDish")) {
            firebase.database().ref(REF+"/currentDish").set(model.currentDish);
        }

        if (payload && payload.hasOwnProperty("dishAdded")) {
            firebase.database().ref(REF+"/addDish/"+payload.dishAdded.id).set(payload.dishAdded.title);
        }

        if (payload && payload.hasOwnProperty("removeDish")) {
            firebase.database().ref(REF+"/addDish/"+payload.removeDish.id).set(null);
        }
    }
    model.addObserver(addObserverACB);
    return;
}

function updateModelFromFirebase(model) {
    firebase.database().ref(REF+"/numberOfGuests").on("value", 
    function guestsChangedInFirebaseACB(firebaseData) {model.setNumberOfGuests(firebaseData.val());});

    firebase.database().ref(REF+"/currentDish").on("value", 
    function currentDishChangedInFirebase(firebaseData) {model.setCurrentDish(firebaseData.val());});

    function dishAddedInFirebaseACB(firebaseData) {

        function checkDishCB(dish) {
            return +firebaseData.key === dish.id;
        }

        if (model.dishes.find(checkDishCB)) {return;}

        getDishDetails(+firebaseData.key).then(function dishToAdd(dish){model.addToMenu(dish)});
    }

    firebase.database().ref(REF+"/addDish").on("child_added", dishAddedInFirebaseACB)

    firebase.database().ref(REF+"/addDish").on("child_removed", 
    function removedDishInFirebaseACB(firebaseData) {model.removeFromMenu({"id":+firebaseData.key});});
    return;
}

export {observerRecap, firebaseModelPromise, updateFirebaseFromModel, updateModelFromFirebase};