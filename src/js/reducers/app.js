import Immutable, { Map } from 'immutable';
import createReducer
  from './createReducer.js';
import {
  TOGGLE,
  FETCH_DATA,
  SET_CURRENT_PATH
} from '../action_types.js';

export const initialState = Immutable.fromJS({
  currentPath:[]
});

export const toggle = (state, {path}) => {
  let currentValue = state.get(path);

  return state.set(path, !currentValue);
};

export const fetchData = (state, {data, path, currentPath}) => {
  return state.setIn(['data', path], data).setIn(['currentPath'], currentPath);
};

export const setCurrentPath = (state, {path}) => {
  return state.setIn(['currentPath'], path);
}

export default createReducer(
  initialState,
  {
    [TOGGLE] : toggle,
    [FETCH_DATA] : fetchData,
    [SET_CURRENT_PATH] : setCurrentPath
  }
);
