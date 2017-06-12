import React from 'react';
import PropTypes from 'prop-types';
import CSS from 'react-css-modules';
import styles from './styles.sass';

const propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};
const Title = props => (
  <div styleName="container">
    <div styleName="title">{props.title}</div>
    {props.children}
  </div>
);
Title.propTypes = propTypes;
export default CSS(Title, styles);
