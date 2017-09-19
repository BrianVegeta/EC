import React from 'react';
import PropTypes from 'prop-types';

import CSS from 'react-css-modules';
import MiniMap from 'components/MiniMap/index';
import InputTextArea from 'components/Input/TextArea';
import FormGroup from 'components/Form/Group';
import FormTitleLimiter from 'components/Form/TitleLimiter';
import constraints from 'constraints/publish';
import InputRadio from 'components/Input/Radio';
import FormButton from 'components/FormButton';
import SortableGallery from 'components/Publish/SortableGallery';
import CheckBox from 'components/Input/CheckBox';
import AlertPanel from 'components/Alert/Panel';

import { ItemSueOption, ServiceSueOption, SpaceSueOption, UsedItemSueOption }
  from 'constants/sueOption';
// import colors from 'styles/colorExport.scss';

import styles from './styles.sass';

class SueForm extends React.Component {

  static propTypes = {
    sueGallery: PropTypes.arrayOf(PropTypes.object).isRequired,
    dispatchRecords: PropTypes.func.isRequired,
    dispatchSend: PropTypes.func.isRequired,
    dispatchReset: PropTypes.func.isRequired,
    dispatchCreateCover: PropTypes.func.isRequired,
    dispatchDeleteCover: PropTypes.func.isRequired,
    dispatchChangeOrders: PropTypes.func.isRequired,
    dispatchCancel: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      option: -1,
      check: false,
      reason: '',
      showNeedCheck: false,
      showNeedReason: false,
    };

    this.uploadData = {
      cid: 0,
      pid: 0,
      img1: null,
      img2: null,
      img3: null,
      reason: '',
      targetUid: '',
      type: '',
      sueType: 0,
      sueCategory: 0,
      sueStage: 0,
    }

    this.onSave = this.onSave.bind(this);
  }

  componentDidMount() {
    this.props.dispatchRecords();
  }

  componentWillUnmount() {
    this.props.dispatchReset();
  }

  onSave() {
    const { check, option } = this.state;
    let isValid = true;
    let showNeedCheck = false;
    let showNeedReason = false;

    if (!check) {
      isValid = false;
      showNeedCheck = true;
    }

    if (option <= 0) {
      isValid = false;
      showNeedReason = true;
    }

    if (!isValid) {
      return this.setState({ showNeedCheck, showNeedReason });
    }
    const { pid, reason, targetUid, type, sueType,
      sueCategory, sueStage } = this.uploadData;
    const targetstage = sueType + sueCategory + sueStage;
    this.props.dispatchSend(pid, targetstage, reason, targetUid, type);

    return 0;
  }

  renderSueOption(type) {
    let list = [];
    switch (type) {
      case 'ITEM':
        list = ItemSueOption;
        break;
      case 'SERVICE':
        list = ServiceSueOption;
        break;
      case 'SPACE':
        list = SpaceSueOption;
        break;
      case 'USED_ITEM':
        list = ItemSueOption;
        break;
      default:
        break;
    }

    return (
      <div styleName="sue-option-background-style">
        { list.map((opt) => {
          const { name, val } = opt;
          return (
            <div
              key={val}
              styleName="sue-option-content-style"
            >
              <InputRadio
                checked={this.state.option === val}
                onChange={() => {
                  this.uploadData.type = name;
                  this.uploadData.sueCategory = val;
                  this.setState({ option: val });
                }}
              >
                <span style={{ color: '#333' }}>{name}</span>
              </InputRadio>
            </div>
          );
        })}
      </div>
    );
  }
  render() {
    const { sueDetail, sueGallery } = this.props;
    const { record } = sueDetail;
    if (!(record) || (record.contractstage > 1000)) {
      return null;
    }
    if (this.uploadData.cid === 0) {
      const { currentUser } = this.props;
      const isOwner = (currentUser.uid === record.owneruid);
      this.uploadData.pid = record.pid;
      this.uploadData.cid = record.cid;
      this.uploadData.targetUid = isOwner ? record.lesseeuid : record.owneruid;
      this.uploadData.sueType = isOwner ? 1000 : 2000;
      this.uploadData.sueStage = (record.contractstage % 100);
    }
    const {
      dispatchCreateCover,
      dispatchDeleteCover,
      dispatchChangeOrders,
    } = this.props;
    const { reason, showNeedCheck, showNeedReason } = this.state;
    return (
      <div styleName="sue-form-content-border">
        <div styleName="sue-form-header">申訴</div>
        <div styleName="sue-form-section-background">
          <MiniMap
            cover={`${record.img1}`}
            cidNumber={`合約編號：${record.cid_no}`}
            itemName={`${record.pname}`}
          />
          <div styleName="sue-red-text-hint">
            當您提出申訴後，雙方必須在14天內私下進行協議，
            並提出協議文件（雙方簽名、金額分配及簽署日期）
            寄到ShareApp郵政信箱customer@shareapp.com.tw，
            我們再依照協議後的結果進行撥款。
          </div>
        </div>
        <div styleName="sue-form-section-background">
          <div styleName="sue-form-section-title">申訴原因</div>
          {showNeedReason &&
            <AlertPanel
              text="請選擇申訴原因"
              outerStyle={{ display: 'inline-block', marginLeft: '20px' }}
            />
          }
          {this.renderSueOption(record.type)}
        </div>
        <div styleName="sue-form-section-background">
          <div styleName="sue-form-section-title">備註</div>
          <div styleName="sue-form-section-subtitle">（非必填）</div>
          <FormGroup
            headerText=" "
            limiter={<FormTitleLimiter limit={250} length={reason.length} />}
          >
            <InputTextArea
              ref={reasonInput => (this.reasonInput = reasonInput)}
              placeholder="您可以在這裡留下修改的問題..."
              onChange={(value) => {
                this.uploadData.reason = value;
                this.setState({ reason: value });
              }}
              value={reason}
              constraints={constraints.descript}
              validateOnBlur
            />
          </FormGroup>
        </div>
        <div styleName="sue-form-section-background">
          <div styleName="sue-form-section-title">上傳照片</div>
          <div styleName="sue-form-section-subtitle">（非必填）</div>
          <div styleName="sue-gallery-container-style">
            <SortableGallery
              addCoverLabel={false}
              covers={sueGallery}
              createCover={blob => dispatchCreateCover(blob, record.cid_no)}
              deleteCover={dispatchDeleteCover}
              changeOrders={dispatchChangeOrders}
              openCropper={() => {}}
            />
          </div>
        </div>
        <div styleName="sue-checkbox-container-style">
          <CheckBox
            checked={this.state.check}
            onChange={val => this.setState({ check: val })}
          >
            <span styleName="sue-checkbox-text-style">我已確認以上的申訴資訊</span>
          </CheckBox>
          {showNeedCheck &&
            <AlertPanel
              text="請勾選確認資訊"
              outerStyle={{ display: 'inline-block', marginLeft: '20px' }}
            />
          }
        </div>
        <div>
          <div styleName="sue-form-botton-style">
            <FormButton
              colorType="greenBorder"
              size="sm"
              width={120}
              content="取消"
              onClick={this.props.dispatchCancel}
            />
          </div>
          <div styleName="sue-form-botton-style">
            <FormButton
              colorType="green"
              size="sm"
              width={120}
              content="送出"
              onClick={this.onSave}
            />
          </div>
        </div>
      </div>
    );
  }
}
export default CSS(SueForm, styles);
