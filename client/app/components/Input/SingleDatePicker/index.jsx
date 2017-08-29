import React from 'react';
import PropTypes from 'prop-types';
import momentPropTypes from 'react-moment-proptypes';
import { SingleDatePicker } from 'react-dates';
import moment from 'moment';
import 'moment/locale/zh-tw';

import hasDatesError from 'components/Input/hoc/hasDatesError';
import 'styles/react-dates-override.scss';
import CSS from 'react-css-modules';
import styles from './styles.sass';

class Dates extends React.Component {

  static defaultProps = {
    startDate: null,
    earliestStart: moment(),
  };

  static propTypes = {
    startDate: momentPropTypes.momentObj,
    earliestStart: momentPropTypes.momentObj,
    onDatesChange: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      focused: false,
    };
    this.onDateChanged = this.onDateChanged.bind(this);
    this.onBlockCheck = this.onBlockCheck.bind(this);
  }

  onDateChanged(date) {
    const { onDatesChange } = this.props;
    this.state.focused = false;
    onDatesChange({ startDate: date });
  }

  onBlockCheck(date) {
    const { earliestStart } = this.props;
    const check = date.isBefore(earliestStart, 'day');
    return check;
  }

  render() {
    moment.locale('zh-tw');
    const { startDate } = this.props;
    return (
      <div>
        <style>
          {`
            .CalendarDay--blocked-calendar, .CalendarDay--blocked-calendar:active  {
              background: #f1f1f1;
            }
          `}
        </style>
        <SingleDatePicker
          date={startDate}
          focused={this.state.focused}
          onDateChange={this.onDateChanged}
          isDayBlocked={this.onBlockCheck}
          onFocusChange={focused => this.setState(focused)}
          numberOfMonths={1}
        />
      </div>
    );
  }
}

export default hasDatesError(CSS(Dates, styles));
