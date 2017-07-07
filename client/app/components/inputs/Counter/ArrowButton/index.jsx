import React from 'react'
import PropTypes from 'prop-types';
import IconDown from 'react-icons/lib/md/keyboard-arrow-down';
import IconUp from 'react-icons/lib/md/keyboard-arrow-up';
import classnames from 'classnames/bind';
import CSS from 'react-css-modules';
import styles from './styles.sass';

const cx = classnames.bind(styles);

class ArrowButton extends React.Component {

  static defaultProps = {
    clickDisabled: false,
  };

  static propTypes = {
    direction: PropTypes.oneOf(['up', 'down']).isRequired,
    onClick: PropTypes.func.isRequired,
    clickDisabled: PropTypes.bool,
  };

  render() {
    const {
      onClick,
      direction,
      clickDisabled,
    } = this.props;
    return (
      <button
        className={`button ${cx(
          'container',
          direction,
          { petrified: clickDisabled },
        )}`}
        onClick={clickDisabled ? null : onClick}
      >
        <div className={cx('arrowIcon')}>
          {direction === 'up' && <IconUp size={22} />}
          {direction === 'down' && <IconDown size={22} />}
        </div>
      </button>
    );
  }
}

export default CSS(ArrowButton, styles);
