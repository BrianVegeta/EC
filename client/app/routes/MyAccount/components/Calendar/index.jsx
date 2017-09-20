import React from 'react';
import { PropTypes } from 'prop-types';

import { forEach } from 'lodash';
import moment from 'moment';
import 'moment/locale/zh-tw';
import AcccountNav from 'constants/myAccountNavs';
import OrderNote from 'components/OrderNote';
import SimpleCalendar from 'components/SimpleCalendar';
import 'styles/react-dates-override.scss';

import Container from '../Container';

const titleName = AcccountNav.calendar.text;
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

  static propTypes = {
    dispatchCalendar: PropTypes.func,
    dispatchReset: PropTypes.func,
    myCalendar: PropTypes.shape({
      isFetching: PropTypes.bool,
    }).isRequired,
  };


  constructor(props) {
    super(props);
    this.bCode = 0x00000000;
    moment.locale('zh-tw');
    this.startDate = moment().startOf('month');
    this.endDate = moment().endOf('month');
    this.currentMonth = this.startDate.month();
  }

  componentDidMount() {
    this.props.dispatchCalendar(this.startDate.valueOf(), this.endDate.valueOf());
  }

  componentWillUnmount() {
    this.props.dispatchReset();
  }

  changeMonth(number) {
    this.startDate.add(number, 'month');
    this.endDate.add(number, 'month');
    this.currentMonth = this.startDate.month();
    this.props.dispatchCalendar(this.startDate.valueOf(), this.endDate.valueOf());
  }

  render() {
    const { myCalendar } = this.props;
    const { records, isFetching } = myCalendar;
    // console.log(this.props);
    if (records.length === 0 && isFetching) {
      return (
        <Container titleText={'行事曆'}>
          <div style={{ height: 400 }} />
        </Container>
      );
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
      <Container titleText={titleName}>
        <div className="clear">
          <SimpleCalendar
            date={this.startDate}
            onPickDate={() => {}}
            onNextMonth={() => this.changeMonth(1)}
            onPrevMonth={() => this.changeMonth(-1)}
            checkHighlight={DayOfMonth => (this.bCode & (2 ** DayOfMonth))}
            renderDay={date => (
              <span
                style={{ fontWeight: date.isSame(moment(), 'day') ? 700 : 400 }}
              >
                {date.format('D')}
              </span>
            )}
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
