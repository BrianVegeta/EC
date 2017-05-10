import React from 'react';
import CSS from 'react-css-modules';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import styles from './styles.sass';
import NextController from '../NextController';
import { UPLOAD_COVER } from '../constants/title';
import ImageDropzone from './ImageDropzone';

class CoverContainer extends React.Component {

  constructor(props) {
    super(props);
    this.saveAndNext = this.saveAndNext.bind(this);
  }

  saveAndNext() {
    setTimeout(() =>
      browserHistory.push('/p/release_item/step2')
    , 2000);
  }

  render() {
    return (
      <div styleName="container">
        <h2 styleName="title">{UPLOAD_COVER}</h2>
        <ul styleName="noticeList">
          <li>最多新增3張照片</li>
          <li>圖片格式：jpg、jpge、png</li>
          <li>每一張不得超過2MB</li>
        </ul>
        <div styleName="gallery" className="clear">
          <ImageDropzone containerClass={styles.imageDropzone} isCover />
          <ImageDropzone containerClass={styles.imageDropzone} />
          <ImageDropzone containerClass={styles.imageDropzone} />
        </div>
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
