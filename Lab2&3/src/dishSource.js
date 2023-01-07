import {BASE_URL, API_KEY} from "../src/apiConfig.js";

function treatHTTPResponceACB(response) {
    if (!response.ok) {
        throw new Error("response is not 200");
    }
    return response.json();
}

function transformSearchResultACB(param) {
   return param.results;
}

function getDishDetails(dishId) {
    return fetch(BASE_URL+ "recipes/" + dishId + "/information", {
        "method": "GET", 
        "headers": {
            'X-Mashape-Key': API_KEY, 
            "x-rapidapi-host": "spoonacular-recipe-food-nutrition-v1.p.rapidapi.com", 
        }
    }).then(treatHTTPResponceACB);
}

function searchDishes(params) {
    return fetch(BASE_URL + "recipes/search?" + new URLSearchParams(params), {
        "method": "GET", 
        "headers": {
            'X-Mashape-Key': API_KEY, 
            "x-rapidapi-host": "spoonacular-recipe-food-nutrition-v1.p.rapidapi.com", 
        }
    }).then(treatHTTPResponceACB).then(transformSearchResultACB);
}

export {getDishDetails};
export {searchDishes};