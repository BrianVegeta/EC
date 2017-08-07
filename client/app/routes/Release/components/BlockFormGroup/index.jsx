// <BlockFormGroup headerText="" helperText="" multiple optional>
//   ...
// </BlockFormGroup>


import React from 'react';
import PropTypes from 'prop-types';
import CSS from 'react-css-modules';
import styles from './styles.sass';

const Group = props => (
  <div styleName="groupContainer">
    <div styleName="titleWrapper">
      <div styleName="headerText">
        {props.headerText}
        {props.multiple && <span styleName="multiple">（可多選）</span>}
        {props.optional && <span styleName="optional">（非必填）</span>}
      </div>
      {props.helperText && <div styleName="helperText">{props.helperText}</div>}
    </div>
    {props.children}
  </div>
);
Group.defaultProps = {
  multiple: false,
  optional: false,
  helperText: null,
};
Group.propTypes = {
  headerText: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  helperText: PropTypes.string,
  multiple: PropTypes.bool,
  optional: PropTypes.bool,
};
export default CSS(Group, styles);
