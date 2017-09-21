import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import Avatar from 'components/Avatar';
import FormButton from 'components/FormButton';
import { orderDetail, userprofilePaths } from 'lib/paths';
import { redirectToWithReferrer } from 'lib/redirect';
import CSS from 'react-css-modules';
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
    this.onChat = this.onChat.bind(this);
    this.onSue = this.onSue.bind(this);
  }

  onChat() {
    const { imgUrl: picture, uid, name, dispatchAddToChatRoom } = this.props;
    dispatchAddToChatRoom({ uid, name, picture });
  }

  onSue() {
    const { cid, dispatch } = this.props;
    const suePath = orderDetail.sueFormPath(cid);
    dispatch(redirectToWithReferrer(suePath));
  }

  render() {
    const { realname, phone, imgUrl, contractstage, uid } = this.props;
    const showSueForm = (contractstage > 4 && contractstage < 11);
    const buttonProps = {
      size: 'sm',
      width: 'auto',
      style: { fontWeight: 600, padding: '7px 23px' },
    };
    const userprofilePath = userprofilePaths.indexPath(uid);
    return (
      <div styleName="boundary">
        <Link to={userprofilePath} styleName="head-style">
          <Avatar src={imgUrl} />
        </Link>
        <div styleName="board-style">
          <div styleName="name-style">真實姓名：{realname}</div>
          <div styleName="phone-style">手機號碼：{phone}</div>
          <div styleName="panel-style">
            <div styleName="btn-section">
              <div styleName="btn-outer-style">
                <FormButton
                  colorType="greenBorder"
                  content="私訊"
                  onClick={this.onChat}
                  {...buttonProps}
                />
              </div>
              {
                showSueForm &&
                <div styleName="btn-outer-style">
                  <FormButton
                    colorType="grayBorder"
                    content="申訴"
                    onClick={this.onSue}
                    {...buttonProps}
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
