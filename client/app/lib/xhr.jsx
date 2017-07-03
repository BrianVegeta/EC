/* eslint-disable import/prefer-default-export */
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
export const fetchXhrGet = (path, successCallback, failCallback) => {
  fetch(path, { ...SETTINGS_GET })
  .then(response => response.json())
  .then((json) => {
    const { success } = json;
    if (success) {
      successCallback(json);
    } else {
      failCallback(json);
    }
  })
  .catch((err) => { throw err; });
};
