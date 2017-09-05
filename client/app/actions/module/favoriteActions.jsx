/* eslint-disable import/prefer-default-export */
import { fetchXhrGet, fetchXhrPost } from 'lib/xhr';

export function addFavorite(pid, waiting, done) {
  return (dispatch) => {
    waiting();
    fetchXhrPost(
      `/ajax/add_fav.json`,
      { pid: pid },
      (response) => {

         done();
      },
    );
  };
}

export function removeFavorite(pid, waiting, done) {
    return (dispatch) => {
      waiting();
      fetchXhrPost(
        `/ajax/remove_fav.json`,
        { pid: pid },
        (response) => {

           done();
        },
      );
    };
  }
