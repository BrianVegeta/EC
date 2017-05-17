import React, { PropTypes } from 'react';
import {
  SortableContainer,
  SortableElement,
  arrayMove,
} from 'react-sortable-hoc';
import ThumbDropzone from '../ThumbDropzone';
import ThumbDropped from '../ThumbDropped';
import {
  openEditorModal,
  newCoverWithBlob,
  updateCovers,
  removeCover,
} from '../../../../actions/editorCoversActions';
import styles from './styles.sass';


const LEAST_COVER_SHOWN = 3;
class SortableGallery extends React.Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    covers: PropTypes.arrayOf(PropTypes.object).isRequired,
  };
  static shouldCancelStart(e) {
    const tagName = e.target.tagName.toLowerCase();
    return ['svg', 'path', 'button'].indexOf(tagName) >= 0;
  }
  constructor(props) {
    super(props);
    this.onSortEnd = this.onSortEnd.bind(this);
  }
  onSortEnd({ oldIndex, newIndex }) {
    this.props.dispatch(
      updateCovers(
        arrayMove(this.props.covers, oldIndex, newIndex),
      ),
    );
  }
  createCover(blob) {
    this.props.dispatch(
      newCoverWithBlob(blob),
    );
  }
  removeCover(key) {
    this.props.dispatch(
      removeCover(key),
    );
  }
  openModal(key, blob) {
    this.props.dispatch(
      openEditorModal(key, blob),
    );
  }
  render() {
    const itemClass = styles.imageDropzone;
    const galleryClass = styles.gallery;
    const coverLabel = <div className={styles.coverLabel}>封面</div>;
    const SortableItem = SortableElement(({ value }) =>
      <div className={itemClass} >
        {
          value.isEmpty ?
            <ThumbDropzone
              onDrop={blob => this.createCover(blob)}
              coverLabel={value.isCover && coverLabel}
            /> :
            <ThumbDropped
              coverLabel={value.isCover && coverLabel}
              coverUrl={value.blob}
              onEdit={() => this.openModal(value.key, value.blob)}
              onRemove={() => this.removeCover(value.key)}
            />
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
    const { covers } = this.props;
    // immutable
    const emptyCovers = Array((LEAST_COVER_SHOWN - covers.length)).fill(
      Object.assign({}, { isEmpty: true }),
    );
    const items = covers.concat(emptyCovers);
    items[0] = Object.assign({}, items[0], { isCover: true });
    return (
      <SortableList
        axis="x"
        items={items}
        onSortEnd={this.onSortEnd}
        shouldCancelStart={this.constructor.shouldCancelStart}
      />
    );
  }
}

export default SortableGallery;
