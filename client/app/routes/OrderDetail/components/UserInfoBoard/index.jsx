import React from 'react';
import PropTypes from 'prop-types';

import Avatar from 'components/Avatar'
import FormButton from 'components/FormButton'

import CSS from 'react-css-modules';
import styles from './styles.sass';

class UserInfoBoard extends React.Component {

  static propTypes = {
    realname: PropTypes.string.isRequired,
    phone: PropTypes.string.isRequired,
    startDate: PropTypes.number.isRequired,
    endDate: PropTypes.number.isRequired,
  };

  render() {
    const {
      realname,
      phone,
      startDate,
      endDate,
    } = this.props;

    return (
      <div styleName="boundary">
        <div styleName="head-style">
          <Avatar/>
        </div>
        <div styleName="board-style">
          <div styleName="name-style">真實姓名：陳冠博</div>
          <div styleName="phone-style">手機號碼：0927007189</div>
          <div styleName="panel-style">
            <div styleName="hint-style">同意預訂後顯示</div>
            <div styleName="chat-btn-style">
              <FormButton
                colorType="greenBorder"
                size="sm"
                width={100}
                content="私訊"
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default CSS(UserInfoBoard, styles);
