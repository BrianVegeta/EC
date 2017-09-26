import React from 'react';
import PropTypes from 'prop-types';
import LoadingMDSpinner from 'components/Loading/MDSpinner';
import CSS from 'react-css-modules';
import styles from './styles.sass';


class Overlay extends React.Component {

  static defaultProps = {
    background: null,
  };

  static propTypes = {
    background: PropTypes.string,
  };

  render() {
    const { background } = this.props;
    return (
      <div styleName="container" style={{ background }}>
        <div styleName="spinner">
          <LoadingMDSpinner className={styles.spinner} />
        </div>
      </div>
    );
  }
}

export default CSS(Overlay, styles);
