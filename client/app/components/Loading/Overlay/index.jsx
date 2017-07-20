import React from 'react';
import LoadingMDSpinner from 'components/Loading/MDSpinner';
import CSS from 'react-css-modules';
import styles from './styles.sass';


class Overlay extends React.Component {
  render() {
    return (
      <div styleName="container">
        <div styleName="spinner">
          <LoadingMDSpinner className={styles.spinner} />
        </div>
      </div>
    );
  }
}

export default CSS(Overlay, styles);
