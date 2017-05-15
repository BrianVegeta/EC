import React, { PropTypes } from 'react';
import EditIcon from 'react-icons/lib/md/edit';
import RemoveIcon from 'react-icons/lib/go/trashcan';
import update from 'react/lib/update';
import _ from 'lodash';
import {
  SortableContainer,
  SortableElement,
  arrayMove,
} from 'react-sortable-hoc';
import ImageDropzone from '../ImageDropzone';
import { openEditorModal } from '../../../../actions/editorCoversActions';
import styles from './styles.sass';

class SortableGallery extends React.Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
  };
  static shouldCancelStart(e) {
    const tagName = e.target.tagName.toLowerCase();
    if (['svg', 'path', 'button'].indexOf(tagName) >= 0) {
      return true; // Return true to cancel sorting
    }
    return false;
  }
  constructor(props) {
    super(props);
    this.onSortEnd = this.onSortEnd.bind(this);
    this.state = {
      images: ['1st', '2nd', '3rd'].map(key => ({ key, blob: null })),
    };
  }
  onSortEnd({ oldIndex, newIndex }) {
    const images = arrayMove(this.state.images, oldIndex, newIndex);
    this.setState({ images });
  }
  updateImg(key, blob) {
    const index = _.findIndex(this.state.images, { key });
    if (index < 0) return;
    this.setState(update(this.state, {
      images: {
        [index]: {
          blob: { $set: blob },
        },
      },
    }));
  }
  isFirst(image) {
    return _.findIndex(this.state.images, image) === 0;
  }
  openModal(e, image) {
    this.props.dispatch(openEditorModal(image));
  }
  render() {
    const itemClass = styles.imageDropzone;
    const ctrlGroupClass = styles.controller;
    const ctrlIcon = styles.controlIcon;
    const iconProps = { size: 16, color: '#fff', style: { display: 'block' } };
    const galleryClass = styles.gallery;
    const SortableItem = SortableElement(({ value }) =>
      <div className={itemClass} >
        <ImageDropzone
          onDrop={blob => this.updateImg(value.key, blob)}
          isCover={this.isFirst(value)}
          imageBlob={value.blob}
          {...this.props}
        />
        {
          value.blob &&
          <div className={ctrlGroupClass} >
            <button
              className={`${ctrlIcon} button`}
              onClick={e => this.openModal(e, value.blob)}
            >
              <EditIcon {...iconProps} />
            </button>
            <button className={`${ctrlIcon} button`}>
              <RemoveIcon {...iconProps} />
            </button>
          </div>
        }
      </div>,
    );
    const SortableList = SortableContainer(({ items }) =>
      <div className={`clear ${galleryClass}`}>
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
      <SortableList
        axis="x"
        items={this.state.images}
        onSortEnd={this.onSortEnd}
        shouldCancelStart={this.constructor.shouldCancelStart}
      />
    );
  }
}

export default SortableGallery;
