import React, { PropTypes } from 'react';
import CSS from 'react-css-modules';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import styles from './styles.sass';
import NextButton from './NextButton';

class CoverContainer extends React.Component {

  constructor(props) {
    super(props);
    this.saveAndNext = this.saveAndNext.bind(this);
    this.state = {
      editStatus: 'default', // default, ready, nexting
    };
  }

  componentDidMount() {
    setTimeout(() => this.setState({ editStatus: 'ready' }), 3000);
  }

  saveAndNext() {
    setTimeout(() =>
      browserHistory.push('/p/release_item/step2')
    , 2000);
    this.setState({ editStatus: 'nexting' });
  }

  render() {
    return (
      <div styleName="container">
        <h2 styleName="title">上傳照片</h2>
        <ul styleName="noticeList">
          <li>最多新增3張照片</li>
          <li>圖片格式：jpg、jpge、png</li>
          <li>每一張不得超過2MB</li>
        </ul>
        <div styleName="gallery">
          <div styleName="imageUploader" />
          <div styleName="imageUploader" />
          <div styleName="imageUploader" />
          <div styleName="splitline" />
        </div>
        <div styleName="control">
          <NextButton
            editStatus={this.state.editStatus}
            dispatch={this.saveAndNext}
          />
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const { environment, routesHelper } = state;
  return ({ environment, routesHelper });
};
export default connect(mapStateToProps)(CSS(CoverContainer, styles));
