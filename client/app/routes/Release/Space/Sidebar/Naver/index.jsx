import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import IconLock from 'react-icons/lib/md/lock';
import CSS from 'react-css-modules';
import styles from './styles.sass';

class Naver extends React.Component {
  static defaultProps = {
    isValid: true,
    isTouched: true,
  };
  static propTypes = {
    isValid: PropTypes.bool,
    isTouched: PropTypes.bool,
    text: PropTypes.string.isRequired,
  };
  render() {
    return (
      <div styleName="container">
        <div styleName="icon">
          <IconLock size="25" />
        </div>
        <div styleName="text">{this.props.text}</div>
      </div>
    );
  }
}

export default CSS(Naver, styles);
