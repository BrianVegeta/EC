import React, { PropTypes } from 'react';
import CSS from 'react-css-modules';
import styles from './styles.sass';
import Tooltip from '../Tooltip';

class WithError extends React.Component {
  static defaultProps = {
    error: null,
  };
  static propTypes = {
    children: PropTypes.node.isRequired,
    error: PropTypes.string,
  };
  render() {
    const { error, children } = this.props;
    return (
      <div styleName="container">
        {error && <Tooltip message={error} />}
        {children}
      </div>
    );
  }
}

export default CSS(WithError, styles);
