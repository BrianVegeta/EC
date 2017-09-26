import React from 'react';
import PropTypes from 'prop-types';
import TextareaAutosize from 'react-autosize-textarea';
import Dropzone from 'react-dropzone';
import CSS from 'react-css-modules';
import styles from './styles.sass';
import ItemsSelection from './ItemsSelection';


class InputBox extends React.Component {

  static propTypes = {
    input: PropTypes.string.isRequired,
    changeInput: PropTypes.func.isRequired,
    sendMessage: PropTypes.func.isRequired,
    uploadPhoto: PropTypes.func.isRequired,
    selectItem: PropTypes.func.isRequired,
    items: PropTypes.shape({
      records: PropTypes.array.isRequired,
    }).isRequired,
    targetRoom: PropTypes.shape({
      uid: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
    }).isRequired,
    fetchMyItems: PropTypes.func.isRequired,
    fetchTargetItems: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      isSelectingItems: false,
    };
    this.onEnter = this.onEnter.bind(this);
    this.onInputChange = this.onInputChange.bind(this);
    this.onPhotoClick = this.onPhotoClick.bind(this);
    this.onDrop = this.onDrop.bind(this);
    this.onItemSelectClick = this.onItemSelectClick.bind(this);
    this.selectItem = this.selectItem.bind(this);
  }

  onInputChange(e) {
    this.props.changeInput(e.target.value);
  }

  onEnter(e) {
    if (!e.shiftKey && e.key === 'Enter' && e.keyCode !== 229) {
      e.preventDefault();
      this.props.sendMessage();
    }
  }

  onPhotoClick() {
    this.dropzone.open();
  }

  onItemSelectClick() {
    this.setState({ isSelectingItems: !this.state.isSelectingItems });
  }

  onDrop(files) {
    const image = files[0];
    const { uploadPhoto } = this.props;
    uploadPhoto(image.preview);
  }

  selectItem(item) {
    this.props.selectItem(item);
    this.onItemSelectClick();
  }

  renderItemsSelection() {
    if (!this.state.isSelectingItems) return null;
    const {
      items,
      targetRoom,
      fetchMyItems,
      fetchTargetItems,
    } = this.props;
    return (
      <ItemsSelection
        items={items}
        targetRoom={targetRoom}
        fetchMyItems={fetchMyItems}
        fetchTargetItems={fetchTargetItems}
        selectItem={this.selectItem}
        closeSelection={() => this.setState({ isSelectingItems: false })}
      />
    );
  }

  render() {
    const { input } = this.props;
    const refDropzone = dropzone => (this.dropzone = dropzone);
    return (
      <div styleName="container">
        {this.renderItemsSelection()}
        <div styleName="controllers">
          <Dropzone
            ref={refDropzone}
            onDrop={this.onDrop}
            style={{}}
            accept="image/jpeg, image/png"
            multiple={false}
          />
          <button
            onClick={this.onPhotoClick}
            className="button"
            styleName="button"
          >
            照片
          </button>
          <button
            onClick={this.onItemSelectClick}
            className="button"
            styleName="button"
          >
            商品
          </button>
        </div>
        <div styleName="input">
          <TextareaAutosize
            styleName="input-text-area"
            value={input}
            onChange={this.onInputChange}
            onKeyDown={this.onEnter}
          />
        </div>
      </div>
    );
  }
}

export default CSS(InputBox, styles);
