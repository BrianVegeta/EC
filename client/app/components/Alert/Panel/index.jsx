import React from 'react';
import PropTypes from 'prop-types';
import myPropTypes from 'propTypes';
import { isEmpty } from 'lodash';
import ErrorIcon from 'react-icons/lib/md/error-outline';

import classnames from 'classnames/bind';
import CSS from 'react-css-modules';
import styles from './styles.sass';

const cx = classnames.bind(styles);

class AlertPanel extends React.Component {

  static defaultProps = {
    text: null,
    outerStyle: null,
    width: '100%',
  };

  static propTypes = {
    text: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
    ]),
    outerStyle: myPropTypes.style,
    width: PropTypes.oneOf(['100%', 'auto']),
  };

  render() {
    const { text, outerStyle, width } = this.props;
    if (isEmpty(text)) return null;

    return (
      <div
        className={`clear ${
          cx('container', {
            'auto-width': (width === 'auto'),
            'full-width': (width === '100%'),
          })
        }`}
        style={outerStyle}
      >
        <div styleName="icon"><ErrorIcon size={22} /></div>
        <div styleName="text">{text}</div>
      </div>
    );
  }
}

export default CSS(AlertPanel, styles);
