import React from 'react';
import PropTypes from 'prop-types';

import Avatar from 'components/Avatar';
import FormButton from 'components/FormButton';

import CSS from 'react-css-modules';

import { orderDetail } from 'lib/paths';
import { redirectToWithReferrer } from 'lib/redirect';

import styles from './styles.sass';

class UserInfoBoard extends React.Component {
  static defaultProps = {
    imgUrl: '',
    contractstage: 0,
  }
  static propTypes = {
    cid: PropTypes.number.isRequired,
    uid: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    realname: PropTypes.string.isRequired,
    phone: PropTypes.string.isRequired,
    imgUrl: PropTypes.string,
    contractstage: PropTypes.number,
    dispatchAddToChatRoom: PropTypes.func.isRequired,
    dispatch: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
    this.onSue = this.onSue.bind(this);
  }

  onSue() {
    const { cid, dispatch } = this.props;
    const suePath = orderDetail.sueFormPath(cid);
    dispatch(redirectToWithReferrer(suePath));
  }

  render() {
    const {
      realname,
      phone,
      imgUrl,
      contractstage,
      uid,
      name,
      dispatchAddToChatRoom,
    } = this.props;
    const showSueForm = (contractstage > 4 && contractstage < 11);
    return (
      <div styleName="boundary">
        <div styleName="head-style">
          <Avatar src={imgUrl} />
        </div>
        <div styleName="board-style">
          <div styleName="name-style">{`真實姓名：${realname}`}</div>
          <div styleName="phone-style">{`手機號碼：${phone}`}</div>
          <div styleName="panel-style">
            <div styleName="hint-style">同意預訂後顯示</div>
            <div styleName="btn-section">
              <div styleName="btn-outer-style">
                <FormButton
                  colorType="greenBorder"
                  size="sm"
                  width={100}
                  content="私訊"
                  onClick={() => dispatchAddToChatRoom({
                    uid,
                    name,
                    picture: imgUrl,
                  })}
                />
              </div>
              { showSueForm &&
                <div styleName="btn-outer-style">
                  <FormButton
                    colorType={'green'}
                    size="sm"
                    width={100}
                    content={'申訴'}
                    onClick={this.onSue}
                  />
                </div>
              }
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default CSS(UserInfoBoard, styles);
