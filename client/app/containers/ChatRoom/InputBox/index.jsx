import React from 'react';
import PropTypes from 'prop-types';
import CSS from 'react-css-modules';
import styles from './styles.sass';


class InputBox extends React.Component {
  render() {
    return (
      <div styleName="container">
        輸入私訊
      </div>
    );
  }
}

export default CSS(InputBox, styles);
