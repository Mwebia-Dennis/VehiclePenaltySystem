
import './App.css';
import { useRoutes } from 'react-router-dom'
import { routes } from './components/routes/index';
import { SnackbarProvider } from 'notistack';
import axios from 'axios';
import { useSelector,useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { getUserDetails } from './store/reducers/auth/auth.actions';

function App() {

  const dispatch = useDispatch()
  const authReducer = useSelector((state) => state.authReducer)
  const routing = useRoutes(routes(authReducer.authenticated, getVerified(), getEmail()));
  // axios.defaults.baseURL = 'http://127.0.0.1:8000/api/'
  axios.defaults.baseURL = 'https://vehicle-penalty-api.herokuapp.com/api/'



  function getVerified () {
    return ("verified" in authReducer.data)?authReducer.data.verified:-1
  }
  function getEmail () {
    return ("email" in authReducer.data)?authReducer.data.email:""
  }

  useEffect(() => {
    
    dispatch(getUserDetails())

  }, [''])


  return (
  <SnackbarProvider maxSnack={3}>
    {

      routing
      
    }
  </SnackbarProvider>)
}

export default App;
