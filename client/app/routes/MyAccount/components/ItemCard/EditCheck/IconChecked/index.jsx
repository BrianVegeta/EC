import React from 'react';
import PropTypes from 'prop-types';
import Check from 'react-icons/lib/md/check';
import CSS from 'react-css-modules';
import styles from './styles.sass';

class Icon extends React.Component {
  static defaultProps = {
    size: 20,
    color: '#333',
    innerColor: '#fff',
  };
  static propTypes = {
    size: PropTypes.number,
    color: PropTypes.string,
    innerColor: PropTypes.string,
  };
  render() {
    const { color, innerColor, size } = this.props;
    return (
      <div
        styleName="container"
        style={{ backgroundColor: color, width: size, height: size }}
      >
        <Check size={size} color={innerColor} />
      </div>
    );
  }
}

export default CSS(Icon, styles);
