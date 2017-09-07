import { asyncXhrPost } from 'lib/xhr';


// =============================================
// = action type =
// =============================================
const prefix = action => (`USERPROFILE.${action}`);

export const FETCHING = prefix('FETCHING');
export const FETCHED = prefix('FETCHED');
export const ISTRACK = prefix('ISTRACK');
export const UPDATETRACK = prefix('UPDATETRACK');
export const TRACK_FETCHED = prefix('TRACK_FETCHED');
export const COMMENTS_FETCHED = prefix('COMMENTS_FETCHED');

const AUTH_KEY = 'auth';

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

const fetchedIsTrack = isTrack => ({
  type: ISTRACK,
  isTrack,
});

const UpdateTrack = isTrack => ({
  type: UPDATETRACK,
  isTrack,
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
      const { isLogin, currentUser } = getState()[AUTH_KEY];
      if (isLogin && currentUser !== uid) {
        asyncXhrPost(
          '/ajax/check_track.json',
          { target_uid: uid },
          getState(),
        )
        .then((isTrack) => {
          dispatch(fetchedIsTrack(isTrack));
        });
      }
    });
  };
}

export function addToTrack(uid) {
  return (dispatch) => {
    asyncXhrPost(
      '/ajax/add_track.json',
      { target_uid: uid },
    )
    .then(() => {
      dispatch(UpdateTrack(true));
    });
  };
}

export function removeFromTrack(uid) {
  return (dispatch) => {
    asyncXhrPost(
      '/ajax/remove_track.json',
      { target_uid: uid },
    )
    .then(() => {
      dispatch(UpdateTrack(false));
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
  isTrack: false,
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
        track: action.track,
      });

    case COMMENTS_FETCHED:
      return Object.assign({}, state, {
        comments: action.comments,
      });

    case ISTRACK:
      return Object.assign({}, state, {
        isTrack: action.isTrack,
      });

    case UPDATETRACK: {
      const count = action.isTrack ? state.track.fans_count + 1 :
        state.track.fans_count - 1;
      return Object.assign({}, state, {
        isTrack: action.isTrack,
        track: {
          tracked_user_count: state.track.tracked_user_count,
          fans_count: count,
        },
      });
    }

    default:
      return state;
  }
};
