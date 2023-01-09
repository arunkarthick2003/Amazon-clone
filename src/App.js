import './App.css';
import React,{ useEffect } from 'react';
import Header from './Header';
import Home from './Home';
import Checkout from './Checkout'
import {BrowserRouter as Router,Routes,Route} from 'react-router-dom';
import Login from './Login';
import { auth } from './firebase';
import { useStateValue } from './StateProvider';
import Payment from './Payment';
import Orders from './Orders';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';

const promise=loadStripe("pk_test_51ML5uPSIu4JSwVQPsM84bPyyNoinnLhKFaHnEStJ7WqQAA8jVL21YCOP5osDGPmaLZ7oZ2QqcaljaGH0Sjb96ywu00YzrOHTxq");

function App() {
  const [{}, dispatch]=useStateValue();
  //listener to keep track of signin
  useEffect(()=>{
    //it will work only once when the app components loads...
    //onAuthStateChanged acts as a listener and keep track of the login activity
    auth.onAuthStateChanged(authUser=>{
      console.log('THE USER IS >>>',authUser);
      if(authUser){
        //the user just logged in
        dispatch({
          type: 'SET_USER',
          user: authUser,
        })
      }
      else{
        //the user is logged out
        dispatch({
          type: 'SET_USER',
          user: null,
        })
      }

    })
  },[])

  return (
    //BEM
    <Router>
      <div className="app">
        <Routes>
          <Route path="/" 
          element={
            <>
              {" "}
              <Header />
              <Home />
            </>
          } />
          <Route path="/checkout" element={
            <>
            {" "}
            <Header />
            <Checkout />
          </>
          } />
          <Route path="/payment" element={
            <>
            {" "}
            <Header />
            <Elements stripe={promise}>
              <Payment />
            </Elements>
          </>
          } />
          <Route path="/orders" element={
            <>
            {" "}
            <Header />
            <Orders />
          </>
          } />
          {/* <Route path="/login" element={[<Login />]}></Route> */}
        </Routes>
        <Routes>
          <Route path="/login" element={[<Login />]}></Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
