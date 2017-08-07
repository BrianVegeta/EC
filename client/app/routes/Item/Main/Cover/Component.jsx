import React from 'react';
import PropTypes from 'prop-types';

import {
  ITEM_DETAIL_COVER_RESOLUTION,
  ITEM_DETAIL_COVER_THUMB_RESOLUTION,
} from '../../../../constants/style';
import covers from './mock';

class Cover extends React.Component {

  static thumbStyle(cover) {
    const { thumb } = cover;
    return {
      thumb: {
        width: ITEM_DETAIL_COVER_THUMB_RESOLUTION,
        height: ITEM_DETAIL_COVER_THUMB_RESOLUTION,
        backgroundImage: `url(${thumb})`,
      },
    };
  }

  constructor(props) {
    super(props);
    this.state = { currentCoverIndex: 0 };
    this.switchCover = this.switchCover.bind(this);
  }

  coverStyle() {
    const { currentCoverIndex } = this.state;
    return {
      backgroundImage: `url(${covers[currentCoverIndex].large})`,
      width: ITEM_DETAIL_COVER_RESOLUTION,
      height: ITEM_DETAIL_COVER_RESOLUTION,
    };
  }

  switchCover(index) {
    this.setState({ currentCoverIndex: index });
  }

  renderThumb(cover, index) {
    const { currentCoverIndex } = this.state;
    const { thumbStyle } = this.constructor;
    const activeThumb = (
      <button styleName="thumb-control" >
        <div styleName="thumb-active" style={thumbStyle(cover).thumb}>
          <div styleName="thumb-inner" />
        </div>
      </button>
    );
    const thumb = (
      <button styleName="thumb-control" onClick={() => this.switchCover(index)} >
        <div styleName="thumb" style={thumbStyle(cover).thumb} >
          <div styleName="thumb-inner" />
        </div>
      </button>
    );

    return index === currentCoverIndex ? activeThumb : thumb;
  }

  render() {
    return (
      <div styleName="container">
        <div styleName="cover" style={this.coverStyle()} />
        <div styleName="thumbs">
          {covers.map((cover, index) =>
            <div key={cover.large} styleName="thumb-container">
              {this.renderThumb(cover, index)}
            </div>,
          )}
        </div>
      </div>
    );
  }
}
export default Cover;
