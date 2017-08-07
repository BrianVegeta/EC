import React from 'react';
import PropTypes from 'prop-types';
import NextButton from './NextButton';

const propTypes = {
  next: PropTypes.func.isRequired,
};
class NextController extends React.Component {
  constructor(props) {
    super(props);
    this.next = this.next.bind(this);
    this.statusTimer = null;
    this.state = {
      status: 'default', // default, ready, nexting
    };
  }

  componentDidMount() {
    this.statusTimer = setTimeout(() =>
      this.setState({ status: 'ready' })
    , 3000);
  }

  componentWillUnmount() {
    clearTimeout(this.statusTimer);
  }

  next() {
    this.props.next();
    this.setState({ status: 'nexting' });
  }

  render() {
    return (
      <div styleName="controller">
        <NextButton next={this.next} status={this.state.status} />
      </div>
    );
  }
}
NextController.propTypes = propTypes;
export default NextController;
