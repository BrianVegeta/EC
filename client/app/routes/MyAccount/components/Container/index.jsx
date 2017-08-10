import React from 'react';
import PropTypes from 'prop-types';
import CSS from 'react-css-modules';
import styles from './styles.sass';
import myPropTypes from '../../../../propTypes';

class Container extends React.Component {
  static defaultProps = {
      icon: null,
  }

  static propTypes = {
    icon: PropTypes.func,
    titleText: PropTypes.string.isRequired,
    children: myPropTypes.children.isRequired,
  };
  render() {
    const { icon, titleText, children } = this.props;
    return (
      <div styleName="container">
        <div styleName="header">
          <h1 styleName="title">
            {icon && icon({ size: 48, style: { verticalAlign: 'top' } })}
            <span styleName="text">{titleText}</span>
          </h1>
        </div>
        <div styleName="body">
          {children}
        </div>
      </div>
    );
  }
}

export default CSS(Container, styles);
