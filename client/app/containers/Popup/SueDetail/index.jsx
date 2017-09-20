/* eslint-disable camelcase */
import React from 'react';
import PropTypes from 'prop-types';

import FormButton from 'components/FormButton';
import CoverThreePics from 'components/CoverThreePics';
import { without } from 'lodash';

import CSS from 'react-css-modules';
import styles from './styles.sass';

class SueDetail extends React.Component {

  static defaultProps = {
    type: '與訂單內容不符',
  }
  static propTypes = {
    options: PropTypes.shape({
      cid: PropTypes.number,
      u_no: PropTypes.string,
      type: PropTypes.string,
      suer_name: PropTypes.string,
      defender_name: PropTypes.string,
      img1: PropTypes.string,
      img2: PropTypes.string,
      img3: PropTypes.string,
      sue_reason: PropTypes.string,
      case_end: PropTypes.number,
      create_time: PropTypes.number,
    }).isRequired,
    dispatchClose: PropTypes.func.isRequired,
  }

  render() {
    const { options } = this.props;
    const { type, sue_reason, defender_name,
      u_no, create_time, case_end, img1,
      img2, img3 } = options;
    const images = without([img1, img2, img3], null);
    return (
      <div styleName="content-border">
        <div styleName="top-title">申訴詳情</div>
        <div styleName="type-content">
          {`申訴原因：${type}`}
        </div>
        <div styleName="status-content">
          處理中
        </div>
        <div style={{ marginTop: 30 }}>
          <div styleName="info-content">
            {`被申訴者：${defender_name}`}
          </div>
          <div styleName="info-content">
            {`申訴編號：${u_no}`}
          </div>
          <div styleName="info-content">
            {`申訴時間：${create_time}`}
          </div>
          <div styleName="info-content">
            {`調解期限：${case_end}`}
          </div>
        </div>
        <div style={{ margin: '20px 30px 0px 30px' }}>
          <div style={{ marginBottom: 10 }}>備註：</div>
          <div styleName="reason-content">{sue_reason}</div>
        </div>
        <div style={{ margin: '20px 30px 0px 30px' }}>
          <div style={{ marginBottom: 10 }}>申訴照片：</div>
          <CoverThreePics images={images} />
        </div>
        <div style={{ marginBottom: 30 }}>
          <FormButton
            colorType={'green'}
            style={{ marginLeft: '170px' }}
            size="sm"
            width={130}
            content={'知道了'}
            onClick={this.props.dispatchClose}
          />
        </div>
      </div>
    );
  }
}

export default CSS(SueDetail, styles);
