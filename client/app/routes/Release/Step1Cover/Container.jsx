import React, { PropTypes } from 'react';
import CSS from 'react-css-modules';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import { SortableContainer, SortableElement, arrayMove } from 'react-sortable-hoc';
import EditIcon from 'react-icons/lib/md/edit';
import RemoveIcon from 'react-icons/lib/go/trashcan';
import _ from 'lodash';
import styles from './styles.sass';
import NextController from '../NextController';
import { UPLOAD_COVER } from '../constants/title';
import ImageDropzone from './ImageDropzone';
import ImageEditor from './ImageEditor';
import { openEditorModal } from '../../../actions/editorCoversActions';

class CoverContainer extends React.Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    editorCovers: PropTypes.objectOf(PropTypes.oneOf([
      PropTypes.array, PropTypes.object,
    ])).isRequired,
  };
  constructor(props) {
    super(props);
    this.saveAndNext = this.saveAndNext.bind(this);
    this.onSortEnd = this.onSortEnd.bind(this);
    this.state = {
      images: ['1st', '2nd', '3rd'].map(key => ({ key, blob: null, dnd: true })),
      imageEditing: false,
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
  disableDND(key, disabled) {
    const images = this.state.images.concat();
    const index = _.findIndex(images, { key });
    if (index < 0) return;
    images[index].dnd = disabled;
    this.setState({ images });
  }
  openModal(e, image) {
    e.preventDefault();
    this.props.dispatch(openEditorModal(image));
  }
  render() {
    const SortableItem = SortableElement(({ value }) =>
      <div className={styles.imageDropzone}>
        <ImageDropzone
          onDrop={blob => this.onImageDroped(value.key, blob)}
          isCover={this.isFirst(value)}
          imageBlob={value.blob}
          {...this.props}
        />
        {
          value.blob &&
          <div className={styles.controller} >
            <span className={styles.controlIcon} onMouseDown={e => this.openModal(e, value.blob)}>
              <EditIcon size={16} color="#fff" style={{ display: 'block' }} />
            </span>
            <span className={styles.controlIcon}>
              <RemoveIcon size={16} color="#fff" style={{ display: 'block' }} />
            </span>
          </div>
        }
      </div>,
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
    const { images, imageEditing } = this.state;
    return (
      <div styleName="container">
        <h2 styleName="title">{UPLOAD_COVER}</h2>
        <ul styleName="noticeList">
          <li>最多新增3張照片</li>
          <li>圖片格式：jpg、jpge、png</li>
          <li>每一張不得超過2MB</li>
        </ul>
        <SortableList axis="x" items={images} onSortEnd={this.onSortEnd} />
        <NextController next={this.saveAndNext} />
        {
          this.props.editorCovers.current &&
          <ImageEditor open={imageEditing} {...this.props} />
        }
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const { environment, routesHelper, editorCovers } = state;
  return ({ environment, routesHelper, editorCovers });
};
export default connect(mapStateToProps)(CSS(CoverContainer, styles));
