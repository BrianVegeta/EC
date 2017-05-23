import React, { PropTypes } from 'react';
import CSS from 'react-css-modules';
import styles from './styles.sass';


const defaultProps = { distance: 80 };
const propTypes = { distance: PropTypes.number };
const Firelane = (props) => {
  const { distance } = props;
  const style = {
    marginTop: distance,
  };
  return <div styleName="container" {...{ style }} />;
};

Firelane.propTypes = propTypes;
Firelane.defaultProps = defaultProps;
export default CSS(Firelane, styles);
