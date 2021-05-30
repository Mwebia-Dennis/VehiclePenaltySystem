import { createStore, applyMiddleware,compose } from 'redux';
import thunk from 'redux-thunk';
import reducer from './reducers/combinedReducer';


export default function store(){
    
    const initialState = {}
    return createStore(
        reducer,
      initialState,
      compose(
        applyMiddleware(thunk),
        window.devToolsExtension ? window.devToolsExtension() : f => f
      )
    );
  }