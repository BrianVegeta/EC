import React from 'react';
import PropTypes from 'prop-types';
import CSS from 'react-css-modules';
import styles from './styles.sass';

const propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.string,
    PropTypes.object,
    PropTypes.array,
  ]).isRequired,
};
const Row = props => (
  <tr styleName="row">
    <th styleName="head" width={154}>{props.title}</th>
    <td styleName="body">{props.children}</td>
  </tr>
);
Row.propTypes = propTypes;
export default CSS(Row, styles);
