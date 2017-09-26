import React from 'react';
import PropTypes from 'prop-types';
import { htmlNewLineToBreak } from 'lib/htmlUtils';

const propTypes = {
  description: PropTypes.string.isRequired,
};
const Description = props => (
  <div styleName="container">
    <h2 styleName="title">介紹</h2>
    <div styleName="description">
      {htmlNewLineToBreak(props.description)}
    </div>
  </div>
);
Description.propTypes = propTypes;
export default Description;
