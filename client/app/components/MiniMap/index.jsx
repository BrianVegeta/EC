import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import colors from 'styles/colorExport.scss';
import Picture from 'components/Picture';

const Container = styled.div`
  position: relative;
  border-radius: 5px;
  background-color: #FFFFFF;
  border: 1px solid ${colors.placeholder};
`;
const Cover = styled.div`
  width: 120px;
  height: 120px;
  float: left;
`;
const Content = styled.div`
  margin-left: 120px;
  color: ${colors.blackColor};
  padding: 15px;
`;

const CidNumberText = styled.div`
  color: ${colors.middleBlack};
  font-size: 16px;
  font-weight: 200;
`;

const ItemNameText = styled.div`
  color: ${colors.blackColor};
  font-size: 18px;
  padding-top: 15px;
  font-weight: 300;
`;

class MiniMap extends React.Component {

  static propTypes = {
    cover: PropTypes.string.isRequired,
    cidNumber: PropTypes.string.isRequired,
    itemName: PropTypes.string.isRequired,
  };

  render() {
    const {
      cover,
      cidNumber,
      itemName,
    } = this.props;

    return (
      <Container className="clear">
        <Cover>
          <Picture
            src={cover}
            style={{
              borderBottomLeftRadius: 4,
              borderTopLeftRadius: 4,
            }}
          />
        </Cover>
        <Content >
          <CidNumberText>{cidNumber}</CidNumberText>
          <ItemNameText>{itemName}</ItemNameText>
        </Content>
      </Container>
    );
  }
}

export default MiniMap;
