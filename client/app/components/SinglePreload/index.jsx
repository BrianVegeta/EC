import React from 'react';
import PropTypes from 'prop-types';

class Preload extends React.Component {

  static propTypes = {
    imageSrc: PropTypes.string.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {

    };
  }

  componentDidMount() {
    const { imageSrc } = this.props;
    this.bindLoader(imageSrc);
  }

  bindLoader(imageSrc) {
    this.unbindLoader();

    this.image = new Image();
    this.image.addEventListener('load', this.handleSuccess, false);
    this.image.addEventListener('error', this.handleError, false);
    this.image.src = imageSrc;
  }

  destroyLoader() {
    if (!this.image) return;

    this.image.removeEventListener('load', this.handleSuccess, false);
    this.image.removeEventListener('error', this.handleError, false);
    this.image = null;
  }

  handleSuccess() {

  }

  handleError() {

  }

  render() {
    return null;
  }
}

export default Preload;
