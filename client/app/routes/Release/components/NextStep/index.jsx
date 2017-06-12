import React, { PropTypes } from 'react';
import { ThreeBounce } from 'better-react-spinkit';
import classnames from 'classnames/bind';
import _ from 'lodash';
import CSS from 'react-css-modules';
import styles from './styles.sass';

const classbinding = classnames.bind(styles);
class NextStep extends React.Component {
  static defaultProps = {
    isDisabled: false,
    beforeNext: null,
    waitingCount: null,
  };
  static propTypes = {
    isDisabled: PropTypes.bool,
    beforeNext: PropTypes.func,
    waitingCount: PropTypes.number,
    onNext: PropTypes.func.isRequired,
    onValid: PropTypes.func.isRequired,
  };
  constructor(props) {
    super(props);
    this.onReadyClick = this.onReadyClick.bind(this);
    this.onDisabledClick = this.onDisabledClick.bind(this);
    this.toNext = this.toNext.bind(this);
    this.state = { isLoading: false };
  }
  componentDidUpdate() {
    const { beforeNext, waitingCount } = this.props;
    const { isLoading } = this.state;
    if (isLoading && !_.isNull(waitingCount) && beforeNext) {
      if (waitingCount === 0) {
        this.toNext();
      }
    }
  }
  onDisabledClick() {
    console.log('disable click');
    this.props.onValid();
  }
  onReadyClick() {
    const { beforeNext } = this.props;
    if (beforeNext) {
      beforeNext();
      // callback container 處理
    } else {
      setTimeout(this.toNext, 1000);
    }
    this.props.onValid();
    this.setState({ isLoading: true });
  }
  getClickEvent() {
    if (this.props.isDisabled) {
      return this.onDisabledClick;
    } else if (!this.state.isLoading) {
      return this.onReadyClick;
    }
    return null;
  }
  toNext() {
    this.props.onNext();
  }
  render() {
    const { isDisabled } = this.props;
    const { isLoading } = this.state;
    const btnClassbindings = classbinding({
      disableButton: isDisabled || isLoading,
      activeButton: !(isDisabled || isLoading),
      button: true,
    });
    const buttonProps = {
      className: `${btnClassbindings} button`,
      onClick: this.getClickEvent(),
    };
    return (
      <button {...buttonProps}>
        { isLoading ? <ThreeBounce color="#666" /> : '下一步' }
      </button>
    );
  }
}

export default CSS(NextStep, styles);
