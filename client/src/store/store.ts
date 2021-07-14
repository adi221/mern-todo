import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import {composeWithDevTools} from 'redux-devtools-extension';
import todoReducer from '../reducers/todoReducer';

const middlewares = [thunk];
const middlewareEnhancer = applyMiddleware(...middlewares)

const store = createStore(todoReducer, composeWithDevTools(middlewareEnhancer));

console.log(store.getState());

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store;