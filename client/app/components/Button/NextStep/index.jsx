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
    status: STATUS_DISABLE,
  };

  static propTypes = {
    status: PropTypes.oneOf([
      STATUS_DISABLE,
      STATUS_LOADING,
      STATUS_VALID,
    ]),
    onClick: PropTypes.func.isRequired,
  };

  render() {
    const { status, onClick } = this.props;

    return {
      [STATUS_DISABLE]: (
        <button
          className={`button ${cx('button', 'disabled')}`}
          onClick={onClick}
        >
          下一步
        </button>
      ),
      [STATUS_LOADING]: (
        <button className={`button ${cx('button', 'disabled')}`}>
          <div styleName="loading-icon">
            <ThreeBounce size={9} color="#B8B8B8" />
          </div>
          儲存中
        </button>
      ),
      [STATUS_VALID]: (
        <button
          className={`button ${cx('button', 'active')}`}
          onClick={onClick}
        >
          下一步
        </button>
      ),
    }[status];
  }
}

export default CSS(NextStep, styles);
