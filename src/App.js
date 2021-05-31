
import './App.css';
import { useRoutes } from 'react-router-dom'
import { routes } from './components/routes/index';
import { SnackbarProvider } from 'notistack';
import axios from 'axios';

function App() {

  const routing = useRoutes(routes);
  //axios.defaults.baseURL = 'http://127.0.0.1:8000/api/'
  axios.defaults.baseURL = 'https://vehicle-penalty-api.herokuapp.com/api/'

  return (
  <SnackbarProvider maxSnack={3}>
    {routing}
  </SnackbarProvider>)
}

export default App;
