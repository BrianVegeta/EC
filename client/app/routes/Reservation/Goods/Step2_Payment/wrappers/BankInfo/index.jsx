import React from 'react';

import PropTypes from 'prop-types';
import myPropTypes from 'propTypes';
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

class BankInfo extends React.PureComponent {

  static propTypes = {
    model: PropTypes.object.isRequired,
  };

  constructor(props) {
    super(props);
  }

  render() {
    const {
      model,
    } = this.props;

    return (
      <Container>
        <Info>
          <Bank>銀行帳戶：遠東國際商業銀行</Bank>
          <FormButton
            colorType="greenBorder"
            content="查看"
            size="sm"
            width={90}
            onClick={model.setup}
          />
        </Info>
        <Notice>當交易完成後，銀行會在每週一、三，將您的收入款項轉帳至您的銀行帳戶</Notice>
      </Container>
    );
  }
}

export default BankInfo;
