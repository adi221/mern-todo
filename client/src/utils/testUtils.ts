import {createStore, applyMiddleware, Store} from 'redux';
import todoReducer from '../reducers/todoReducer'; /* import rootReducer if use more reducres*/
import {middlewares} from '../store/store';
import {ShallowWrapper} from 'enzyme';

/**
 * Function to find a component by it's data-test attribute
 * @function findByTestAttribute
 * @param {ShallowWarapper} component that will be shallow wrapped
 * @param {string} attr Attribute to find
 * @returns {JSX.Element}
 */

export const findByTestAttr = (component: ShallowWrapper , attr: string): ShallowWrapper => {
  const wrapper = component.find(`[data-test='${attr}']`);
  return wrapper;
};

/**
 * Create a testing store with imported reducers, middleware,and initial state
 *  globals: rootReducer, middlewares.
 * @function storeFactory
 * @param {object} initialState Initial state for the store.
 * @returns {store} Redux store
 */
export const storeFactory = (): Store=> {
  return createStore(todoReducer, applyMiddleware(...middlewares));
};