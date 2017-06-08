import React, { PropTypes } from 'react';
import CSS from 'react-css-modules';
import styles from './styles.sass';

class TooltipHelp extends React.Component {
  static defaultProps = {
    message: 'tooltip',
  };
  static propTypes = {
    message: PropTypes.string.isRequired,
  };
  constructor(props) {
    super(props);
    this.state = {
      width: false,
    };
  }
  componentDidMount() {
    // this.setState({ width: this.tooltip.clientWidth });
  }
  render() {
    const { message } = this.props;
    return (
      <div
        styleName="container"
        ref={tooltip => (this.tooltip = tooltip)}
        style={{ left: 10 }}
      >
        {message}
      </div>
    );
  }
}

export default CSS(TooltipHelp, styles);
