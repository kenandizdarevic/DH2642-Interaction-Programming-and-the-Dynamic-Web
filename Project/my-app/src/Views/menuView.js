import { Link,useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import React , { useState }from 'react'
function MenuView() {
    const navigation = useNavigate()
    const [dname, setDname] = useState("Tim")
    return (
        
        <div className="flexParent bg-container">
            <img className="pokedexPicture zoom" 
            src="https://i.imgur.com/CacqcJ7.png"
            onClick={() => {navigation("/pokedex")}}></img>
            <img className="quizPicture zoom" 
            src="https://i.imgur.com/IIYbbbg.png"
            onClick={() => {navigation("/quizmenu")}}></img>
        </div>
    );
}

export default MenuView;