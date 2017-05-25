// <BlockFormGroup headerText="" helperText="" multiple>
//   ...
// </BlockFormGroup>


import React, { PropTypes } from 'react';
import CSS from 'react-css-modules';
import styles from './styles.sass';

const Group = props => (
  <div styleName="groupContainer">
    <div styleName="titleWrapper">
      <div styleName="headerText">
        {props.headerText}
        {props.multiple && <span styleName="multiple">（可多選）</span>}
      </div>
      {props.helperText && <div styleName="helperText">{props.helperText}</div>}
    </div>
    {props.children}
  </div>
);
Group.defaultProps = {
  multiple: false,
  helperText: null,
};
Group.propTypes = {
  headerText: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  helperText: PropTypes.string,
  multiple: PropTypes.bool,
};
export default CSS(Group, styles);
