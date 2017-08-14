import React from 'react';
import { PropTypes } from 'prop-types';
import momentPropTypes from 'react-moment-proptypes';
import { forbidExtraProps } from 'airbnb-prop-types';
import { forEach } from 'lodash';
import moment from 'moment';
import 'moment/locale/zh-tw';
import OrderNote from 'components/OrderNote';
// import { DayPickerRangeController } from 'react-dates';
import 'styles/react-dates-override.scss';
import { DayPickerRangeController } from '../CustomCalendar/anbnbCal';

import Container from '../Container';


class Calendar extends React.Component {

  static defaultProps = {
    dispatchCalendar: null,
    dispatchReset: null,
    bCode: 0,
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

    navPrev: PropTypes.node,
    navNext: PropTypes.node,

    onPrevMonthClick: PropTypes.func,
    onNextMonthClick: PropTypes.func,

    // i18n
    monthFormat: PropTypes.string,

    //isRTL: PropTypes.bool,
  });
  constructor(props) {
    super(props);
    this.bCode = 0x00000000;
    moment.locale('zh-tw');
    this.startDate = moment().startOf('month');
    this.endDate = moment().endOf('month');
    this.currentMonth = this.startDate.month();
  }

  componentDidMount() {
    console.log('DID MOUNT');
    this.props.dispatchCalendar(this.startDate.valueOf(), this.endDate.valueOf());
  }

  componentWillUnmount() {
    console.log('DID UNMOUNT');
    this.props.dispatchReset();
  }

  changeMonth(number) {
    this.startDate.add(number, 'month');
    this.endDate.add(number, 'month');
    this.currentMonth = this.startDate.month();
    this.props.dispatchCalendar(this.startDate.valueOf(), this.endDate.valueOf());
  }

  renderNavigation() {
    return (
      <div style={{ height: 80 }}>
        <button
          className="button"
          style={{ width: '200px', float: 'left' }}
          onClick={() => { this.changeMonth(-1); }}
        >
          上一個月
        </button>
        <button
          className="button"
          style={{ width: '200px', float: 'right' }}
          onClick={() => { this.changeMonth(1); }}
        >
          下一個月
        </button>
      </div>
    );
  }
  render() {
    const { myCalendar } = this.props;
    const { records, isFetching } = myCalendar;
    // console.log(this.props);
    if (records.length === 0 && isFetching) {
      return (
        <Container titleText={'行事曆'}>
          { this.renderNavigation()}
        </Container>
      )
    }

    if (isFetching === false) {
      // start encode calibration
      this.bCode = 0x00000000;
      forEach(records, (order) => {
        // console.log(order.cid_no);
        const startDate = moment(order.leasestart);
        const endDate = moment(order.leaseend);
        const startMonth = startDate.month();
        const endMonth = endDate.month();
        const startDay = (startMonth < this.currentMonth) ? 1 : startDate.date();
        const endDay = (endMonth > this.currentMonth) ? moment().endOf('month').date() : endDate.date();
        const lowMask = ~((2 ** startDay) - 1);
        const upperMask = ((2 * (2 ** endDay)) - 1);
        const result = upperMask & lowMask;
        this.bCode = (this.bCode | result);
      });
    }

    return (
      <Container titleText={'行事曆'}>
        { this.renderNavigation() }
        <div className="clear">
          <DayPickerRangeController
            disableFocusedInput
            hiddenChangeMonthButton
            language={'zh-tw'}
            initialVisibleMonth={() => this.startDate }
            isDayBlocked={() => true }
            isDayHighlighted={(momentObj) => {
              return (this.bCode & (2 ** momentObj.date()));
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
