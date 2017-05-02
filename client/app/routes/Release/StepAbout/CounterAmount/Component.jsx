import React, { PropTypes } from 'react';

class Counter extends React.Component {
  constructor(props) {
    super(props);
    this.countUp = this.countUp.bind(this);
    this.countDown = this.countDown.bind(this);
    this.state = {
      amount: 1,
    };
  }

  countUp() {
    this.setState({ amount: this.state.amount + 1 });
  }

  countDown() {
    this.setState({ amount: this.state.amount - 1 });
  }

  isCountUpAvailable() {
    return true;
  }

  isCountDownAvailable() {
    return this.state.amount > 1;
  }

  countDownButton() {
    return (
      <button
        className="button"
        styleName="countUp"
        onClick={this.countDown}
      >
        <span className="fa fa-minus" />
      </button>
    );
  }

  countDownDisabled() {
    return (
      <button className="button" styleName="countUpDisable">
        <span className="fa fa-minus" />
      </button>
    );
  }

  render() {
    return (
      <div styleName="inputControl">
        <div styleName="counters">
          {this.isCountDownAvailable() ?
            this.countDownButton() :
            this.countDownDisabled()}
          <button
            className="button"
            styleName="countDown"
            onClick={this.countUp}
          >
            <span className="fa fa-plus" />
          </button>
        </div>
        <div styleName="inputField">
          {this.state.amount}
        </div>
      </div>
    );
  }
}

export default Counter;
