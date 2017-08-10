import React from 'react';
import PropTypes from 'prop-types';
import myPropTypes from 'propTypes';

import CSS from 'react-css-modules';
import styles from './styles.sass';

class FormContainer extends React.Component {

  static defaultProps = {
    helperText: null,
    optional: false,
  };

  static propTypes = {
    children: myPropTypes.children.isRequired,
    title: PropTypes.string.isRequired,
    helperText: PropTypes.string,
    optional: PropTypes.bool,
  };

  render() {
    const { title, helperText, optional, children } = this.props;
    return (
      <div styleName="container">
        <div styleName="title-container">
          <h2 styleName="title">
            {title}
            {optional && <span styleName="titleHelper">（非必填）</span>}
          </h2>
          {helperText && <span styleName="helper">{helperText}</span>}
        </div>
        {children}
      </div>
    );
  }
}

export default CSS(FormContainer, styles);
