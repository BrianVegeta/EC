import React from 'react';
import CSS from 'react-css-modules';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import { SortableContainer, SortableElement, arrayMove } from 'react-sortable-hoc';
import _ from 'lodash';
import styles from './styles.sass';
import NextController from '../NextController';
import { UPLOAD_COVER } from '../constants/title';
import ImageDropzone from './ImageDropzone';

class CoverContainer extends React.Component {
  constructor(props) {
    super(props);
    this.saveAndNext = this.saveAndNext.bind(this);
    this.onSortEnd = this.onSortEnd.bind(this);
    this.state = {
      images: ['1st', '2nd', '3rd'].map(key => ({ key, blob: null })),
    };
  }
  saveAndNext() {
    setTimeout(() =>
      browserHistory.push('/p/release_item/step2')
    , 2000);
  }
  onSortEnd({ oldIndex, newIndex }) {
    const images = arrayMove(this.state.images, oldIndex, newIndex);
    this.setState({ images });
  }
  onImageDroped(key, blob) {
    const index = _.findIndex(this.state.images, { key });
    if (index < 0) return;
    const images = this.state.images.concat();
    images[index] = Object.assign({}, images[index], { blob });
    this.setState({ images });
  }
  isFirst(image) {
    return _.findIndex(this.state.images, image) === 0;
  }
  render() {
    const SortableItem = SortableElement(({ value }) =>
      <ImageDropzone
        containerClass={styles.imageDropzone}
        onDrop={blob => this.onImageDroped(value.key, blob)}
        imageBlob={value.blob}
        isCover={this.isFirst(value)}
      />,
    );
    const SortableList = SortableContainer(({ items }) =>
      <div className={`clear ${styles.gallery}`}>
        {items.map((image, index) => (
          <SortableItem
            key={`item-${index + 1}`}
            index={index}
            value={image}
            disabled={!image.blob}
          />
        ))}
      </div>,
    );
    return (
      <div styleName="container">
        <h2 styleName="title">{UPLOAD_COVER}</h2>
        <ul styleName="noticeList">
          <li>最多新增3張照片</li>
          <li>圖片格式：jpg、jpge、png</li>
          <li>每一張不得超過2MB</li>
        </ul>
        <SortableList
          axis="x"
          items={this.state.images}
          onSortEnd={this.onSortEnd}
        />
        <NextController next={this.saveAndNext} />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const { environment, routesHelper } = state;
  return ({ environment, routesHelper });
};
export default connect(mapStateToProps)(CSS(CoverContainer, styles));
