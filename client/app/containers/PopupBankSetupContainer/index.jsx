import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import FormBlock from 'components/Form/Block';
import InputText from 'components/Input/Text';
import FormButton from 'components/FormButton';

import { nextProcess } from 'actions/scheduleActions';
// import classnames from 'classnames/bind';
import CSS from 'react-css-modules';
import styles from './styles.sass';

// const cx = classnames.bind(styles);

class BankSetupContainer extends React.Component {

  static propTypes = {
    dispatch: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onSubmit() {
    const { dispatch } = this.props;
    dispatch(nextProcess());
  }

  render() {
    return (
      <div styleName="container">
        <div styleName="header">設定銀行帳戶</div>
        <div styleName="body">
          <p styleName="warning">您填寫的資訊必須與身分證一致，以利銀行核對，否則將會影響日後撥款權益。</p>
          <FormBlock title="基本資料" hasBottomLine={false}>
            <div styleName="nameFormControl">
              <InputText
                value=""
                placeholder="真實姓名"
                validator={() => console.log('validate')}
                onChange={() => console.log('onChange')}
              />
            </div>
            <div styleName="idFormControl">
              <InputText
                value=""
                placeholder="身分證字號/統編"
                validator={() => console.log('validate')}
                onChange={() => console.log('onChange')}
              />
            </div>
          </FormBlock>
        </div>
        <div styleName="footer">
          <FormButton
            width={170}
            colorType="orange"
            content="完成"
            onClick={this.onSubmit}
          />
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const { environment, item, reservation, myCoupons, modal } = state;
  return ({ environment, item, reservation, myCoupons, modal });
};
export default connect(mapStateToProps)(CSS(BankSetupContainer, styles));
