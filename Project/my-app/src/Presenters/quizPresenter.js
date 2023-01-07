import { fetchPokemonDetails } from "../pokemonSource";
import QuizView from "../Views/quizView";
import GameOver from "../Views/gameOverView";
import {React, useState, useEffect} from "react";
import { useDispatch, useSelector } from 'react-redux'
import { lostLives } from "../Redux/livesSlice"
import { incrementScore, resetScore } from "../Redux/scoreSlice"
import MyVerticallyCenteredModal from "../Views/modalView"
import firebase from "../firebase";
import 'firebase/firestore';
import { Firestore, getFirestore } from "firebase/firestore"
import { database } from "../firebase"
import { doc, setDoc, getDoc } from "firebase/firestore";

export default
function Quiz() {
    const [quizData, setQuizData] = useState([]);
    const [answer, setAnswer] =  useState();
    const [readyToRender, setReadayRender] = useState(false);
    const [modalShow, setModalShow] = useState(false);

    let tempData = []
    const dispatch = useDispatch()
    const lives = useSelector((state) => state.lives.value);
    const score = useSelector((state) => state.score.value);
    const user = useSelector((state) => state.user.value);
    const displayName = useSelector((state) => state.displayName.value);
    var database = getFirestore();

    async function generateQuizData() {
        for (let i = 0; i < 4; i++) {
          let response = await fetchPokemonDetails(Math.floor(Math.random() * 649)+1);
         while(tempData.includes(response.data)) {
             response = await fetchPokemonDetails(Math.floor(Math.random() * 649)+1);
         }
          tempData[i] = response.data;
        }
      
        setQuizData(tempData);
        setAnswer(tempData[Math.floor(Math.random() * 4)]);
        setReadayRender(true);
      }

    function missingData() {
        if (!readyToRender || !answer) {
            return <img className="center" src="https://i.imgur.com/VexuoSc.gif"/>
        }
        else if (lives === 0) {
            getFirebaseHS();
            return (
                <div>
                    <div><GameOver score={score} resetScore={()=>{dispatch(resetScore())}}/></div>
                </div>
            )
        }
    }

    async function getFirebaseHS() {
        const docRef = doc(database, "highscore", user);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            if(docSnap.data().score < score) {
                await setDoc(doc(database, "highscore", user), {
                    "name": displayName,
                    "score": score,
                });
            }

          } else {
            await setDoc(doc(database, "highscore", user), {
                "name": displayName,
                "score": score,
            });
          }

        
    }

    async function isPokemonCorrect(pokemon) {
        if(pokemon === answer)
            dispatch(incrementScore())
        else {
            dispatch(lostLives())
        }
        generateQuizData()
    }

    useEffect(() => {
        generateQuizData()
    }, [])

    return ( 
        <div>
            {missingData() || <QuizView data={quizData} correct={answer} score={score} checkPokemonCorrect={isPokemonCorrect} 
             resetScore={()=>{dispatch(resetScore())}} setModalShow={setModalShow} lives={lives}/>}
             <MyVerticallyCenteredModal
                    show={modalShow}
                    onHide={() => setModalShow(false)}/>
        </div>
        
    );
}