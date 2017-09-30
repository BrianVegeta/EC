import React from 'react';
import PropTypes from 'prop-types';
import ThreeBounce from 'components/Loading/ThreeBounce';
import classnames from 'classnames/bind';

import CSS from 'react-css-modules';
import styles from './styles.sass';


export const STATUS_DISABLE = 'STATUS_DISABLE';
export const STATUS_LOADING = 'STATUS_LOADING';
export const STATUS_VALID = 'STATUS_VALID';

const cx = classnames.bind(styles);
class NextStep extends React.Component {

  static defaultProps = {
    text: '下一步',
    status: STATUS_DISABLE,
  };

  static propTypes = {
    text: PropTypes.string.isRequired,
    status: PropTypes.oneOf([
      STATUS_DISABLE,
      STATUS_LOADING,
      STATUS_VALID,
    ]),
    onClick: PropTypes.func.isRequired,
  };

  static renderDisable({ onClick, text }) {
    return (
      <button
        className={`button ${cx('button', 'disabled')}`}
        onClick={onClick}
      >
        {text}
      </button>
    );
  }

  static renderLoading() {
    const loadingIcon = (
      <div styleName="loading-icon">
        <ThreeBounce size={9} color="#B8B8B8" />
      </div>
    );
    return (
      <button className={`button ${cx('button', 'disabled')}`}>
        {loadingIcon}儲存中
      </button>
    );
  }

  static renderValid({ onClick, text }) {
    return (
      <button
        className={`button ${cx('button', 'active')}`}
        onClick={onClick}
      >
        {text}
      </button>
    );
  }

  constructor(props) {
    super(props);
    this.state = {
      status: null,
    };
    this.onClickNext = this.onClickNext.bind(this);
  }

  onClickNext() {
    const { onClick, status } = this.props;
    const callback = onClick;
    this.setState({
      status: (status === STATUS_VALID) ? STATUS_LOADING : null,
    }, callback);
  }

  render() {
    const {
      renderDisable,
      renderLoading,
      renderValid,
    } = this.constructor;
    const { text } = this.props;
    return {
      [STATUS_DISABLE]: renderDisable({ onClick: this.onClickNext, text }),
      [STATUS_LOADING]: renderLoading(),
      [STATUS_VALID]: renderValid({ onClick: this.onClickNext, text }),
    }[this.state.status || this.props.status];
  }
}

export default CSS(NextStep, styles);
