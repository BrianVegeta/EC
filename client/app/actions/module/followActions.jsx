/* eslint-disable import/prefer-default-export */
import { fetchXhrGet, fetchXhrPost } from 'lib/xhr';

export function addFollowAction(target_uid, waiting, done) {
  return (dispatch) => {
    waiting();
    fetchXhrPost(
      `/ajax/add_follow.json`,
      { target_uid: target_uid },
      (response) => {
         done();
      },
    );
  };
}

export function removeFollowAction(target_uid, waiting, done) {
    return (dispatch) => {
      waiting();
      fetchXhrPost(
        `/ajax/remove_follow.json`,
        { target_uid: target_uid },
        (response) => {
           done();
        },
      );
    };
  }
