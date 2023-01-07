import QuizMenuView from "../Views/quizMenuView"
import { useDispatch, useSelector } from 'react-redux'
import { livesSet } from "../Redux/livesSlice"
import { collection, getDocs } from "firebase/firestore";
import { Firestore, getFirestore } from "firebase/firestore"
import {React, useState, useEffect} from "react";

function QuizMenu() {
    const [hsArray, setHSArray] = useState([]);

    const count = useSelector((state) => state.lives.value);
    const dispatch = useDispatch()
    var database = getFirestore();
    
    

    async function getTopTen() {
        var firebaseArray = [];
        var i = 0;

        const querySnapshot = await getDocs(collection(database, "highscore"));
        //firebaseArray = querySnapshot;
        querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            firebaseArray[i++] = doc.data();
        });
        setHSArray(firebaseArray)
    }
    
    function setLivesToEasy() {
        dispatch(livesSet(3))
    }

    function setLivesToHard() {
        dispatch(livesSet(1))
    }

    useEffect(() => {
        getTopTen()
    }, [])

    return (
            <QuizMenuView setLivesToEasy={setLivesToEasy} setLivesToHard={setLivesToHard} highscoreArray = {hsArray}/>
        );
}

export default QuizMenu;