import React from 'react';
import PropTypes from 'prop-types';
import Picture from 'components/Picture';


class Cover extends React.Component {

  static propTypes = {
    images: PropTypes.arrayOf(PropTypes.string).isRequired,
  };

  constructor(props) {
    super(props);
    this.state = { currentCoverIndex: 0 };
    this.switchCover = this.switchCover.bind(this);
  }

  switchCover(index) {
    this.setState({ currentCoverIndex: index });
  }

  renderThumb(cover, index) {
    const { currentCoverIndex } = this.state;
    const activeThumb = (
      <button className="button" >
        <div styleName="thumb-active">
          <div styleName="thumb-inner">
            <Picture src={cover} />
          </div>
        </div>
      </button>
    );
    const thumb = (
      <button className="button" onClick={() => this.switchCover(index)} >
        <div styleName="thumb">
          <div styleName="thumb-inner" >
            <Picture src={cover} />
          </div>
        </div>
      </button>
    );

    return index === currentCoverIndex ? activeThumb : thumb;
  }

  render() {
    const { currentCoverIndex } = this.state;
    const { images } = this.props;
    return (
      <div styleName="container">
        <div styleName="cover" >
          <Picture src={images[currentCoverIndex]} />
        </div>
        <div styleName="thumbs">
          {images.map((cover, index) => (
            <div
              key={cover}
              styleName="thumb-container"
            >
              {this.renderThumb(cover, index)}
            </div>
          ))}
        </div>
      </div>
    );
  }
}
export default Cover;
