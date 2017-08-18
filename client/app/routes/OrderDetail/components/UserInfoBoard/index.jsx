import React from 'react';
import PropTypes from 'prop-types';
import { browserHistory } from 'react-router';

import Avatar from 'components/Avatar';
import FormButton from 'components/FormButton';

import CSS from 'react-css-modules';

import { detail } from 'lib/paths';
import { redirectToWithReferrer } from 'lib/redirect';

import styles from './styles.sass';

class UserInfoBoard extends React.Component {

  static propTypes = {
    cid: PropTypes.number.isRequired,
    realname: PropTypes.string.isRequired,
    phone: PropTypes.string.isRequired,
    imgUrl: PropTypes.string,
    dispatch: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
    this.onSue = this.onSue.bind(this);
  }

  onSue() {
    const { cid, dispatch } = this.props;
    const suePath = detail.sueFormPath(cid);
    dispatch(redirectToWithReferrer(suePath));
  }

  render() {
    console.log(this.props);
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
            <div styleName="btn-section">
              <div styleName="btn-outer-style">
                <FormButton
                  colorType="greenBorder"
                  size="sm"
                  width={100}
                  content="私訊"
                  onClick={() => {}}
                />
              </div>
              <div styleName="btn-outer-style">
                <FormButton
                  colorType={'green'}
                  size="sm"
                  width={100}
                  content={'申訴'}
                  onClick={this.onSue}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default CSS(UserInfoBoard, styles);
