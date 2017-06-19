/* eslint-disable import/prefer-default-export */
import ReactOnRails from 'react-on-rails';

export const GET = {
  credentials: 'same-origin',
  method: 'GET',
  headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
};

export const UPLOAD_PUT = {
  credentials: 'same-origin',
  method: 'PUT',
  headers: {
    'X-CSRF-Token': ReactOnRails.authenticityToken(),
  },
};
export const POST = {
  credentials: 'same-origin',
  method: 'POST',
  headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
};
