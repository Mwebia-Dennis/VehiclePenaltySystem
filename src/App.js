
import './App.css';
import { useRoutes } from 'react-router-dom'
import { routes } from './components/routes/index';
import { SnackbarProvider } from 'notistack';

function App() {

  const routing = useRoutes(routes);
  return (
  <SnackbarProvider maxSnack={3}>
    {routing}
  </SnackbarProvider>)
}

export default App;
