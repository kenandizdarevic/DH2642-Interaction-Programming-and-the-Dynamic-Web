import React from 'react';
import Menu from '../Presenters/menuPresenter';
import Pokedex from '../Presenters/pokedexPresenter';
import LoginPresenter from '../Presenters/authenticationPresenter';

import SignUpView from './signUpView';
import AuthenticationView from './authenticationView';
import Quiz from '../Presenters/quizPresenter';
import QuizMenu from '../Presenters/quizMenuPresenter';
import QuizMenuView from './quizMenuView';
import {RouterProvider,createBrowserRouter, Router, Route} from 'react-router-dom';
import { Button, Container, Switch, ThemeProvider} from "@mui/material"
import {theme} from "../theme";
import LoginView from './loginView';
import PrivateRoute from './PrivateRoute';
import AuthenticationPresenter from '../Presenters/authenticationPresenter';


function App() {

  const router = createBrowserRouter([
    {
      path: "/",
      element: <PrivateRoute><AuthenticationView /></PrivateRoute>,
      // element:<AuthenticationView />
    },
    {
      path: "/pokedex",
      element: <Pokedex />,
    },
    {
      path: "/menu",
      element: <Menu />,
    },
    {
      path: "/quiz",
      element: <Quiz />,
    },
    {
      path: "/quizmenu",
      element: <QuizMenu />,
    },
  ]);

  return (
      <ThemeProvider theme={theme}>
        <div>

            <AuthenticationPresenter>


              <RouterProvider router={router} />


            </AuthenticationPresenter>

        </div>
      </ThemeProvider>
  );
}

export default App;

