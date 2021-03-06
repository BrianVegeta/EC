import React from 'react';
import PropTypes from 'prop-types';
import momentPropTypes from 'react-moment-proptypes';
import classnames from 'classnames/bind';
import { DateRangePicker } from 'react-dates';
import ArrowLeft from 'react-icons/lib/md/keyboard-arrow-left';
import ArrowDown from 'react-icons/lib/md/keyboard-arrow-down';
import ArrowRight from 'react-icons/lib/md/keyboard-arrow-right';
import moment from 'moment';
import 'moment/locale/zh-tw';
import { isToday, inDates } from 'lib/time';
import hasDatesError from 'components/Input/hoc/hasDatesError';
import 'styles/react-dates-override.scss';
import CSS from 'react-css-modules';
import styles from './styles.sass';


const inlineStyle = `
  .CalendarDay--blocked-calendar, .CalendarDay--blocked-calendar:active  {
      background: #f1f1f1;
  }
`;
const cx = classnames.bind(styles);
class Dates extends React.Component {

  static defaultProps = {
    startDate: null,
    endDate: null,
    preparation: 0,
    minPicks: 0,
    isOutsideRange: undefined,
    showHint: true,
  };

  static propTypes = {
    startDate: momentPropTypes.momentObj,
    endDate: momentPropTypes.momentObj,
    preparation: PropTypes.number,
    minPicks: PropTypes.number,
    onDatesChange: PropTypes.func.isRequired,
    isOutsideRange: PropTypes.func,
    showHint: PropTypes.bool,
    onBlur: PropTypes.func.isRequired, // for hasError
  };

  static todayDate() {
    return moment().format('YYYY-MM-DD');
  }

  static renderDay(momentObj) {
    return momentObj.format('D');
  }

  static renderMonth(momentObj) {
    momentObj.locale('zh-tw');
    return momentObj.format('MMMM YYYY');
  }

  constructor(props) {
    super(props);
    this.state = {
      focusedInput: null,
    };

    this.openStartDate = this.openStartDate.bind(this);
    this.openEndDate = this.openEndDate.bind(this);
    this.resetInputs = this.resetInputs.bind(this);
    this.renderCalendarInfo = this.renderCalendarInfo.bind(this);
    this.isDayBlocked = this.isDayBlocked.bind(this);
    this.onDatesChange = this.onDatesChange.bind(this);
    this.onClose = this.onClose.bind(this);
  }

  onDatesChange({ startDate, endDate }) {
    this.props.onDatesChange({ startDate, endDate });
    if (startDate && endDate) {
      setTimeout(this.onClose, 150);
    }
  }

  onClose() {
    this.setState({ focusedInput: null });
    this.props.onBlur();
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

  resetInputs() {
    this.props.onDatesChange({
      startDate: null, endDate: null,
    });
    setTimeout(this.onClose, 150);
  }

  isDayBlocked(day) {
    const { preparation } = this.props;
    if (preparation === null) return false;
    if (preparation === 0) return false;

    const today = moment();
    const daysLater = today.add(preparation, 'days');
    return inDates(day, today, daysLater) || isToday(day);
  }

  renderCalendarInfo() {
    const { showHint } = this.props;
    return (
      <div className={`${cx('calendarInfo')} clear`}>
        <button
          className={`button ${cx('reset')}`}
          onClick={this.resetInputs}
        >
          清除
        </button>
        {showHint && <div className={cx('notice')}>• 最少租用天數</div>}
      </div>
    );
  }

  render() {
    moment.locale('zh-tw');
    const { startDate, endDate, isOutsideRange } = this.props;
    return (
      <div styleName="container">
        <style>{inlineStyle}</style>
        <DateRangePicker
          ref={dp => (this.dp = dp)}
          {...{ startDate, endDate, isOutsideRange }}
          onDatesChange={this.onDatesChange}
          focusedInput={this.state.focusedInput}
          onFocusChange={focusedInput => this.setState({ focusedInput })}
          numberOfMonths={1}
          customArrowIcon={
            <div>
              <div className={cx('dateInputArrow', 'start')}>
                <ArrowDown onClick={this.openStartDate} />
              </div>
              <div className={cx('dateInputArrow', 'end')}>
                <ArrowDown onClick={this.openEndDate} />
              </div>
            </div>
          }
          startDatePlaceholderText="開始日"
          endDatePlaceholderText="結束日"
          renderDay={this.constructor.renderDay}
          renderMonth={this.constructor.renderMonth}
          hideKeyboardShortcutsPanel
          keepOpenOnDateSelect
          enableOutsideDays
          navPrev={<ArrowLeft />}
          navNext={<ArrowRight />}
          displayFormat="YYYY/MM/DD"
          isDayBlocked={this.isDayBlocked}
          minimumNights={this.props.minPicks}
          renderCalendarInfo={this.renderCalendarInfo}
          onClose={this.onClose}
        />
      </div>
    );
  }
}

export default hasDatesError(CSS(Dates, styles));
