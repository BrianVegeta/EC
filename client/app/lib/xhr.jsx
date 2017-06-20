/* eslint-disable import/prefer-default-export */
export const POST = {
  credentials: 'same-origin',
  method: 'POST',
  headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
};


export const fetchRequest = (path, settings, body, callback) => {
  fetch(path, { ...settings, body })
  .then(response => response.json())
  .then(data => callback(data))
  .catch((err) => { throw err; });
};
export const fetchPostRequest = (path, body, callback) => {
  const settings = POST;
  fetch(path, { ...settings, body })
  .then(response => response.json())
  .then(data => callback(data))
  .catch((err) => { throw err; });
};
