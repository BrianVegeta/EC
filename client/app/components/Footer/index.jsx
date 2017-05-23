import React, { PropTypes } from 'react';
import CSS from 'react-css-modules';
import styles from './styles.sass';

class Footer extends React.Component {
  render() {
    return (
      <div styleName="container">
        <div styleName="context">
          Footer
        </div>
      </div>
    );
  }
}

export default CSS(Footer, styles);
