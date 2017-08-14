import React from 'react';
import PropTypes from 'prop-types';
import momentPropTypes from 'react-moment-proptypes';
import classnames from 'classnames/bind';
import { DateRangePicker } from 'react-dates';
import moment from 'moment';
import ArrowLeft from 'react-icons/lib/md/keyboard-arrow-left';
import ArrowDown from 'react-icons/lib/md/keyboard-arrow-down';
import ArrowRight from 'react-icons/lib/md/keyboard-arrow-right';

import hasError from 'components/Input/hoc/hasError';

import 'styles/react-dates-override.scss';
import CSS from 'react-css-modules';
import styles from './styles.sass';

const cx = classnames.bind(styles);
class Dates extends React.PureComponent {

  static defaultProps = {
    startDate: null,
    endDate: null,
    onBlur: null,
  };

  static propTypes = {
    startDate: momentPropTypes.momentObj,
    endDate: momentPropTypes.momentObj,
    onDatesChange: PropTypes.func.isRequired,
    // for hasError
    onBlur: PropTypes.func,
  };

  static renderDay(momentObj) {
    return momentObj.format('D');
    // return (
    //   <div>
    //     <div>{momentObj.format('D')}</div>
    //     {momentObj.isSame(moment(), 'd') &&
    //       <span>1</span>
    //     }
    //   </div>
    // );
  }

  constructor(props) {
    super(props);
    this.state = {
      focusedInput: null,
    };
    this.openStartDate = this.openStartDate.bind(this);
    this.openEndDate = this.openEndDate.bind(this);
    this.onDatesChange = this.onDatesChange.bind(this);
    this.onClose = this.onClose.bind(this);
  }

  onClose() {
    const { onBlur } = this.props;
    if (onBlur) {
      onBlur();
    }
  }

  onDatesChange(startDate, endDate) {
    // update dates range
    this.props.onDatesChange(startDate, endDate);
  }

  onFocusChange(focusedInput) {
    this.setState({ focusedInput });
  }

  openCalendar(inputType) {
    this.dp.onDateRangePickerInputFocus(inputType);
  }

  openStartDate() {
    this.openCalendar('startDate');
  }

  openEndDate() {
    this.openCalendar('endDate');
  }

  renderDownArrow(inputType) {
    switch (inputType) {
      case 'startDate':
        return (
          <div className={cx('dateinputStartArrow')}>
            <ArrowDown onClick={this.openStartDate} />
          </div>
        );
      case 'endDate':
        return (
          <div className={cx('dateinputEndArrow')}>
            <ArrowDown onClick={this.openEndDate} />
          </div>
        );
      default:
        return null;
    }
  }

  render() {
    moment.locale('zh-tw');
    const { startDate, endDate } = this.props;

    return (
      <DateRangePicker
        ref={dp => (this.dp = dp)}
        onClose={this.onClose}
        startDate={startDate}
        endDate={endDate}
        onDatesChange={this.onDatesChange}
        focusedInput={this.state.focusedInput}
        onFocusChange={focusedInput => this.setState({ focusedInput })}
        numberOfMonths={1}
        customArrowIcon={
          <div className={cx('inputArrows')}>
            {this.renderDownArrow('startDate')}
            {this.renderDownArrow('endDate')}
          </div>
        }
        startDatePlaceholderText="開始日"
        endDatePlaceholderText="結束日"
        renderDay={this.constructor.renderDay}
        hideKeyboardShortcutsPanel
        keepOpenOnDateSelect
        navPrev={<ArrowLeft />}
        navNext={<ArrowRight />}
        displayFormat="YYYY/MM/DD"
      />
    );
  }
}

export default hasError(CSS(Dates, styles));
