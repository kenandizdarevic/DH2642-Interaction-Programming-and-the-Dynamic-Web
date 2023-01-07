
function compareIngredientsCB(ingredientA, ingredientB){

    if (ingredientA.aisle === ingredientB.aisle) {
        if (ingredientA.name > ingredientB.name)
            return 1;
        if (ingredientA.name < ingredientB.name)
            return -1;
    }
    if (ingredientA.aisle > ingredientB.aisle) {
        return 1;
    }
    if (ingredientA.aisle < ingredientB.aisle) {
        return -1;
    }
}

function sortIngredients(ingredients){
    return [...ingredients].sort(compareIngredientsCB) 
}

const dishTypeRanking={
    "starter":1,
    "main course":2,
    "dessert":3,
    "":0
};

function isKnownTypeCB(type){

        if (dishTypeRanking[type]) {
            return true;
        }
        else {
            return false;
        }
}


function dishType(dish){
    // TODO
    if (!dish.dishTypes || !dish.dishTypes.find(isKnownTypeCB)) {
        return "";
    }
    else{
        return dish.dishTypes.find(isKnownTypeCB);
    }
}

function compareDishTypesCB(dishA, dishB){

    return dishTypeRanking[dishType(dishA)] - dishTypeRanking[dishType(dishB)];
}

function sortDishes(dishes){
    return [...dishes].sort(compareDishTypesCB);
}

function shoppingList(dishes){
    const result={}; 

    function keepJustIngredientsCB(dish){
        return dish.extendedIngredients;
    }

    function ingredientCB(ingredient){
        if(result[ingredient.id] === undefined){

            result[ingredient.id]={...ingredient};

        } else {

            result[ingredient.id].amount +=  ingredient.amount;
        }
    }

    const arrayOfIngredientArrays= dishes.map(keepJustIngredientsCB);
    const allIngredients= arrayOfIngredientArrays.flat();    
    allIngredients.forEach(ingredientCB);

    return Object.values(result);
}


function menuPrice(dishesArray){

    function dishToPriceCB(dish) {
        return dish.pricePerServing;
    }

    function sumReducerCB(price1, price2) {
        return price1 + price2;
    }

    return dishesArray.map(dishToPriceCB).reduce(sumReducerCB, 0);

}


export {compareIngredientsCB, sortIngredients, isKnownTypeCB, dishType, sortDishes, menuPrice, shoppingList};