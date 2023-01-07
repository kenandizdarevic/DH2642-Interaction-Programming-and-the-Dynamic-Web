import { Link,useNavigate } from 'react-router-dom'
import { useAuth } from '../Views/authenticationView'
import React , { useRef, useEffect , useState }from 'react'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import {GoogleLoginButton, DiscordLoginButton, AppleLoginButton, FacebookLoginButton} from "react-social-login-buttons";


export default function LoginView({siwg,tsu}) {
  const emailRef = useRef()
  const passwordRef = useRef()

  const { signIn,signInWGoogle, user } = useAuth()
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  // const navigation = useNavigate()
  async function handleLoginSubmit(e) {
      e.preventDefault()

      try {
          setLoading(true)
          setError("")
          await signIn(emailRef.current.value, passwordRef.current.value)
          
      } catch {
          console.log("Couldn't log in")
          setError("failed to log in")
      }
      setLoading(false)
  }

  async function signOut(){
    setError('')
    try{
      await signOut()
    } catch {
      setError('failed')
    }
  }

  function redirect() {
      tsu() 
  }
    
  return (
    <div>
        <form className="signUp">
            <img className="center" src="https://i.imgur.com/W7J7b8b.png"/>
            <div className="buttons">
                <TextField margin="normal" variant="standard" color="primary" label="Email" placeholder="email@address.com" type="email" inputRef={emailRef}/>
                <TextField margin="normal" variant="standard" type="password" label="Password" placeholder="********" inputRef={passwordRef}/>
                <Button variant="contained" type="submit" disabled={true} onClick={handleLoginSubmit}>Submit</Button>
            </div>
            <label className="centerTxt">Not a member?</label>
            <Button varian="contained" onClick={() => tsu()}> Sign up here</Button>
            <GoogleLoginButton className="zoomLess center" onClick={() => signInWGoogle()}/>
        </form>
    </div>
  )
}



