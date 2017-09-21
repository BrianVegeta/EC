import React from 'react';
import PropTypes from 'prop-types';
import Icon from 'components/Icons/OrderDetail/Appeal';
import CSS from 'react-css-modules';

import FormButton from 'components/FormButton';

import { popupSueDetail } from 'modules/popup';

import styles from './styles.sass';

class SueBanner extends React.Component {

  static propTypes = {
    sueDetail: PropTypes.shape({
      u_no: PropTypes.string,
      type: PropTypes.string,
      status: PropTypes.string,
      sue_reason: PropTypes.string,
      img1: PropTypes.string,
      img2: PropTypes.string,
      img3: PropTypes.string,
      defender_name: PropTypes.string,
      suer_name: PropTypes.string,
      case_end: PropTypes.number,
      create_time: PropTypes.number,
    }).isRequired,
    contractstage: PropTypes.number.isRequired,
    cid: PropTypes.number.isRequired,
    dispatch: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
    this.onSueDetail = this.onSueDetail.bind(this);
  }

  onSueDetail() {
    const { cid, dispatch, sueDetail } = this.props;
    const option = Object.assign({}, sueDetail, { cid });
    dispatch(popupSueDetail(option));
  }

  render() {
    const { contractstage } = this.props;
    const objString = { title: '', text: '' };
    if (contractstage > 1000 && contractstage < 3000) {
      const screenStage = contractstage % 100;
      if (screenStage < 11) {
        objString.title = '申訴中';
        objString.text = '您於 2017/04/14 AM10:38向GOGO提出申訴。雙方必須在14天內提出協議文件（雙方簽名、金額分配及簽署日期）寄到ShareApp郵政信箱，我們將依照協議後的結果進行撥款。';
      } else {
        objString.title = '申訴完成';
      }
    } else {
      objString.title = '合約已取消';
    }
    return (
      <div styleName="container" className="clear">
        <div styleName="title-container">
          <Icon style={{ float: 'left' }} size={35} />
          <div styleName="title">{objString.title}</div>
        </div>
        <div styleName="body-content">
          <span>{ objString.text }</span>
        </div>
        <div style={{ float: 'right', margin: '15px 20px 15px 0px' }}>
          <FormButton
            colorType="transparent"
            content="申訴詳情"
            size="sm"
            width={130}
            onClick={this.onSueDetail}
          />
        </div>
      </div>
    );
  }
}
export default CSS(SueBanner, styles);
