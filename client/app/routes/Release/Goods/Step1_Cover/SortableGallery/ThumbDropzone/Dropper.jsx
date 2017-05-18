import React from 'react';
import Dropzone from 'react-dropzone';

class Dropper extends React.Component {
  static defaultProps = {
    onDrop: null,
  };
  static propTypes = {
    onDrop: React.PropTypes.func,
  };
  constructor(props) {
    super(props);
    this.onDrop = this.onDrop.bind(this);
  }
  onDrop(images) {
    const { onDrop } = this.props;
    if (onDrop) {
      onDrop(images[0]);
    }
  }
  render() {
    return (
      <Dropzone
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
        }}
        multiple={false}
        accept="image/jpeg, image/png"
        onDrop={this.onDrop}
      />
    );
  }
}

export default Dropper;
