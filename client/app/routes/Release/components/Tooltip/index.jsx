import React from 'react';
import PropTypes from 'prop-types';
import CSS from 'react-css-modules';
import styles from './styles.sass';

class Tooltip extends React.Component {
  static defaultProps = {
    message: 'tooltip',
    align: 'center',
  };
  static propTypes = {
    message: PropTypes.string.isRequired,
    align: PropTypes.string,
  };
  constructor(props) {
    super(props);
    this.state = {
      tooltipWidth: null,
    };
  }
  componentDidMount() {
    this.setState({ tooltipWidth: this.tooltip.clientWidth });
  }
  getAlignStyle() {
    const { tooltipWidth } = this.state;
    if (!tooltipWidth) { return null; }
    switch (this.props.align) {
      case 'right':
        return { right: 0 };
      case 'center':
        return { left: '50%', marginLeft: -(tooltipWidth / 2) };
      case 'left':
        return null;
      default:
        return null;
    }
  }
  render() {
    const { message } = this.props;
    return (
      <div styleName="container">
        <div
          styleName="tooltip"
          ref={t => (this.tooltip = t)}
          style={this.getAlignStyle()}
        >
          {message}
        </div>
      </div>
    );
  }
}

export default CSS(Tooltip, styles);
