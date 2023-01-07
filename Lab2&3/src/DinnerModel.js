import { isIntegerKey } from "@vue/shared";
import resolvePromise from "./resolvePromise";
import { getDishDetails, searchDishes } from "./dishSource.js"

/* This is an example of a JavaScript class.
   The Model keeps only abstract data and has no notions of graohics or interaction
*/
class DinnerModel{
    constructor(nrGuests=2, dishArray=[]){
        
        this.observers = [];
        this.setNumberOfGuests(nrGuests);
        this.dishes= dishArray;
        this.searchParams = {};
        this.searchResultsPromiseState = {};
        this.currentDishPromiseState = {};
    }

    addObserver(observerToAdd) {
        this.observers = [...this.observers, observerToAdd];
    }

    removeObserver(observerToRemove) {

        function filterToKeepCB(observer) {
            if (observer !== observerToRemove) {
                return true;
            }
            return false;
        }
        this.observers = this.observers.filter(filterToKeepCB);
    }

    notifyObservers(payload) {
        function invokeObserverCB(observer) {
            observer(payload);
        }
        try {
            this.observers.forEach(invokeObserverCB)
        }
        catch(err) {
            console.error(err);
        }
    }

    setNumberOfGuests(nr){
        if (nr !== this.numberOfGuests) {

            if (nr < 1 || !Number.isInteger(nr))
                throw new Error("number of guests not a positive integer");

            if (nr >= 1 && Number.isInteger(nr) == true)
                this.numberOfGuests = nr; 

                this.notifyObservers({newNumberOfGuests: nr})
        }
        
    }
    addToMenu(dish) {
        function checkDishCB(dishInMenu) {
            if (dish.id === dishInMenu.id) {
                return true;
            }
            return false;
        }

        if (!this.dishes.find(checkDishCB)) {
            this.dishes= [...this.dishes, dish]
            this.notifyObservers({dishAdded: dish})
        }
    }
    
    removeFromMenu(dish){

        function hasSameIdCB(myDish){

            if (myDish.id != dish.id)
                return true;
            }

            function checkDishCB(dishInMenu) {
                if (dish.id === dishInMenu.id) {
                    return true;
                }
                return false;
            }
    
            if (this.dishes.find(checkDishCB)) {
                this.dishes = this.dishes.filter(hasSameIdCB);
                this.notifyObservers({removeDish: dish})
            }
    }

    setCurrentDish(id) {
        if (id) { 
            if (this.currentDish === id) {
                return;
            }
            this.currentDish = id;
            resolvePromise(getDishDetails(id), this.currentDishPromiseState, this.notifyObservers.bind(this))
            this.notifyObservers({setDish: id})
        }
    } 

    setSearchQuery(q) {
        this.searchParams.query = q;
    }

    setSearchType(t) {
        this.searchParams.type = t; 
    }

    doSearch(searchParams) {
        resolvePromise(searchDishes(searchParams), this.searchResultsPromiseState, this.notifyObservers.bind(this));
    }

}

export default DinnerModel;

