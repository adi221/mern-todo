import {useSelector, useDispatch, TypedUseSelectorHook} from 'react-redux';
import {bindActionCreators} from 'redux'
import type { RootState, AppDispatch } from '../store/store';
import * as actionCreators from '../actionCreators/todoActionCreators';

export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export const useActions = () => {
  const dispatch = useAppDispatch();

  return bindActionCreators(actionCreators, dispatch);
};
