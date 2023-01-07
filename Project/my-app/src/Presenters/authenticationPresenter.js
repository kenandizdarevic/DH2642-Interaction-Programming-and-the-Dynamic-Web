import React, { useContext,useEffect, useState } from 'react'
import AuthenticationView from '../Views/authenticationView.js';
import {  getAuth,signInWithEmailAndPassword , createUserWithEmailAndPassword,onAuthStateChanged,GoogleAuthProvider,signInWithPopup } from "firebase/auth";
import {auth} from '../firebase.js';
import { Link,useNavigate } from 'react-router-dom';
import Nav from './Nav.js';

    const AuthContext = React.createContext()
    export function useAuth(){
        return useContext(AuthContext)
    }
export default function AuthenticationPresenter({children}) {
    const [user, setUser] = useState()

    const [loading, setLoading] = useState(true)
    
    const provider = new GoogleAuthProvider();
    
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setLoading(false)
            setUser(user)
        })
    
        return unsubscribe
    }, [])

    const value = {

    }

    return (
        <div>
            <AuthContext.Provider value = {value}>
                    {!loading && children}
            </AuthContext.Provider>
        </div>
    );
}
