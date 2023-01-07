import { configureStore } from '@reduxjs/toolkit';
import livesReducer from "./livesSlice"
import scoreReducer from "./scoreSlice"
import userReducer from "./userSlice"
import 'firebase/firestore'
import {actionTypes, firebaseReducer} from "react-redux-firebase";
import {firestoreReducer} from "redux-firestore";
import displayNameSlice from './displayNameSlice';



export default configureStore({
  reducer: {
    lives: livesReducer,
    score: scoreReducer,
    user: userReducer,
    displayName: displayNameSlice,
  },
});
