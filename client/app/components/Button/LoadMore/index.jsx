import React from 'react';
import PropTypes from 'prop-types';

import ThreeBounce from 'components/Loading/ThreeBounce';

import classnames from 'classnames/bind';
import styles from './styles.sass';

const cx = classnames.bind(styles);
class ButtonLoadMore extends React.Component {

  static defaultProps = {
    isLoading: false,
  };

  static propTypes = {
    isLoading: PropTypes.bool,
    onClick: PropTypes.func.isRequired,
  };

  render() {
    const {
      onClick,
      isLoading,
    } = this.props;

    if (isLoading) {
      return (
        <button className={`button ${cx('disable-button')}`} >
          <div className={cx('loading')}>
            <ThreeBounce size={9} color="#B8B8B8" />
            <span className={cx('loading-text')}>載入中</span>
          </div>
        </button>
      );
    }

    return (
      <button className={`button ${cx('load-more-button')}`} onClick={onClick} >
        <div className={cx('content')}>載入更多</div>
      </button>
    );
  }
}

export default ButtonLoadMore;
