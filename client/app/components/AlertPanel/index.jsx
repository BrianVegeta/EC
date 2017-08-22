import React from 'react';
import PropTypes from 'prop-types';
import ErrorIcon from 'react-icons/lib/md/error-outline';
import CSS from 'react-css-modules';
import styles from './styles.sass';

class Alert extends React.Component {

  static defaultProps = {
    marginBottom: null,
    width: '100%',
  };

  static propTypes = {
    message: PropTypes.string.isRequired,
    marginBottom: PropTypes.number,
    width: PropTypes.oneOf(['100%', 'auto']),
  };

  render() {
    const { message, marginBottom, width } = this.props;
    return (
      <div
        styleName="alert"
        style={{
          marginBottom,
          width,
          display: (width === 'auto' ? 'inline-block' : null),
        }}
      >
        <div styleName="alertInner">
          <div styleName="alertIcon"><ErrorIcon size={22} /></div>
          <div styleName="alertText">{message}</div>
        </div>
      </div>
    );
  }
}

export default CSS(Alert, styles);
