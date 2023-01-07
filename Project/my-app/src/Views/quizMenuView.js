import { useNavigate } from 'react-router-dom'
import Button from '@mui/material/Button'
import { useSelector } from 'react-redux'
import { doc, setDoc, getDoc } from "firebase/firestore";

//navigation("/quiz");

function QuizMenuView( {setLivesToEasy, setLivesToHard, highscoreArray} ) {
  const navigation = useNavigate()
  const user = useSelector((state) => state.user.value);
  const displayName = useSelector((state) => state.displayName.value);


  function livesEasy() {
      setLivesToEasy()
      navigation("/quiz");
  }

  function livesHard() {
      setLivesToHard()
      navigation("/quiz");
  }

  function redirect() {
      navigation("/pokedex")
  }

  function renderHighscore(usr) {
    return (
           <h3 key = {usr.name} id={usr.displayName} className="centerTxt">
                {usr.name} : {usr.score} 
            </h3> 
        
    );
  }
    
    return (
      // Container div required for flexbox, will fix
      <div className="quizMenu">
          <form className="menu">
              <h1 className="title">POKÉMON QUIZ</h1>
              <h3 className="centerTxt1">Welcome to the ultimate Pokémon quiz!</h3>
              <h3 className="centerTxt1">Your task is to guess the correct Pokémon based on its image</h3>
              <h3 className="centerTxt1">Are you the next Pokémon master?</h3>
              <div className="centerBtn">
                  <h3 className="centerTxt">Please choose difficulty:</h3>
                  <img className="zoomLess menuImg" src="https://i.imgur.com/rF7RRUK.png" onClick = {livesEasy} ></img>
                  <img className="zoomLess menuImg" src="https://i.imgur.com/oQCcTZk.png" onClick = {livesHard}></img>
              </div>

              <div width="100px" className="centerTxt">
                  <Button  variant="contained" onClick={redirect}>Go to Pokédex</Button>
              </div>
              </form>
          <form className="menu">
                <h1 className="centerTxt">SCOREBOARD</h1>
                {/*<h3 className="centerTxt">ASHE KETCHUM: 420</h3>
                <h3 className="centerTxt">HASSAN: 420</h3>
                <h3 className="centerTxt">KENAN: 420</h3>
                <h3 className="centerTxt">SERKAN: 420</h3>
                <h3 className="centerTxt">NOAH: 420</h3>
                <h3 className="centerTxt">ABUD: 420</h3>
                <h3 className="centerTxt">JOE: 420</h3> */}
                {highscoreArray.sort((a,b) => {return b.score-a.score}).map(renderHighscore)}
          </form>
      </div>
    );

}

export default QuizMenuView;