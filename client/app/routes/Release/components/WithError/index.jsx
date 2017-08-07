import React from 'react';
import PropTypes from 'prop-types';
import CSS from 'react-css-modules';
import styles from './styles.sass';
import Tooltip from '../Tooltip';

class WithError extends React.Component {
  static defaultProps = {
    error: null,
    width: '100%',
  };
  static propTypes = {
    children: PropTypes.node.isRequired,
    error: PropTypes.string,
    width: PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.string,
    ]),
  };
  render() {
    const { error, children, width } = this.props;
    return (
      <div styleName="container" style={{ width }}>
        {error && <Tooltip message={error} />}
        {children}
      </div>
    );
  }
}

export default CSS(WithError, styles);
