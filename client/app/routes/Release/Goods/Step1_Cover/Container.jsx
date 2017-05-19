import React, { PropTypes } from 'react';
import CSS from 'react-css-modules';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import _ from 'lodash';
import styles from './styles.sass';
import NextController from '../../components/NextController';
import { UPLOAD_COVER } from '../../constants/title';
import ModalEditor from './ModalEditor';
import SortableGallery from './SortableGallery';
import { checkThumbsAndUpload } from '../../../../actions/publishThumbsActions';

class CoverContainer extends React.Component {
  static propTypes = {
    publish: PropTypes.objectOf(PropTypes.oneOfType([
      PropTypes.array, PropTypes.object, PropTypes.string,
    ])).isRequired,
    dispatch: PropTypes.func.isRequired,
  };
  constructor(props) {
    super(props);
    this.saveAndNext = this.saveAndNext.bind(this);
  }
  saveAndNext() {
    this.props.dispatch(checkThumbsAndUpload());
    // setTimeout(() =>
    //   browserHistory.push('/p/release_item/step2')
    // , 2000);
  }
  checkImagesUploaded() {
    const { publish } = this.props;
    const unStoreds = _.filter(publish.coverThumbs, thumb =>
      !thumb.isStored,
    );

    console.log(unStoreds);
  }
  render() {
    const { publish, dispatch } = this.props;
    const { coverCropper, coverThumbs } = publish;
    return (
      <div styleName="container">
        <h2 styleName="title">{UPLOAD_COVER}</h2>
        <ul styleName="noticeList">
          <li>最多新增3張照片</li>
          <li>圖片格式：jpg、jpge、png</li>
          <li>每一張不得超過2MB</li>
        </ul>
        <SortableGallery covers={coverThumbs} dispatch={dispatch} />
        <NextController next={this.saveAndNext} />
        {this.checkImagesUploaded()}
        { coverCropper.blob && <ModalEditor /> }
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const { environment, routesHelper, publish } = state;
  return ({ environment, routesHelper, publish });
};
export default connect(mapStateToProps)(CSS(CoverContainer, styles));
