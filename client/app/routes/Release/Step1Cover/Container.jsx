import React, { PropTypes } from 'react';
import CSS from 'react-css-modules';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import styles from './styles.sass';
import NextController from '../NextController';
import { UPLOAD_COVER } from '../constants/title';
import ImageEditor from './ImageEditor';
import SortableGallery from './SortableGallery';

class CoverContainer extends React.Component {
  static propTypes = {
    editorCovers: PropTypes.objectOf(PropTypes.oneOfType([
      PropTypes.array, PropTypes.object, PropTypes.string,
    ])).isRequired,
  };
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
    const { blob, croppedCanvs } = this.props.editorCovers.current;
    return (
      <div styleName="container">
        <h2 styleName="title">{UPLOAD_COVER}</h2>
        <ul styleName="noticeList">
          <li>最多新增3張照片</li>
          <li>圖片格式：jpg、jpge、png</li>
          <li>每一張不得超過2MB</li>
        </ul>
        <SortableGallery {...this.props} />
        <NextController next={this.saveAndNext} />
        { blob && <ImageEditor image={blob} croppedCanvs={croppedCanvs} open {...this.props} /> }
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const { environment, routesHelper, editorCovers } = state;
  return ({ environment, routesHelper, editorCovers });
};
export default connect(mapStateToProps)(CSS(CoverContainer, styles));
