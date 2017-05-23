import React from 'react';
import CSS from 'react-css-modules';
import styles from './styles.sass';

const Me = () => (
  <a href="/">
    <span styleName="avatar" />
  </a>
);
export default CSS(Me, styles);
