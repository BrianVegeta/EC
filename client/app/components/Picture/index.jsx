import React from 'react';
import PropTypes from 'prop-types';
import CSS from 'react-css-modules';
import styles from './styles.sass';

class Picture extends React.Component {
  static defaultProps = {
    width: '100%',
    src: null,
  };
  static propTypes = {
    src: PropTypes.string,
    width: PropTypes.oneOfType([
      PropTypes.string, PropTypes.number,
    ]),
  };
  render() {
    const { src, width } = this.props;
    const style = {
      backgroundImage: src,
      width,
      height: width,
    };
    return (
      <div
        {...{
          styleName: 'container',
          style,
        }}
      />
    );
  }
}

export default CSS(Picture, styles);
