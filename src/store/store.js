import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import reducer from './reducers/combinedReducer';


export default function store() {

    const initialState = {}
    return createStore(
        reducer,
        initialState,
        applyMiddleware(thunk)
    );
}