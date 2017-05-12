import React, { PropTypes } from 'react';
import Rotator from './Rotator';
import Controller from './Controller';

class Dashboard extends React.Component {
  static propTypes = {
    imageSrc: PropTypes.string.isRequired,
  };
  render() {
    return (
      <div styleName="container">
        <div styleName="cropper">
          <Rotator src={this.props.imageSrc} ref={r => (this.rotator = r)} />
        </div>
        <div styleName="controller">
          <Controller rotate={direc => this.rotator.rotate(direc)} />
        </div>
      </div>
    );
  }
}

export default Dashboard;
