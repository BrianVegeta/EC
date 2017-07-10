import React from 'react';
// import PropTypes from 'prop-types';
import myPropTypes from 'propTypes';
import styled from 'styled-components';
import Textarea from 'components/inputs/Textarea';

const Container = styled.div`
  margin-top: 10px;
`;

class Note extends React.Component {

  static propTypes = {
    model: myPropTypes.model.isRequired,
  };

  valid() {
    this.input.valid();
  }

  render() {
    const { model } = this.props;
    return (
      <Container>
        <Textarea
          {...{
            ref: input => (this.input = input),
            value: model.value,
            placeholder: '',
            onChange: model.onChange,
            minHeight: 170,
            validator: model.validator,
          }}
        />
      </Container>
    );
  }
}

export default Note;
