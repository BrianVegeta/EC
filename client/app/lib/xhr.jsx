/* eslint-disable import/prefer-default-export */

import { browserHistory } from 'react-router';
import * as paths from 'lib/paths';

export const POST = {
  credentials: 'same-origin',
  method: 'POST',
  headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
};
export const GET = {
  credentials: 'same-origin',
  method: 'GET',
  headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
};

const SETTINGS = {
  credentials: 'same-origin',
  headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
};
const setup = method => Object.assign({}, SETTINGS, { method });
const SETTINGS_POST = setup('POST');
const SETTINGS_GET = setup('GET');
const SETTINGS_DELETE = setup('DELETE');

export const fetchRequest = (path, settings, body, callback) => {
  fetch(path, { ...settings, body })
  .then(response => response.json())
  .then(json => callback(json))
  .catch((err) => { throw err; });
};
export const fetchPostRequest = (path, body, callback) => {
  fetch(path, { ...SETTINGS_POST, body })
  .then(response => response.json())
  .then(json => callback(json))
  .catch((err) => { throw err; });
};
export const fetchGetRequest = (path, callback) => {
  fetch(path, { ...SETTINGS_GET })
  .then(response => response.json())
  .then(json => callback(json))
  .catch((err) => { throw err; });
};
export const fetchDeleteRequest = (path, body, callback) => {
  fetch(path, { ...SETTINGS_DELETE, body })
  .then(response => response.json())
  .then(json => callback(json))
  .catch((err) => { throw err; });
};

// FETCH GET 不需登入的
export const fetchXhrGet = (path, successCallback, failCallback = null) => {
  fetch(path, { ...SETTINGS_GET })
  .then(response => response.json())
  .then((json) => {
    const { success } = json;

    if (success) {
      successCallback(json);
    } else if (failCallback) {
      failCallback(json);
    }
  })
  .catch((err) => { throw err; });
};

// FETCH GET 需要登入的
export const fetchXhrAuthedGet = (path, state, successCallback, failCallback = null) => {
  fetch(path, { ...SETTINGS_GET })
  .then(response => response.json())
  .then((json) => {
    const { success, logouted } = json;

    if (success) {
      successCallback(json);
    } else if (logouted) {
      browserHistory.push({
        pathname: paths.LOGIN,
        referrer: state.routing.locationBeforeTransitions.pathname,
      });
    } else if (failCallback) {
      failCallback(json);
    }
  })
  .catch((err) => { throw err; });
};

// POST FETCH 不需登入的
export const fetchXhrPost = (path, body, successCallback, failCallback = null) => {
  const jsonBody = JSON.stringify(body);
  fetch(path, { ...SETTINGS_POST, body: jsonBody })
  .then(response => response.json())
  .then((json) => {
    const { success } = json;

    if (success) {
      successCallback(json);
    } else if (failCallback) {
      failCallback(json);
    }
  })
  .catch((err) => { throw err; });
};

// POST FETCH 需登入的
export const fetchXhrAuthedPost = (path, body, state, successCallback, failCallback = null) => {
  const jsonBody = JSON.stringify(body);
  fetch(path, { ...SETTINGS_POST, body: jsonBody })
  .then(response => response.json())
  .then((json) => {
    const { success, logouted } = json;

    if (success) {
      successCallback(json);
    } else if (logouted) {
      browserHistory.push({
        pathname: paths.LOGIN,
        referrer: state.routing.locationBeforeTransitions.pathname,
      });
    } else if (failCallback) {
      failCallback(json);
    }
  })
  .catch((err) => { throw err; });
};
