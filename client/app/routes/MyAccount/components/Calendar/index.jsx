import React from 'react';
import { PropTypes } from 'prop-types';
import momentPropTypes from 'react-moment-proptypes';
import { forbidExtraProps } from 'airbnb-prop-types';
import omit from 'lodash/omit';
import moment from 'moment';
import OrderNote from 'components/OrderNote';

import { DayPickerRangeController } from 'react-dates';

import { START_DATE, END_DATE, HORIZONTAL_ORIENTATION } from './extra/constants';
import isInclusivelyAfterDay from './extra/isInclusivelyAfterDay';
import ScrollableOrientationShape from './extra/ScrollableOrientationShape';
import Container from '../Container';
import './override.scss';

class Calendar extends React.Component {

  static defaultProps = {
    // example props for the demo
    autoFocusEndDate: false,
    initialStartDate: null,
    initialEndDate: null,

    // day presentation and interaction related props
    renderDay: null,
    minimumNights: 1,
    isDayBlocked: () => true,
    isOutsideRange: day => !isInclusivelyAfterDay(day, moment()),
    isDayHighlighted: () => false,
    enableOutsideDays: false,

    // calendar presentation and interaction related props
    orientation: HORIZONTAL_ORIENTATION,
    withPortal: false,
    initialVisibleMonth: null,
    numberOfMonths: 2,
    onOutsideClick() {},
    keepOpenOnDateSelect: false,
    renderCalendarInfo: null,
    isRTL: false,

    // navigation related props
    navPrev: null,
    navNext: null,
    onPrevMonthClick() {},
    onNextMonthClick() {},

    // internationalization
    monthFormat: 'MMMM YYYY',
  };

  static propTypes = forbidExtraProps({
    // example props for the demo
    autoFocusEndDate: PropTypes.bool,
    initialStartDate: momentPropTypes.momentObj,
    initialEndDate: momentPropTypes.momentObj,

    keepOpenOnDateSelect: PropTypes.bool,
    minimumNights: PropTypes.number,
    isOutsideRange: PropTypes.func,
    isDayBlocked: PropTypes.func,
    isDayHighlighted: PropTypes.func,

    // DayPicker props
    enableOutsideDays: PropTypes.bool,
    numberOfMonths: PropTypes.number,
    orientation: ScrollableOrientationShape,
    withPortal: PropTypes.bool,
    initialVisibleMonth: PropTypes.func,
    renderCalendarInfo: PropTypes.func,

    navPrev: PropTypes.node,
    navNext: PropTypes.node,

    onPrevMonthClick: PropTypes.func,
    onNextMonthClick: PropTypes.func,
    onOutsideClick: PropTypes.func,
    renderDay: PropTypes.func,

    // i18n
    monthFormat: PropTypes.string,

    isRTL: PropTypes.bool,
  });

  constructor(props) {
    super(props);

    this.state = {
      focusedInput: props.autoFocusEndDate ? END_DATE : START_DATE,
      startDate: props.initialStartDate,
      endDate: props.initialEndDate,
    };

    this.onDatesChange = this.onDatesChange.bind(this);
    this.onFocusChange = this.onFocusChange.bind(this);
  }

  componentDidMount() {

  }

  componentWillUnmount() {

  }

  onDatesChange({ startDate, endDate }) {
    this.setState({ startDate, endDate });
  }

  onFocusChange(focusedInput) {
    this.setState({
      // Force the focusedInput to always be truthy so that dates are always selectable
      focusedInput: !focusedInput ? START_DATE : focusedInput,
    });
  }


  render() {
   const { showInputs } = this.props;
   const { focusedInput, startDate, endDate } = this.state;

   const props = omit(this.props, [
     'autoFocus',
     'autoFocusEndDate',
     'initialStartDate',
     'initialEndDate',
   ]);

   const startDateString = startDate && startDate.format('YYYY-MM-DD');
   const endDateString = endDate && endDate.format('YYYY-MM-DD');

    console.log('calendar render');
    return (
      <Container titleText={'行事曆'}>
        <div>
          <DayPickerRangeController
            isDayBlocked={() => true}
            isDayHighlighted={(momentObj) => {
              console.log(momentObj.format());
              return (momentObj.day() === 0);
            }}
            onDatesChange={this.onDatesChange}
            onFocusChange={this.onFocusChange}
            focusedInput={focusedInput}
            startDate={startDate}
            endDate={endDate}
          />
        </div>
        <OrderNote/>
        <OrderNote/>
        <OrderNote/>
      </Container>
    );
  }
}
export default Calendar;
