import React from 'react';
import myPropTypes from 'propTypes';
import { isEmpty } from 'lodash';
import CSS from 'react-css-modules';
import styles from './styles.sass';

class BottomController extends React.Component {

  static propTypes = {
    children: myPropTypes.children.isRequired,
  };

  render() {
    const { children } = this.props;
    if (isEmpty(children)) {
      return null;
    }
    return (
      <div styleName="container">
        <div className="container">{children}</div>
      </div>
    );
  }
}

export default CSS(BottomController, styles);
