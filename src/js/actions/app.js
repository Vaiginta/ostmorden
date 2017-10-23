import {
  TOGGLE,
  FETCH_DATA,
  SET_CURRENT_PATH
 } from '../action_types.js';

import axios from 'axios';

export const toggle = (path) => {

  return {
    type: TOGGLE,
    path
 };
};

export const fetchData = (apiPath, path) => dispatch => {
  axios.get('http://feature-code-test.skylark-cms.qa.aws.ostmodern.co.uk:8000/api/'+apiPath+'/')
    .then((response) => {
      console.log(response.data);
      return dispatch({
        type: FETCH_DATA,
        data:response.data.objects,
        path,
        currentPath:path
      });
    })
    .catch(err => {
      console.log(err);
    });
}


export const fetchSetsAndImages= () => dispatch => {
  let base = 'http://feature-code-test.skylark-cms.qa.aws.ostmodern.co.uk:8000/api/';
  let getImages = axios.get(base + 'images/');
  let getSets = axios.get(base + 'sets/');
  let paths = ['images', 'sets']
  Promise.all([getImages, getSets])
    .then((response) => {
      response.forEach((res,i) => {
        dispatch({
          type: FETCH_DATA,
          data:res.data.objects,
          path:paths[i],
          currentPath:'sets'
        });
      });
    })
    .catch(err => {
      console.log(err);
    });
}

export const setCurrentPath = (path) => {
  type: SET_CURRENT_PATH,
  path
};

export const fetchAll = (apis, paths) => (dispatch, getState) => {
  const apiPaths = apis.map(path => 'http://feature-code-test.skylark-cms.qa.aws.ostmodern.co.uk:8000/api/'+path);
  const getData = apiPaths.map(path => {
    return axios.get(path);
  });
  let currentPath = getState().getIn(['app', 'currentPath']);
  Promise.all([...getData]).then(response => {
    response.forEach((res, i) => {
      let data = res.data.length === 1 ? res.data[0] : res.data;
      dispatch({
        type: FETCH_DATA,
        data,
        path: paths[i],
        currentPath
      });
    });

  }).catch(err => console.log(err))
}
