
import './App.css';
import { useRoutes } from 'react-router-dom'
import { routes } from './components/routes/index';
import { SnackbarProvider } from 'notistack';
import axios from 'axios';
import { useSelector,useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { getUserDetails } from './store/reducers/auth/auth.actions';

function App() {

  const dispatch = useDispatch()
  const authReducer = useSelector((state) => state.authReducer)
  //authReducer.authenticated
  const routing = useRoutes(routes(true));
  //axios.defaults.baseURL = 'http://127.0.0.1:8000/api/'
   axios.defaults.baseURL = 'https://vehicle-penalty-api.herokuapp.com/api/'
  useEffect(() => {
    
    dispatch(getUserDetails())

  }, [''])

  return (
  <SnackbarProvider maxSnack={3}>
    {routing}
  </SnackbarProvider>)
}

export default App;
