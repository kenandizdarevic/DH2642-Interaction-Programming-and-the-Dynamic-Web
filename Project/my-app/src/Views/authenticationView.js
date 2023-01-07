import React, { useContext,useEffect, useState } from 'react'

import {  getAuth,signInWithEmailAndPassword , createUserWithEmailAndPassword,onAuthStateChanged,GoogleAuthProvider,signInWithPopup } from "firebase/auth";
import {auth} from '../firebase.js';
import LoginView from './loginView'
import SignUpView from "./signUpView";
import { Link,useNavigate } from 'react-router-dom';
import Nav from '../Presenters/Nav';
import { useDispatch, useSelector } from 'react-redux'
import { saveDisplayName } from '../Redux/displayNameSlice.js';
import { updateUser } from '../Redux/userSlice.js';


const AuthContext = React.createContext()
export function useAuth(){
    return useContext(AuthContext)
}

export default function AuthenticationView() {
    const [user, setUser] = useState(null)
    const [state, setState] = useState("L")
    const [email, setEmail] = useState()//("test@gmail.com")
    const [password, setPassword] = useState()//("thiusisapassword")
    const [loading, setLoading] = useState(true)
    const dispatch = useDispatch()
    
    const provider = new GoogleAuthProvider();
    const navigation = useNavigate()
    const [view, setView] = useState("si")
    function toLogin(){setView("si")}
    function toSignup(){setView("su")}

     const signInWGoogle = () => {
        signInWithPopup(auth, provider).then((result) => {
            dispatch(saveDisplayName(result.user.displayName))
            dispatch(updateUser(result.user.uid))
            setUser(result.user)
            navigation("/Menu")
        }).catch((error)=>{console.log(error)})
     }
    function signUp(email, password) {
        createUserWithEmailAndPassword(auth, email, password)
        .then((result) => {
            dispatch(saveDisplayName(result.user.displayName))
            dispatch(updateUser(result.user.uid))
            navigation("/Menu")
            setUser(result.user)
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;

        });
     }
     function signIn(email, password) {
        signInWithEmailAndPassword(auth, email, password)
        .then((result) => {
            // Signed in 
            dispatch(saveDisplayName(result.user.displayName))
            dispatch(updateUser(result.user.uid))
            navigation("/Menu")
            setUser(result.user)
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(error)
        });
     }
     function signOut() {
        signOut(auth).then(() => {
            // Sign-out successful.
            dispatch(saveDisplayName(""))
            dispatch(updateUser(""))
        }).catch((error) => {
            console.log(error)
            // An error happened.
        });
     }
    
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setLoading(false)
            setUser(user)
        })
    
        return unsubscribe
    }, [])

    const value = {
        user,
        signUp,
        signIn,
        signInWGoogle,
        signOut
    }

    return (
        <AuthContext.Provider value = {value}>
            <div>
                { (!(view === "si") && true ) || <div><LoginView   tsu = {toSignup} /></div>}
                { (!(view === "su") && true ) || <div><SignUpView  tsi = {toLogin} /></div>}

            </div>
        </AuthContext.Provider>
        );
}

