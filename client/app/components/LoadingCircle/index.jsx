import React from 'react';
import CSS from 'react-css-modules';
import styles from './styles.sass';

class LoadingCircle extends React.Component {
  render() {
    return (
      <svg styleName="circle" viewBox="0 0 41 41">
        <path d="M38,20.5 C38,30.1685093 30.1685093,38 20.5,38" />
      </svg>
    );
  }
}

export default CSS(LoadingCircle, styles);
