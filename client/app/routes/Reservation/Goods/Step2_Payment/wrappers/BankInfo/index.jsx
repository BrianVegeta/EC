import React from 'react';

import PropTypes from 'prop-types';
import styled from 'styled-components';
import colors from 'styles/colorExport.scss';

import FormButton from 'components/FormButton';


const Container = styled.div`
  margin-bottom: 50px;
`;

const Info = styled.div`
  padding: 10px 0;
  color: ${colors.blackColor};
  font-size: 1.1em;
`;

const Notice = styled.div`
  color: ${colors.middleBlack};
  font-size: 1em;
`;

const Bank = styled.span`
  margin-right: 20px;
`;

const BankNameDesc = styled.span`
  color: ${colors.colorDanger};
`;

class BankInfo extends React.PureComponent {

  static propTypes = {
    model: PropTypes.shape({
      bankNameDesc: PropTypes.string,
    }).isRequired,
    onOpenSetup: PropTypes.func.isRequired,
  };

  render() {
    const {
      model,
      onOpenSetup,
    } = this.props;

    const { bankNameDesc } = model;

    return (
      <Container>
        <Info>
          <Bank>
            銀行帳戶：
            {bankNameDesc ?
              <span>{bankNameDesc}</span>
              : <BankNameDesc>尚未設定</BankNameDesc>
            }
          </Bank>
          <FormButton
            colorType="greenBorder"
            content="查看"
            size="sm"
            width={90}
            onClick={onOpenSetup}
          />
        </Info>
        <Notice>當交易完成後，銀行會在每週一、三，將您的收入款項轉帳至您的銀行帳戶</Notice>
      </Container>
    );
  }
}

export default BankInfo;
