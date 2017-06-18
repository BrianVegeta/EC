/* eslint-disable import/prefer-default-export */

export const fetchRequest = (path, settings, body, callback) => {
  fetch(path, { ...settings, body })
  .then(response => response.json())
  .then(data => callback(data))
  .catch((err) => { throw err; });
};
