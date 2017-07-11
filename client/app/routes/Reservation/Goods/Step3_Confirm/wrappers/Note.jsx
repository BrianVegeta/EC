import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import colors from 'styles/colorExport.scss';

const NoteContainer = styled.div`
  color: ${colors.blackColor};
  padding: 20px 0;
`;
const NoteLabel = styled.div`
  text-align: right;
  float: left;
  width: 10%;
`;
const NoteContent = styled.div`
  float: left;
  width: 90%;
`;

class Note extends React.Component {
  static propTypes = {
    model: PropTypes.shape({ value: PropTypes.string }).isRequired,
  };
  render() {
    const { model } = this.props;
    if (!model.value) {
      return null;
    }

    return (
      <NoteContainer className="clear">
        <NoteLabel>備註：</NoteLabel>
        <NoteContent>{model.value}</NoteContent>
      </NoteContainer>
    );
  }
}

export default Note;
