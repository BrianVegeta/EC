import React, { PropTypes } from 'react';
import CSS from 'react-css-modules';
import styles from './styles.sass';

const defaultProps = {
  helperText: null,
};
const propTypes = {
  children: PropTypes.string.isRequired,
  helperText: PropTypes.string,
};
const Title = props => (
  <div styleName="container">
    <h2 styleName="title">{props.children}</h2>
    {props.helperText && <span styleName="helper">{props.helperText}</span>}
  </div>
);
Title.defaultProps = defaultProps;
Title.propTypes = propTypes;
export default CSS(Title, styles);
