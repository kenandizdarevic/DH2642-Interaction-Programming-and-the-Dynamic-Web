import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import React, { useState } from 'react';
import Button from '@mui/material/Button'
import {ButtonGroup, ButtonBase} from "@mui/material";
import {render} from "@testing-library/react";
import correctSound from "../Assets/Correct.wav"
import wrongSound from "../Assets/Wrong.wav"

export default
function QuizView({data, correct, checkPokemonCorrect, setModalShow, lives, score}) {
    const [isDisabled, setIsDisabled] = useState(false)
    const [showPopup, setShowPopup] = useState(false);
    const [popupType, setPopupType] = useState('correct'); // 'correct' or 'incorrect'

    const hearts = [
        'https://www.freeiconspng.com/thumbs/pokeball-png/pokeball-transparent-png-2.png',
        'https://www.freeiconspng.com/thumbs/pokeball-png/pokeball-transparent-png-2.png',
        'https://www.freeiconspng.com/thumbs/pokeball-png/pokeball-transparent-png-2.png',
    ];

    const correctAudio = new Audio(correctSound);
    const wrongAudio = new Audio(wrongSound);
    correctAudio.volume = 0.3
    wrongAudio.volume = 0.3

    function removeCSS() {
        const el = document.getElementById("answerImage");
        el.classList.remove("loading");
        el.classList.remove("forAni")
        el.classList.remove("centerTxt")
    }
    return (
        <div className="container">
            <form className="game">
                <Button className="giveUpBtn" variant="contained" onClick={() => setModalShow(true)}>Menu!</Button>
                <div id="game" className="justify-center flex-column">
                    <h2 className="center" id="question">What is the name of this pokemon?</h2>
                    <div id="answerImage" className="centerTxt loading forAni">
                        {showPopup && (
                            <img
                                className="centerImg"
                                onLoad={removeCSS}
                                src={popupType === 'correct' ? 'https://media1.giphy.com/media/13G7hmmFr9yuxG/giphy.gif' : 'https://media0.giphy.com/media/uWPGqy4rkgllS/giphy.gif'}
                                height="200"
                                width="200"
                            ></img>
                        )}
                        {!showPopup && (
                            <img
                            className="center"
                            onLoad={removeCSS}
                            src={correct.sprites.other.dream_world.front_default}
                            height="200"
                            width="200"
                            ></img>
                        )}
                    </div>
                    <div className="centerBtnsQuiz">{data.map(renderChoice)}</div>
                </div>
                <div id="score" >Score: {score}</div>
                <div className="livesImg">
                    LIVES:
                    {hearts.slice(0, lives).map(heart => (
                        <img key={"id" + Math.random().toString(16).slice(2)} height="30" width="30" src={heart} alt="Heart" />
                    ))}
                </div>
            </form>
        </div>
    )


    function renderChoice(poke) {
        function checkAnswerACB() {

            if (poke === correct) {
                document.getElementById(poke.id).className = 'correctButton'
                setPopupType('correct');
                correctAudio.play()
            }
            else {
                document.getElementById(poke.id).className = 'wrongButton'
                setPopupType('incorrect');
                wrongAudio.play()
            }
            setIsDisabled(true)
            setShowPopup(true);


            setIsDisabled(true)
            setTimeout(()=>{
                checkPokemonCorrect(poke)
                setIsDisabled(false)
                setShowPopup(false);
          },2000) // 2 seconds
        }

        return (
            <div key={poke.id} className="choice-container">
                <ButtonGroup>
                    <Button variant="contained" sx={{m: 2, p: 4}} id = {poke.id}
                            onClick={checkAnswerACB}
                            className="choice-text"
                            disabled={isDisabled}
                    >{poke.name.charAt(0).toUpperCase() + poke.name.slice(1)}
                    </Button>
                </ButtonGroup>
            </div>
        )
    }
}