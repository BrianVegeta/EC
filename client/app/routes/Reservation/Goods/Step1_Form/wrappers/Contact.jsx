import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import InputText from 'components/Input/Text';

const NameContainer = styled.div`
  width: 210px;
  margin-right: 20px;
  display: inline-block;
`;
const PhoneContainer = styled.div`
  width: 330px;
  display: inline-block;
`;

class Contact extends React.Component {

  static propTypes = {
    model: PropTypes.shape({
      name: PropTypes.object,
      phone: PropTypes.object,
    }).isRequired,
  };

  render() {
    const { model } = this.props;
    const { name, phone } = model;
    return (
      <div>
        <NameContainer>
          <InputText
            placeholder="姓名"
            value={name.value}
            onChange={name.onChange}
            validator={name.validator}
          />
        </NameContainer>
        <PhoneContainer>
          <InputText
            placeholder="電話號碼"
            value={phone.value}
            onChange={phone.onChange}
            validator={phone.validator}
          />
        </PhoneContainer>
      </div>
    );
  }
}

export default Contact;
