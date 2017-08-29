import { fromJS } from 'immutable';
import { asyncXhrAuthedPost } from 'lib/xhr';
// =============================================
// = settings =
// =============================================
export const REDUCER_KEY = 'myProfile';
const prefix = action => (`MY.PROFILE.${action}`);

// =============================================
// = ACTION TYPE =
// =============================================
const CHANGE_DATA = prefix('CHANGE_DATA');
const RESET = prefix('RESET');


// =============================================
// = ACTIONS =
// =============================================
export const changeData = data => ({
  type: CHANGE_DATA,
  data,
});

const transformState = ({
  picture,
  name,
  city,
  area,
  autobiography,
  website,
  occupation,
  bkg_img,
}) => ({
  picture,
  name: name || null,
  city: city || '',
  area: area || '',
  autobiography: autobiography || '',
  website: website || '',
  occupation: occupation || '',
  bkg_img,
});

export const fetchUserprofile = () =>
  (dispatch, getState) => {
    asyncXhrAuthedPost(
      '/ajax/get_userprofile.json',
      getState(),
    ).then((data) => {
      dispatch(changeData(transformState(data)));
    }).catch();
  };

const transformParams = ({
  picture,
  name,
  city, area,
  autobiography,
  website,
  occupation,
}) => ({
  picture,
  name: name || null,
  city: city || null,
  area: area || null,
  autobiography: autobiography || null,
  website: website || null,
  occupation: occupation || null,
});

export const updateUserprofile = () =>
  (dispatch, getState) =>
    new Promise((resolve, reject) => {
      const { data } = getState()[REDUCER_KEY];
      asyncXhrAuthedPost(
        '/ajax/save_userprofile.json',
        transformParams(data),
        getState(),
      ).then(() => resolve(data)).catch(() => reject());
    });

// =============================================
// = REDUCER =
// =============================================
const initialState = {
  data: {
    picture: null,
    name: '',
    city: '',
    area: '',
    autobiography: '',
    website: '',
    occupation: '',
    bkg_img: '',
  },
};

export default (state = initialState, action) => {
  switch (action.type) {

    case CHANGE_DATA:
      return fromJS(state).updateIn(
        ['data'],
        data => data.merge(action.data),
      ).toJS();

    case RESET:
      return initialState;

    default:
      return state;
  }
};
