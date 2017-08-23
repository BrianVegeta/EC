import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import momentPropTypes from 'react-moment-proptypes';
import createDateObjects from './createDateObjects';
import './styles.css';

class Calendar extends Component {
  static propTypes = {
    /** Week offset*/
    weekOffset: PropTypes.number.isRequired,
    /** The current date as a moment objecct */
    date: momentPropTypes.momentObj,
    /** Function to render a day cell */
    renderDay: PropTypes.func,
    /** Called on next month click */
    onNextMonth: PropTypes.func,
    /** Called on prev month click */
    onPrevMonth: PropTypes.func,
    /** Called when some of the navigation controls are clicked */
    onChangeMonth: PropTypes.func,
    // /** Called when a date is clicked */
    // onPickDate: PropTypes.func
    checkHighlight: PropTypes.func,
    // Called func must return true / false
    // input is Month of Days of current month
  };

  static defaultProps = {
    weekOffset: 0,
    renderDay: day => day.format('YYYY-MM-D'),
    date: moment(),
    onNextMonth: () => {},
    onPrevMonth: () => {},
    onChangeMonth: () => {},
    checkHighlight: () => false,
    // onPickDate: () => {},
  };

  handleNextMonth = () => {
    if (this.props.onNextMonth) {
      return this.props.onNextMonth();
    }

    this.props.onChangeMonth(this.props.date.clone().add(1, 'months'));
  };

  handlePrevMonth = () => {
    if (this.props.onPrevMonth) {
      return this.props.onPrevMonth();
    }

    this.props.onChangeMonth(this.props.date.clone().subtract(1, 'months'));
  };

  render() {
    const {
      date,
      weekOffset,
      renderDay,
      checkHighlight,
    } = this.props;

    return (
      <div className="Calendar">
        <div className="Calendar-header">
          <button onClick={this.handlePrevMonth}>上一月</button>
          <div className="Calendar-header-currentDate">
            {date.format('MMMM YYYY')}
          </div>
          <button onClick={this.handleNextMonth}>下一月</button>
        </div>
        <div className="Calendar-header-grid">
          <div className="Calendar-header-grid-item">日</div>
          <div className="Calendar-header-grid-item">一</div>
          <div className="Calendar-header-grid-item">二</div>
          <div className="Calendar-header-grid-item">三</div>
          <div className="Calendar-header-grid-item">四</div>
          <div className="Calendar-header-grid-item">五</div>
          <div className="Calendar-header-grid-item">六</div>
        </div>
        <div className="Calendar-grid">
          {createDateObjects(date, weekOffset, checkHighlight).map((day, i) => (
            <div
              key={`day-${i}`}
              className={`Calendar-grid-item ${day.classNames || ''}`}
            >
              {renderDay(day.day)}
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default Calendar
