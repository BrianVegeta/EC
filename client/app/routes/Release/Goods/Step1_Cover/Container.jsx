import React from 'react';
import PropTypes from 'prop-types';
import CSS from 'react-css-modules';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import _ from 'lodash';
import styles from './styles.sass';
import ModalEditor from './ModalEditor';
import SortableGallery from './SortableGallery';
import { checkThumbsAndUpload } from '../../../../actions/publishThumbsActions';
import { TITLE, COVER, PATH } from '../../constants';
import {
  TitleWrapper,
  IntervalLine,
  AlertPanel,
  NextStep,
} from '../../components';

class CoverContainer extends React.Component {
  static propTypes = {
    publish: PropTypes.objectOf(PropTypes.oneOfType([
      PropTypes.array,
      PropTypes.object,
      PropTypes.string,
      PropTypes.number,
    ])).isRequired,
    dispatch: PropTypes.func.isRequired,
  };
  static getUnStoredsCount(coverThumbs) {
    if (_.isEmpty(coverThumbs)) {
      return null;
    }
    const unStoreds = _.filter(coverThumbs, thumb =>
      !thumb.isStored,
    );
    return unStoreds.length;
  }
  static saveAndNext() {
    browserHistory.push(PATH.STEP_2_ABOUT);
  }
  constructor(props) {
    super(props);
    this.validateAll = this.validateAll.bind(this);
    this.beforeNext = this.beforeNext.bind(this);
    this.state = {
      atLeastOneCoverError: null,
    };
  }
  beforeNext() {
    this.props.dispatch(checkThumbsAndUpload());
  }
  validateAll() {
    const errorMessage = COVER.ERROR_AT_LEAST_ONE_COVER;
    this.setState({
      atLeastOneCoverError: (this.hasLeastOneCover() ? null : errorMessage),
    });
  }
  isAllValid() {
    return this.hasLeastOneCover();
  }
  hasLeastOneCover() {
    const { publish } = this.props;
    return publish.coverThumbs.length > 0;
  }
  render() {
    const { atLeastOneCoverError } = this.state;
    const { publish, dispatch } = this.props;
    const { coverCropper, coverThumbs } = publish;
    const nextStepProps = {
      onNext: this.constructor.saveAndNext,
      onValid: this.validateAll,
      isDisabled: !this.isAllValid(),
      beforeNext: this.beforeNext,
      waitingCount: this.constructor.getUnStoredsCount(coverThumbs),
    };
    return (
      <div styleName="container">
        <TitleWrapper>{TITLE.UPLOAD_COVER}</TitleWrapper>
        <ul styleName="noticeList">
          <li>{COVER.NOTICE_MOST}</li>
          <li>{COVER.NOTICE_FORMAT_REQUIRED}</li>
          <li>{COVER.NOTICE_SIZE_LIMIT}</li>
          <li>{COVER.NOTICE_PIXEL_SUGGESTION}</li>
        </ul>
        <SortableGallery covers={coverThumbs} dispatch={dispatch} />
        {atLeastOneCoverError &&
          <div>
            <AlertPanel message={atLeastOneCoverError} marginBottom={20} />
          </div>
        }
        <IntervalLine marginBottom={60} color="#888" />
        <NextStep {...nextStepProps} />
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
