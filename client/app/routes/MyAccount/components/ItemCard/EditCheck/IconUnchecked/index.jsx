import React from 'react';
import PropTypes from 'prop-types';
import CSS from 'react-css-modules';
import styles from './styles.sass';

class Icon extends React.Component {
  static defaultProps = {
    size: 20,
    color: '#333',
  };
  static propTypes = {
    size: PropTypes.number,
    color: PropTypes.string,
  };
  render() {
    const { color, size } = this.props;
    return <div styleName="container" style={{ borderColor: color, width: size, height: size }} />;
  }
}

export default CSS(Icon, styles);
