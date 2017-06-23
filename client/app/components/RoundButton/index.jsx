import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import classnames from 'classnames/bind';
import CSS from 'react-css-modules';
import styles from './styles.sass';

const cx = classnames.bind(styles);
class RoundButton extends React.Component {
  static defaultProps = {
    isActive: false,
    path: null,
    onClick: null,
  };
  static propTypes = {
    path: PropTypes.string,
    onClick: PropTypes.func,
    text: PropTypes.string.isRequired,
    isActive: PropTypes.bool,
  };
  render() {
    const { path, onClick, text, isActive } = this.props;
    if (path) {
      return (
        <div className={cx('container', { active: isActive })}>
          <Link to={path} styleName="innerText" >{text}</Link>
        </div>
      );
    }
    return (
      <button
        className={`button ${cx('container', { active: isActive })}`}
        onClick={onClick}
      >
        <div styleName="innerText">{text}</div>
      </button>
    );
  }
}

export default CSS(RoundButton, styles);
