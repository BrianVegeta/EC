import React, { PropTypes } from 'react';

const propTypes = {
  title: PropTypes.string.isRequired,
};
const Title = props => (
  <div styleName="container">
    <h1>{props.title}</h1>
  </div>
);
Title.propTypes = propTypes;
export default Title;
