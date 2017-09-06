/* eslint-disable import/prefer-default-export */
import { asyncXhrAuthedPost } from 'lib/xhr';

// =============================================
// = actions =
// =============================================


export function sendReport(pid, reason) {
  return (dispatch, getState) =>
    new Promise((resolve, reject) => {
      asyncXhrAuthedPost(
        '/ajax/send_report.json',
        { pid, reason },
        getState(),
      )
      .then(() => {
        resolve();
      }).catch(() => reject());
    });
}
