/* eslint-disable import/prefer-default-export */
import _ from 'lodash';

import * as types from 'constants/actionTypes/schedule';
import * as names from 'constants/schedules';

import {
  popupNewPassword,
  popupCheckPassword,
  popupBankInfoSetup,
  closePopup,
} from 'modules/popup';
import {
  asyncCheckPasswordExist,
} from 'actions/secrecyVerificationActions';


const setupSchedule = ({ name, jobs }) => ({
  type: types.SETUP,
  name,
  jobs,
});

const start = () => ({
  type: types.START,
});

const moveToNext = () => ({
  type: types.MOVE_TO_NEXT,
});

const done = () => ({
  type: types.DONE,
});

export function startProcessSchedule() {
  return (dispatch, getState) => {
    const { jobs } = getState().schedule;
    if (_.isEmpty(jobs)) throw new Error('schedule empty');

    _.head(jobs)();
    dispatch(start());
  };
}

export function nextProcess() {
  return (dispatch, getState) => {
    const { jobs } = getState().schedule;

    if (_.isEmpty(jobs)) {
      dispatch(done());
      return;
    }

    _.head(jobs)();
    if (jobs.length === 1) {
      dispatch(done());
      return;
    }
    dispatch(moveToNext());
  };
}

function setupReservationBankInfo(hasPassword = true) {
  return (dispatch) => {
    const popupNewPasswordFunc = () => dispatch(popupNewPassword({}, 500));
    const popupCheckPasswordFunc = () => dispatch(popupCheckPassword({}, 500));
    const popupBankSetupFunc = () => dispatch(popupBankInfoSetup({}, 600));
    const closePopupFunc = () => dispatch(closePopup());

    dispatch(
      setupSchedule({
        name: names.BANK_INFO_MODAL,
        jobs: [
          hasPassword ? popupCheckPasswordFunc : popupNewPasswordFunc,
          popupBankSetupFunc,
          closePopupFunc,
        ],
      }),
    );
  };
}

export function modalBankSetup() {
  return (dispatch, getState) => {
    asyncCheckPasswordExist(getState()).then(exist =>
      dispatch(setupReservationBankInfo(exist)),
    );
  };
}
