import React, { useState } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

// React Router

import {Route,Switch,BrowserRouter as Router,Link} from 'react-router-dom';

// toast

import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';

// firebase

import firebase from 'firebase/app';
import 'firebase/auth';

// Components

import Home from './Pages/Home.js';
import Signin from './Pages/Signin';
import Signup from './Pages/Signup';
import PageNotFound from './Pages/PageNotFound';
import { UserContext } from './context/userContext';
import Footer from './layout/footer';
import Header from './layout/Header';

import firebaseConfig from './Config/firebaseConfig'
//init firebase
firebase.initializeApp(firebaseConfig)


const App =()=> {

  const[user,setUser]=useState(null)

  return (
    <Router>
      <ToastContainer />
        <UserContext.Provider value={{user,setUser}}>
          <Header />
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/signin" component={Signin} />
            <Route exact path="/signup" component={Signup} />
            <Route exact path="*" component={PageNotFound} />
          </Switch>
          <Footer />
        </UserContext.Provider>
    </Router>
  );
}

export default App;
