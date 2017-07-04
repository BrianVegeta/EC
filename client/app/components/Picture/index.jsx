import React from 'react';
import PropTypes from 'prop-types';
import myPropTypes from 'propTypes';
import CSS from 'react-css-modules';
import styles from './styles.sass';

class Picture extends React.Component {
  static defaultProps = {
    width: '100%',
    src: null,
    style: null,
  };
  static propTypes = {
    src: PropTypes.string,
    width: PropTypes.oneOfType([
      PropTypes.string, PropTypes.number,
    ]),
    style: myPropTypes.style,
  };
  render() {
    const { src, width, style } = this.props;
    const placeholderStyle = {
      width,
      height: width,
      ...style,
    };
    const innerStyle = {
      backgroundImage: src,
      ...placeholderStyle,
      ...style,
    };
    return (
      <div {...{ styleName: 'placeholder', style: placeholderStyle }} >
        <div {...{ styleName: 'container', style: innerStyle }} />
      </div>
    );
  }
}

export default CSS(Picture, styles);
