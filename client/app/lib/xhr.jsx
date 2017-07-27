/* eslint-disable import/prefer-default-export */
import { browserHistory } from 'react-router';
import * as paths from 'lib/paths';

const SETTINGS = {
  credentials: 'same-origin',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
};
const setup = method => Object.assign({}, SETTINGS, { method });
const SETTINGS_POST = setup('POST');
const SETTINGS_GET = setup('GET');
const SETTINGS_DELETE = setup('DELETE');

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
// DELETE FETCH 不需要登入
export const fetchXhrDelete = (path, successCallback, failCallback = null) => {
  fetch(path, { ...SETTINGS_DELETE })
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


// ASYNC
// ASYNC GET
export const asyncXhrGet = path =>
  new Promise((resolve, reject) => {
    fetch(path, { ...SETTINGS_GET })
    .then(response => response.json())
    .then((json) => {
      if (json.success) {
        resolve(json.data);
      } else {
        reject();
      }
    })
    .catch((err) => { throw err; });
  });
export const asyncXhrAuthedGet = (path, state) =>
  new Promise((resolve, reject) => {
    fetch(path, { ...SETTINGS_GET })
    .then(response => response.json())
    .then((json) => {
      if (json.success) {
        resolve(json.data);
      } else if (json.logouted) {
        browserHistory.push({
          pathname: paths.LOGIN,
          referrer: state.routing.locationBeforeTransitions.pathname,
        });
      } else {
        reject(json);
      }
    })
    .catch((err) => { throw err; });
  });

// ASYNC POST
export const asyncXhrPost = (path, params) =>
  new Promise((resolve, reject) => {
    fetch(path, { ...SETTINGS_POST, body: JSON.stringify(params) })
    .then(response => response.json())
    .then((json) => {
      if (json.success) {
        resolve(json.data);
      } else {
        reject();
      }
    })
    .catch((err) => { throw err; });
  });

// ASYNC POST
export const asyncXhrAuthedPost = (path, params, state) =>
  new Promise((resolve, reject) => {
    fetch(path, { ...SETTINGS_POST, body: JSON.stringify(params) })
    .then(response => response.json())
    .then((json) => {
      const { success, logouted } = json;

      if (success) {
        resolve(json.data);
      } else if (logouted) {
        browserHistory.push({
          pathname: paths.LOGIN,
          referrer: state.routing.locationBeforeTransitions.pathname,
        });
      } else {
        reject(json);
      }
    })
    .catch((err) => { throw err; });
  });
