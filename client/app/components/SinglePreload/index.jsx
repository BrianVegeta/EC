import React from 'react';
import PropTypes from 'prop-types';

const IMAGE_LOADING_STATUS = 'IMAGE_LOADING_STATUS';
const IMAGE_LOADED_STATUS = 'IMAGE_LOADED_STATUS';
const IMAGE_FAILED_STATUS = 'IMAGE_FAILED_STATUS';
class Preload extends React.Component {

  static defaultProps = {
    imageSrc: null,
  };

  static propTypes = {
    imageSrc: PropTypes.string,
    renderLoading: PropTypes.func.isRequired,
    renderLoaded: PropTypes.func.isRequired,
    renderFailed: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      loadStatus: IMAGE_LOADING_STATUS,
      width: null,
      height: null,
    };

    this.handleSuccess = this.handleSuccess.bind(this);
    this.handleError = this.handleError.bind(this);
  }

  componentDidMount() {
    this.bindLoader();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.imageSrc !== this.props.imageSrc) {
      this.unbindLoader();
      this.bindLoader();
    }
  }

  componentWillUnmount() {
    this.unbindLoader();
  }

  bindLoader() {
    this.unbindLoader();

    this.image = new Image();
    this.image.addEventListener('load', this.handleSuccess, false);
    this.image.addEventListener('error', this.handleError, false);
    this.image.src = this.props.imageSrc;
  }

  unbindLoader() {
    if (!this.image) {
      return;
    }
    this.image.removeEventListener('load', this.handleSuccess, false);
    this.image.removeEventListener('error', this.handleError, false);
    this.image = null;
  }

  handleSuccess(e) {
    const { width, height } = e.target;
    this.setState({
      loadStatus: IMAGE_LOADED_STATUS,
      width,
      height,
    });
  }

  handleError() {
    this.setState({ loadStatus: IMAGE_FAILED_STATUS });
  }

  render() {
    const { imageSrc } = this.props;
    const { width, height } = this.state;
    switch (this.state.loadStatus) {
      case IMAGE_LOADING_STATUS:
        return this.props.renderLoading();

      case IMAGE_LOADED_STATUS:
        return this.props.renderLoaded(imageSrc, { width, height });

      case IMAGE_FAILED_STATUS:
        return this.props.renderFailed();

      default:
        return null;
    }
  }
}

export default Preload;
