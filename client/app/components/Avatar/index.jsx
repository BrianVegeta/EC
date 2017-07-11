import React from 'react';
import PropTypes from 'prop-types';
import CSS from 'react-css-modules';
import styles from './styles.sass';

class Avatar extends React.Component {
  static defaultProps = {
    src: null,
    width: '100%',
    round: true,
  };
  static propTypes = {
    src: PropTypes.string,
    width: PropTypes.oneOfType([
      PropTypes.string, PropTypes.number,
    ]),
    round: PropTypes.bool,
  };
  render() {
    const {
      src,
      width,
      round,
    } = this.props;

    const square = { width, height: width };
    const style = {
      ...square,
      backgroundImage: src ? `url(${src})` : null,
      borderRadius: round ? '50%' : null,
    };
    return (
      <div styleName="placeholder" style={square}>
        <div styleName="container" style={style} />
      </div>
    );
  }
}

export default CSS(Avatar, styles);
