import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  description: PropTypes.string.isRequired,
};
const Description = props => (
  <div styleName="container">
    <h2 styleName="title">物品描述</h2>
    <div styleName="description">{props.description}</div>
  </div>
);
Description.propTypes = propTypes;
export default Description;
