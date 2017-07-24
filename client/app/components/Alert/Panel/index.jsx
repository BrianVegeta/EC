import React from 'react';
import PropTypes from 'prop-types';
import myPropTypes from 'propTypes';
import _ from 'lodash';
import ErrorIcon from 'react-icons/lib/md/error-outline';

import CSS from 'react-css-modules';
import styles from './styles.sass';

class AlertPanel extends React.Component {

  static defaultProps = {
    text: null,
    outerStyle: null,
  };

  static propTypes = {
    text: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
    ]),
    outerStyle: myPropTypes.style,
  };

  render() {
    const { text, outerStyle } = this.props;
    if (_.isEmpty(text)) return null;
    return (
      <div
        className="clear"
        styleName="container"
        style={outerStyle}
      >
        <div styleName="icon">
          <ErrorIcon size={22} />
        </div>
        <div styleName="text">{text}</div>
      </div>
    );
  }
}

export default CSS(AlertPanel, styles);
