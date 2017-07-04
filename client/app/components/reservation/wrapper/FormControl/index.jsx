import React from 'react';
import PropTypes from 'prop-types';
import myPropTypes from 'propTypes';
import styled from 'styled-components';
import colors from 'styles/colorExport.scss';

const Container = styled.div`
  margin-bottom: 20px;
`;
const Label = styled.div`
  line-height: 18px;
  font-size: 16px;
  color: ${colors.middleBlack};
`;
const InputContainer = styled.div`
  margin: 10px 0;
`;
const Helper = styled.div`
  color: ${colors.blackColor};
  font-size: 14px;
  line-height: 20px;
`;
class FormControl extends React.Component {
  static defaultProps = {
    helper: null,
  };
  static propTypes = {
    label: PropTypes.string.isRequired,
    children: myPropTypes.children.isRequired,
    helper: PropTypes.string,
  };
  render() {
    const { label, children, helper } = this.props;
    return (
      <Container>
        <Label>{label}</Label>
        <InputContainer>{children}</InputContainer>
        <Helper>{helper}</Helper>
      </Container>
    );
  }
}

export default FormControl;
