import React, { PropTypes } from 'react';
import Spinner from 'react-spinkit';
import CSS from 'react-css-modules';
import styles from './styles.sass';

class NextStep extends React.Component {
  static defaultProps = {
    isDisabled: false,
  };
  static propTypes = {
    isDisabled: PropTypes.bool,
    onNext: PropTypes.func.isRequired,
    onValid: PropTypes.func.isRequired,
  };
  constructor(props) {
    super(props);
    this.onClick = this.onClick.bind(this);
    this.onDisabledClick = this.onDisabledClick.bind(this);
    this.state = { isLoading: false };
  }
  onDisabledClick() {
    this.props.onValid();
  }
  onClick() {
    setTimeout(() => this.props.onNext(), 1000);
    this.props.onValid();
    this.setState({ isLoading: true });
  }
  render() {
    const { isDisabled } = this.props;
    const { isLoading } = this.state;
    if (isDisabled) {
      return (
        <button
          styleName="disableButton"
          onClick={this.onDisabledClick}
          className="button"
        >
          下一步
        </button>
      );
    }
    if (isLoading) {
      return (
        <button styleName="disableButton" className="button">
          <Spinner name="three-bounce" color="#666" />
        </button>
      );
    }
    return (
      <button
        styleName="activeButton"
        onClick={this.onClick}
        className="button"
      >
        下一步
      </button>
    );
  }
}

export default CSS(NextStep, styles);
