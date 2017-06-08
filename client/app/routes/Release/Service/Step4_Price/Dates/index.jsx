import React, { PropTypes } from 'react';
import { DateRangePicker, SingleDatePicker, DayPickerRangeController } from 'react-dates';
import CSS from 'react-css-modules';
import styles from './styles.sass';
import 'react-dates/lib/css/_datepicker.css';

class Dates extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      startDate: null,
      endDate: null,
      focusedInput: null,
    };
  }
  test(day) {
    return day.format('D');
  }
  render() {
    return (
      <DateRangePicker
        startDate={this.state.startDate} // momentPropTypes.momentObj or null,
        endDate={this.state.endDate} // momentPropTypes.momentObj or null,
        onDatesChange={({ startDate, endDate }) => this.setState({ startDate, endDate })}
        focusedInput={this.state.focusedInput} // PropTypes.oneOf([START_DATE, END_DATE]) or null,
        onFocusChange={focusedInput => this.setState({ focusedInput })}
        numberOfMonths={1}
        customArrowIcon={<div />}
        startDatePlaceholderText="開始日"
        endDatePlaceholderText="結束日"
        renderDay={this.test}
        hideKeyboardShortcutsPanel
      />
    );
  }
}

export default CSS(Dates, styles);
