import React from 'react';
import PropTypes from 'prop-types';
import myPropTypes from 'propTypes';
import { connect } from 'react-redux';
import styled from 'styled-components';
import InputSelection from 'components/inputs/InputSelection';
import TitleWrapper from 'components/reservation/wrapper/Title';
import ItemCard from 'components/reservation/wrapper/ItemCard';
import FormBlock from 'components/reservation/wrapper/FormBlock';
import FormControl from 'components/reservation/wrapper/FormControl';
import DeliverySingle from 'components/reservation/wrapper/DeliverySingle';
import FormButton from 'components/FormButton';
import SelectionCitiesContainer from 'components/inputs/SelectionCitiesContainer';
import Model from './Model';

const Container = styled.div`
  margin-bottom: 50px;
`;
const DeliverSelection = styled.div`
  width: 300px;
`;
class Form extends React.PureComponent {
  static propTypes = {
    item: myPropTypes.item.isRequired,
    dispatch: PropTypes.func.isRequired,
  };
  render() {
    const { item, dispatch } = this.props;
    const itemInstance = new Model(item.detail, dispatch);
    const { coverUrl, pname, priceDesc, priceUnit } = itemInstance;
    const { sendOptionsIsAlone, sendOptionsDesc, sendOptions } = itemInstance;
    const { returnOptionsIsAlone, returnOptionsDesc, returnOptions } = itemInstance;
    const SOL = '到貨方式';
    const ROL = '寄還方式';
    return (
      <Container >
        <TitleWrapper text="填寫預訂資訊" />
        <ItemCard {...{ coverUrl, pname, priceDesc, priceUnit }} />
        <FormBlock title="物流方式">
          {sendOptionsIsAlone ?
            <DeliverySingle
              label={`${SOL}：`}
              content={sendOptionsDesc}
            /> :
            <FormControl label={SOL}>
              <DeliverSelection >
                <InputSelection
                  placeholder={`選擇${SOL}`}
                  options={sendOptions}
                />
              </DeliverSelection>
            </FormControl>
          }
          {returnOptionsIsAlone ?
            <DeliverySingle
              label={`${ROL}：`}
              content={returnOptionsDesc}
            /> :
            <FormControl
              label={ROL}
              helper="當您提交預訂單後，分享人會提供給您寄還的地點"
            >
              <DeliverSelection >
                <InputSelection
                  placeholder={`選擇${ROL}`}
                  options={returnOptions}
                />
              </DeliverSelection>
            </FormControl>
          }
        </FormBlock>
        <FormBlock title="交易明細">
          1
        </FormBlock>
        <FormBlock
          title="聯絡資訊"
          tip="您與另一位用戶確認預訂後，才會顯示您的姓名與號碼，用以聯絡彼此。"
        >
          1
        </FormBlock>
        <FormBlock title="備註" hasMargin={false} hasBottomLine={false}>
          1
        </FormBlock>
        <FormButton colorType="orange" content="下一步" width={150} />
      </Container>
    );
  }
}

const mapStateToProps = (state) => {
  const { environment, item } = state;
  return ({ environment, item });
};
export default connect(mapStateToProps)(Form);
