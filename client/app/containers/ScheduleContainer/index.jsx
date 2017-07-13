import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { INIT } from 'constants/scheduleStages';
import { startProcessSchedule } from 'actions/scheduleActions';


class ScheduleContainer extends React.Component {

  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    schedule: PropTypes.shape({
      stage: PropTypes.string,
      name: PropTypes.string,
      jobs: PropTypes.array,
    }).isRequired,
  };

  componentDidUpdate(prevProps, prevState) {
    const { jobs, stage, name } = this.props.schedule;
    if (stage === INIT) {
      this.props.dispatch(startProcessSchedule());
    }
  }

  render() {
    return null;
  }
}

const mapStateToProps = (state) => {
  const { schedule } = state;
  return { schedule };
};
export default connect(mapStateToProps)(ScheduleContainer);
