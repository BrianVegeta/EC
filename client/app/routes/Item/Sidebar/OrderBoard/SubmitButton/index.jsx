import React, { PropTypes } from 'react';
import CSS from 'react-css-modules';
import styles from './styles.sass';

class SubmitButton extends React.Component {
  render() {
    return (
      <button styleName="button">
        <span styleName="text">馬上預訂</span>
      </button>
    );
  }
}

export default CSS(SubmitButton, styles);
