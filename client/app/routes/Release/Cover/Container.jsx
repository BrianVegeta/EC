import React, { PropTypes } from 'react';
import CSS from 'react-css-modules';
import { connect } from 'react-redux';
import styles from './styles.sass';

const CoverContainer = () => {
  return (
    <div styleName="container">
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
};

const mapStateToProps = (state) => {
  const { environment, routesHelper } = state;
  return ({ environment, routesHelper });
};
export default connect(mapStateToProps)(CSS(CoverContainer, styles));
