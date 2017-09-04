import { asyncXhrPost } from 'lib/xhr';


// =============================================
// = action type =
// =============================================
const prefix = action => (`USERPROFILE.${action}`);

export const FETCHING = prefix('FETCHING');
export const FETCHED = prefix('FETCHED');
export const TRACK_FETCHED = prefix('TRACK_FETCHED');
export const COMMENTS_FETCHED = prefix('COMMENTS_FETCHED');

// =============================================
// = actions =
// =============================================
const fetchingUser = () => ({
  type: FETCHING,
});

const fetchedUser = detail => ({
  type: FETCHED,
  detail,
});

const fetchedTrack = track => ({
  type: TRACK_FETCHED,
  track,
});

const fetchedComments = comments => ({
  type: COMMENTS_FETCHED,
  comments,
});


export function fetchUser(uid) {
  return (dispatch, getState) => {
    dispatch(fetchingUser());
    asyncXhrPost(
      '/ajax/public_user_info.json',
      { isShowItem: false, uid },
      getState(),
    )
    .then((responseData) => {
      const { user_profile } = responseData;
      dispatch(fetchedUser(user_profile));
      asyncXhrPost(
        '/ajax/get_track_count.json',
        { uid },
        getState(),
      )
      .then((track) => {
        dispatch(fetchedTrack(track));
      });
      asyncXhrPost(
        '/ajax/get_comments_count.json',
        { uid },
        getState(),
      )
      .then((comments) => {
        dispatch(fetchedComments(comments));
      });
    });
  };
}


// =============================================
// = reducer =
// =============================================
const initialState = {
  isFetching: false,
  detail: null,
  comments: {
    owner_comments_count: 0,
    lessee_comments_count: 0,
  },
  track: {
    tracked_user_count: 0,
    fans_count: 0,
  },
};

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCHING:
      return Object.assign({}, state, {
        isFetching: true,
      });

    case FETCHED:
      return Object.assign({}, state, {
        isFetching: false,
        detail: action.detail,
      });

    case TRACK_FETCHED:
      return Object.assign({}, state, {
        isFetching: false,
        track: action.track,
      });

    case COMMENTS_FETCHED:
      return Object.assign({}, state, {
        isFetching: false,
        comments: action.comments,
      });

    default:
      return state;
  }
};
