import React from 'react';
import CSS from 'react-css-modules';
import styles from './me.css';

const Me = () => (
  <a href="/">
    <span styleName="avatar" />
  </a>
);
export default CSS(Me, styles);
