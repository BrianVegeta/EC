import React, { PropTypes } from 'react';
import Cropper from './Cropper';
import Controller from './Controller';

class CropperBoard extends React.Component {
  static propTypes = {
    imageSrc: PropTypes.string.isRequired,
    cancelCropping: PropTypes.func.isRequired,
  };
  constructor(props) {
    super(props);
    this.editorProps = {
      src: this.props.imageSrc,
      ref: c => (this.cropper = c),
    };
  }
  render() {
    return (
      <div styleName="container">
        <div styleName="cropper">
          <Cropper {...this.editorProps} />
        </div>
        <div styleName="controller">
          <Controller
            zoom={increase => this.cropper.zoomTo(increase)}
            onCancel={() => this.props.cancelCropping()}
            onDone={() => console.log('done')}
          />
        </div>
      </div>
    );
  }
}

export default CropperBoard;
