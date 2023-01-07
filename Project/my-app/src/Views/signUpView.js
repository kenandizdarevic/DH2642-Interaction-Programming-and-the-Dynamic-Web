import { updateCurrentUser } from 'firebase/auth'
import React , { useRef, useEffect , useState }from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../Views/authenticationView'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import {GoogleLoginButton, DiscordLoginButton, AppleLoginButton, FacebookLoginButton} from "react-social-login-buttons";



export default function SignUpView({siwg,tsi}) {

    const emailRef = useRef()
    const passwordRef = useRef()

    const { signUp,signInWGoogle, user } = useAuth()
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)
    // const navigation = useNavigate()
    async function handleSubmit(e) {
        e.preventDefault()

        try {
            setLoading(true)
            setError("")
            await signUp(emailRef.current.value, passwordRef.current.value)


        } catch {
            console.log("already signed up")
            setError("failed to create an account")
        }
        setLoading(false)
    }
    function redirect() {
        tsi()
    }
    
  return (
        <div>
            <form className="signUp">
                <img className="center" src={"https://i.imgur.com/U5o0YxZ.png"} width="70%"/>
                <div className="buttons">
                    <TextField margin="normal" variant="standard" color="primary" label="Email" placeholder="email@address.com" type="email" inputRef={emailRef}/>
                    <TextField margin="normal" variant="standard" type="password" label="Password" placeholder="********" inputRef={passwordRef}/>
                    <Button variant="contained" type="submit" disabled={true} onClick={handleSubmit} >Submit</Button>
                </div>
                <label className="centerTxt">Already signed up?</label>
                <Button varian="contained" onClick={() => tsi()}> Log in here</Button>
                <GoogleLoginButton className="zoomLess center" onClick={() => signInWGoogle()}/>
                
            </form>
        </div>
  )
}



