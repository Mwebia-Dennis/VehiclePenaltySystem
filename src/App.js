
import './App.css';
import { useRoutes } from 'react-router-dom'
import { routes } from './components/routes/index';

function App() {

  const routing = useRoutes(routes);
  return routing;
}

export default App;
