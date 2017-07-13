import * as types from 'constants/actionTypes/schedule';
import * as stages from 'constants/scheduleStages';

const initialState = {
  name: '',
  stage: '',
  jobs: [], // function collection
};

export default function (state = initialState, action) {
  switch (action.type) {

    case types.SETUP:
      return Object.assign({}, state, {
        stage: stages.INIT,
        name: action.name,
        jobs: action.jobs,
      });

    case types.START:
      return Object.assign({}, state, {
        stage: stages.PROCESSING,
        jobs: state.jobs.slice(1),
      });

    case types.MOVE_TO_NEXT:
      return Object.assign({}, state, {
        jobs: state.jobs.slice(1),
      });

    case types.ABANDON:
      return initialState;

    case types.DONE:
      return initialState;

    default:
      return state;
  }
}
