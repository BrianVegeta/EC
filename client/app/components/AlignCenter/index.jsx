import React from 'react';
// import PropTypes from 'prop-types';
import myPropTypes from 'propTypes';

import CSS from 'react-css-modules';
import styles from './styles.sass';

class AlignCenter extends React.Component {

  static calcuMargin(containerLength, innerLength) {
    return Math.abs((containerLength - innerLength)) / 2;
  }

  static propTypes = {
    children: myPropTypes.children.isRequired,
  };

  calcuMargin() {
    const { container, inner } = this;
    return {
      top: Math.abs(container.clientHeight - inner.clientHeight) / 2,
      left: Math.abs(container.clientWidth - inner.clientWidth) / 2,
    };
  }

  render() {
    const { children } = this.props;
    const innerStyle = (this.container && this.inner) ?
      { marginTop: this.calcuMargin().top, marginLeft: this.calcuMargin().left } :
      { marginTop: null, marginLeft: null };

    return (
      <div
        styleName="container"
        ref={container => (this.container = container)}
      >
        <div
          styleName="inner"
          ref={inner => (this.inner = inner)}
          style={innerStyle}
        >
          {children}
        </div>
      </div>
    );
  }
}

export default CSS(AlignCenter, styles);
