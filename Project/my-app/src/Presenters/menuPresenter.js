import MenuView from "../Views/menuView"
import { useDispatch } from 'react-redux'
import { resetScore } from "../Redux/scoreSlice"
import React from "react"
import { useSelector } from 'react-redux'
import { Firestore, getFirestore } from "firebase/firestore"
import { doc, setDoc, getDoc } from "firebase/firestore";

function Menu() {
    const dispatch = useDispatch()

    React.useEffect(() => {dispatch(resetScore());}, [])

    return (
        <MenuView/>
    );
}

export default Menu;