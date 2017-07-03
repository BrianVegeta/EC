import React from 'react';
import CSS from 'react-css-modules';
import styles from './styles.sass';

class PriceHeader extends React.Component {
  render() {
    return (
      <div styleName="container">
        <span styleName="price">NT$99,999</span> /天
      </div>
    );
  }
}

export default CSS(PriceHeader, styles);
