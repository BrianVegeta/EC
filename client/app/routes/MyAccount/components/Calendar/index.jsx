import React from 'react';
import { PropTypes } from 'prop-types';
import momentPropTypes from 'react-moment-proptypes';
import { forbidExtraProps } from 'airbnb-prop-types';
import { forEach } from 'lodash';
import moment from 'moment';
import OrderNote from 'components/OrderNote';

import DayPickerRangeController from '../CustomCalendar/anbnbCal/src/components/DayPickerRangeController';

import Container from '../Container';
import './override.scss';

class Calendar extends React.Component {

  static defaultProps = {
    dispatchCalendar: null,
    dispatchReset: null,
    bCode: 0,
    // example props for the demo
    // autoFocusEndDate: false,
    // initialStartDate: moment().startOf('month'),
    // initialEndDate: moment().endOf('month'),

    // day presentation and interaction related props
    // renderDay: null,
    // minimumNights: 1,
    // isDayBlocked: () => true,
    // isOutsideRange: day => !isInclusivelyAfterDay(day, moment()),
    // isDayHighlighted: () => false,
    // enableOutsideDays: false,

    // calendar presentation and interaction related props
    // orientation: HORIZONTAL_ORIENTATION,
    // withPortal: false,
    // initialVisibleMonth: null,
    // numberOfMonths: 2,
    // onOutsideClick() {},
    // keepOpenOnDateSelect: false,
    // renderCalendarInfo: null,
    // isRTL: false,

    // navigation related props
    navPrev: null,
    navNext: null,
    onPrevMonthClick() {},
    onNextMonthClick() {},

    // internationalization
    monthFormat: 'MMMM YYYY',
  };

  static propTypes = forbidExtraProps({
    dispatchCalendar: PropTypes.func,
    dispatchReset: PropTypes.func,
    bCode: PropTypes.number,
    // example props for the demo
    // autoFocusEndDate: PropTypes.bool,
    // initialStartDate: momentPropTypes.momentObj,
    // initialEndDate: momentPropTypes.momentObj,

    // keepOpenOnDateSelect: PropTypes.bool,
    // minimumNights: PropTypes.number,
    // isOutsideRange: PropTypes.func,
    // isDayBlocked: PropTypes.func,
    // isDayHighlighted: PropTypes.func,

    // DayPicker props
    // enableOutsideDays: PropTypes.bool,
    // numberOfMonths: PropTypes.number,
    // orientation: ScrollableOrientationShape,
    // withPortal: PropTypes.bool,
    // initialVisibleMonth: PropTypes.func,
    // renderCalendarInfo: PropTypes.func,

    navPrev: PropTypes.node,
    navNext: PropTypes.node,

    onPrevMonthClick: PropTypes.func,
    onNextMonthClick: PropTypes.func,
    // onOutsideClick: PropTypes.func,
    // renderDay: PropTypes.func,

    // i18n
    monthFormat: PropTypes.string,

    //isRTL: PropTypes.bool,
  });
  constructor(props) {
    super(props);
    this.bCode = 0x00000000;
  }

  componentDidMount() {
    console.log('DID MOUNT');
    this.props.dispatchCalendar(moment().startOf('month').valueOf(),
     moment().endOf('month').valueOf());
  }

  componentWillUnmount() {
    console.log('DID UNMOUNT');
    this.props.dispatchReset();
  }

  render() {
    const { myCalendar } = this.props;
    const { records, isFetching } = myCalendar;
    console.log(this.props);
    if (myCalendar == null || isFetching) {
      return null;
    }

    if (isFetching === false) {
      // start encode calibration
      this.bCode = 0x00000000;
      forEach(records, (order) => {
        console.log(order.cid_no);
        let startDate = moment(order.leasestart);
        let endDate = moment(order.leaseend);
        let startMonth = startDate.month();
        let endMonth = endDate.month();
        let startDay = (startMonth < 8) ? 1 : startDate.date();
        let endDay = (endMonth > 8) ? moment().endOf('month').date() : endDate.date();
        console.log(startDay);
        console.log(endDay);
        let lowMask = ~((2 ** startDay) - 1);
        let upperMask = ((2 * (2 ** endDay)) - 1);
        console.log(lowMask);
        console.log(upperMask);
        let result = upperMask & lowMask;
        console.log(result);
        this.bCode = (this.bCode | result);
      });
      console.log(this.bCode);
    }
   // const { focusedInput, startDate, endDate } = this.state;
   /*
   const props = omit(this.props, [
     'autoFocus',
     'autoFocusEndDate',
     'initialStartDate',
     'initialEndDate',
   ]);*/
   /*
   let startDate = 2;
   let lowMask = ~((2 ** startDate) - 1);
   let endDate = 10;
   let upperMask = ((2 * (2 ** endDate)) - 1);
   let result = upperMask & lowMask;
   */
   // const startDateString = startDate && startDate.format('YYYY-MM-DD');
   // const endDateString = endDate && endDate.format('YYYY-MM-DD');
    console.log(this.state);
    console.log('calendar render');
    console.log(records.length);
    const startDate = moment().startOf('month').add(-2, 'month');
    const endDate = moment().endOf('month').add(-2, 'month');
    console.log(startDate);
    console.log(endDate);
    return (
      <Container titleText={'行事曆'}>
        <div>
          <DayPickerRangeController
            navPrev={<span />}
            navNext={<span />}
            startDate={startDate}
            endDate={endDate}
            onPrevMonthClick={() => {}}
            onNextMonthClick={() => {}}
            isDayBlocked={() => true }
            disabled
            isDayHighlighted={(momentObj) => {
              //console.log('calculation');
              //console.log(2 ** momentObj.date());
              //console.log(this.state.bCode);
              //console.log('calculation end');
              return (this.bCode & (2 ** momentObj.date())  );

            }}
          />
        </div>
        <div>
          {records.map((order, index) => (
            <OrderNote
              key={`${index + 1}`}
              startDate={order.leasestart}
              endDate={order.leaseend}
              cidNo={order.cid_no}
              itemName={order.pname}
              itemImgUrl={order.img1}
              totalPrice={order.totalfee}
            />
          ))}
        </div>
      </Container>
    );
  }
}
export default Calendar;
