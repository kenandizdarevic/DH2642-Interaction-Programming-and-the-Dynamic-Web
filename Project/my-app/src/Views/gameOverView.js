import { useNavigate } from 'react-router-dom'
import Button from '@mui/material/Button'
import ButtonGroup from '@mui/material/ButtonGroup'

function GameOver({resetScore, score}) {
    const navigation = useNavigate();

    function menuClicked() {
      resetScore()
      navigation("/menu")
    }

    function quizClicked() {
      resetScore()
      navigation("/quizmenu")
    }

    return (
    <div>
      <form className="gameOver">
          <img className="gameOverImg" src="https://i.imgur.com/CUD9gTi.png"/>
          <ButtonGroup className="centerBtns">
              <Button variant="contained" sx={{m: 2, p: 4}} onClick = {menuClicked}>Back to menu</Button>
              <Button variant="contained" sx={{m: 2, p: 4}} onClick = {quizClicked} >Play Again!</Button>
          </ButtonGroup>
          <h2 className="centerTxt">Score: {score}</h2>
      </form>
    </div>
    )
}

export default GameOver;