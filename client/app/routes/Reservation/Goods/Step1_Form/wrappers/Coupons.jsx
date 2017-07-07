import React from 'react';
import PropTypes from 'prop-types';
import myPropTypes from 'propTypes';
import styled from 'styled-components';
import InputSelection from 'components/inputs/InputSelection';
import colors from 'styles/colorExport.scss';
import { formatDate } from 'lib/time';
import { formatCurrency } from 'lib/currency';

const Container = styled.div`
  width: 380px;
  margin: 20px 0;
`;

const OptionContainer = styled.div`
  position: relative;
`;

const Name = styled.div`
  word-wrap: break-word;
  overflow: hidden;
  max-height: 1.5em;
  line-height: 1.5em;
  font-size: 1.2em;
  color: ${colors.blackColor};
`;

const OptionFooter = styled.div`
  position: relative;
  line-height: 1.5em;
`;

const Amount = styled.div`
  float: left;
  font-size: 1.2em;
  color: ${colors.orangeColor};
`;

const Expired = styled.div`
  float: right;
  font-size: 1em;
  color: ${colors.middleBlack};
`;

class Coupons extends React.Component {

  static propTypes = {
    model: myPropTypes.reserve.couponsModel.isRequired,
    placeholder: PropTypes.string.isRequired,
  };

  static renderChoice({ name }) {
    return `${name}`;
  }

  static renderOption({ name, amount, expiredAt }) {
    return (
      <OptionContainer >
        <Name>{name}</Name>
        <OptionFooter className="clear">
          <Amount>{formatCurrency(amount)}</Amount>
          <Expired>{formatDate(expiredAt)}到期</Expired>
        </OptionFooter>
      </OptionContainer>
    );
  }

  render() {
    const { placeholder, model } = this.props;
    const {
      value,
      options,
      onSelect,
      validator,
    } = model;
    const {
      renderChoice,
      renderOption,
    } = this.constructor;

    return (
      <Container>
        <InputSelection
          {...{
            placeholder,
            value,
            options,
            onSelect,
            renderChoice,
            renderOption,
            validator,
          }}
        />
      </Container>
    );
  }
}

export default Coupons;
