import React, { PropTypes } from 'react';

class InputCover extends React.Component {
  render() {
    return (
      <div {...this.props} >
        <h2 styleName="title">上傳照片</h2>
        <ul styleName="noticeList">
          <li>最多新增3張照片</li>
          <li>圖片格式：jpg、jpge、png</li>
          <li>每一張不得超過2MB</li>
        </ul>
        <div styleName="gallery">
          <div styleName="imageUploader"></div>
          <div styleName="imageUploader"></div>
          <div styleName="imageUploader"></div>
        </div>
      </div>
    );
  }
}

export default InputCover;
