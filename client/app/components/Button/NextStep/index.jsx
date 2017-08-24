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
    const className = `button ${cx('button', 'disabled')}`;
    return (
      <button className={className} onClick={onClick}>
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
    const className = `button ${cx('button', 'disabled')}`;
    return (
      <button className={className}>
        {loadingIcon}儲存中
      </button>
    );
  }

  static renderValid({ onClick, text }) {
    const className = `button ${cx('button', 'active')}`;
    return (
      <button className={className} onClick={onClick} >
        {text}
      </button>
    );
  }

  render() {
    const { status, onClick, text } = this.props;

    return {
      [STATUS_DISABLE]: this.constructor.renderDisable({ onClick, text }),
      [STATUS_LOADING]: this.constructor.renderLoading(),
      [STATUS_VALID]: this.constructor.renderValid({ onClick, text }),
    }[status];
  }
}

export default CSS(NextStep, styles);
