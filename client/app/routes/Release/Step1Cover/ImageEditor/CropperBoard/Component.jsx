import React, { PropTypes } from 'react';
import Cropper from './Cropper';
import Controller from './Controller';

class Dashboard extends React.Component {
  static propTypes = {
    imageSrc: PropTypes.string.isRequired,
  };
  constructor(props) {
    super(props);
    this.editorProps = {
      src: this.props.imageSrc,
      ref: c => (this.cropper = c),
    };
  }
  zoomTo(increase) {
    const realRatio = this.canvasData.width / this.canvasData.naturalWidth;
    this.cropper.zoomTo(realRatio + ((realRatio * 2) * increase));
  }
  render() {
    return (
      <div styleName="container">
        <div styleName="cropper">
          <Cropper {...this.editorProps} />
        </div>
        <div styleName="controller">
          <Controller zoom={direc => this.zoomTo(direc)} />
        </div>
      </div>
    );
  }
}

export default Dashboard;
