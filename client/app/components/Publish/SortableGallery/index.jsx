import React from 'react';
import PropTypes from 'prop-types';
import CSS from 'react-css-modules';
import {
  SortableContainer,
  SortableElement,
  arrayMove,
} from 'react-sortable-hoc';

import ThumbDropzone from 'components/Publish/ThumbDropzone';
import ThumbDropped from 'components/Publish/ThumbDropped';
import styles from './styles.sass';


const LEAST_COVER_SHOWN = 3;
class SortableGallery extends React.Component {

  static propTypes = {
    createCover: PropTypes.func.isRequired,
    deleteCover: PropTypes.func.isRequired,
    changeOrders: PropTypes.func.isRequired,
    openCropper: PropTypes.func.isRequired,
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
    const { changeOrders, covers } = this.props;
    changeOrders(
      arrayMove(covers, oldIndex, newIndex),
    );
  }

  openModal(key, blob) {
    this.props.openCropper(key, blob);
  }

  render() {
    const {
      covers,
      createCover,
      deleteCover,
    } = this.props;
    const itemClass = styles.imageDropzone;
    const galleryClass = styles.gallery;
    const coverLabel = <div className={styles.coverLabel}>封面</div>;
    const SortableItem = SortableElement(({ value }) => (
      <div className={itemClass} >
        {
          value.isEmpty ?
            <ThumbDropzone
              onDrop={createCover}
              coverLabel={value.isCover && coverLabel}
            /> :
            <ThumbDropped
              coverLabel={value.isCover && coverLabel}
              coverUrl={value.blob}
              onEdit={() => this.openModal(value.key, value.blob)}
              onRemove={() => deleteCover(value.key)}
            />
        }
      </div>
    ));

    const SortableList = SortableContainer(({ items }) => (
      <div className={`clear ${galleryClass}`}>
        {items.map((image, index) => (
          <SortableItem
            key={`item-${index + 1}`}
            index={index}
            value={image}
            disabled={!image.blob}
          />
        ))}
      </div>
    ));

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

export default CSS(SortableGallery, styles);
