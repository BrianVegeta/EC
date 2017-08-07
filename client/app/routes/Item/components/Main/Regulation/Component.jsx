import React, { PropTypes } from 'react';

const propTypes = { rules: PropTypes.array.isRequired };
const Regulation = props => (
  <div styleName="container">
    <h2 styleName="title">分享人守則</h2>
    <ul styleName="rules">
      {props.rules.map((rule, i) =>
        <li key={`${rule.describe}_${i + 1}`} styleName="rule">
          {rule}
        </li>,
      )}
    </ul>
  </div>
);
Regulation.propTypes = propTypes;
export default Regulation;
