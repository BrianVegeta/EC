import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import colors from 'styles/colorExport.scss';
import Picture from 'components/Picture';

const Container = styled.div`
  width: 564px;
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

const Title = styled.div`
  font-size: 18px;
  line-height: 25px;
  margin-top: 1px;
  min-height: 60px;
`;
const Price = styled.div`
  font-weight: 300;
  font-size: 24px;
  line-height: 26px;
`;
const Unit = styled.span`
  font-size: 18px;
`;
class ItemCard extends React.Component {

  static propTypes = {
    model: PropTypes.shape({
      coverUrl: PropTypes.string.isRequired,
      pname: PropTypes.string.isRequired,
      priceDesc: PropTypes.string.isRequired,
      priceUnit: PropTypes.string.isRequired,
    }).isRequired,
  };

  render() {
    const {
      coverUrl,
      pname,
      priceDesc,
      priceUnit,
    } = this.props.model;

    return (
      <Container className="clear">
        <Cover>
          <Picture
            src={coverUrl}
            style={{
              borderBottomLeftRadius: 4,
              borderTopLeftRadius: 4,
            }}
          />
        </Cover>
        <Content >
          <Title>{pname}</Title>
          <Price >
            {priceDesc}
            <Unit>/{priceUnit}</Unit>
          </Price>
        </Content>
      </Container>
    );
  }
}

export default ItemCard;
