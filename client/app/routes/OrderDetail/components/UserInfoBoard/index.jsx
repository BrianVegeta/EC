import React from 'react';
import PropTypes from 'prop-types';

import Avatar from 'components/Avatar';
import FormButton from 'components/FormButton';

import CSS from 'react-css-modules';
import styles from './styles.sass';

class UserInfoBoard extends React.Component {

  static propTypes = {
    realname: PropTypes.string.isRequired,
    phone: PropTypes.string.isRequired,
    imgUrl: PropTypes.string,
  };

  render() {
    const {
      realname,
      phone,
      imgUrl,
    } = this.props;
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
            <div styleName="chat-btn-style">
              <FormButton
                colorType="greenBorder"
                size="sm"
                width={100}
                content="私訊"
                onClick={()=>{}}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default CSS(UserInfoBoard, styles);
