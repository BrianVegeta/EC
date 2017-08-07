import React from 'react';
import styled from 'styled-components';
import IconFacebook from 'react-icons/lib/fa/facebook-square';
import IconLink from 'react-icons/lib/md/insert-link';
import FavoriteHeart from 'components/FavoriteHeart';

const Container = styled.div`
  box-shadow: 0 2px 4px 0 rgba(0,0,0,0.1);
  padding: 20px;
  border: 1px solid #CECECE;
  margin-top: 20px
`;
const CollectButton = styled.button`
  border: 1px solid #999;
  border-radius: 3px;
  margin-bottom: 10px;
  width: 100%;
  padding: 15px;
  color: #444;
`;
const ButtonInnerText = styled.span`
  vertical-align: middle;
  margin-left: 5px;
`;
const BeenCollected = styled.div`
  text-align: center;
  line-height: 14px;
  font-size: 14px;
  color: #666;
  margin-bottom: 30px;
`;
const ShareGroup = styled.div`
  color: #666;
  margin-top: 30px;
  text-align: center;
  & > svg {
    cursor: pointer;
  }
  & > svg:not(:first-child) {
    margin-left: 10px;
  }
  & > svg:hover {
    color: #999;
  }
  & > svg:active {
    color: #888;
  }

`;
class InteractiveBoard extends React.Component {
  render() {
    return (
      <Container >
        <CollectButton className="button">
          <FavoriteHeart size={22} />
          <ButtonInnerText >收藏</ButtonInnerText>
        </CollectButton>
        <BeenCollected >
          <span>23</span>人已收藏
        </BeenCollected>
        <ShareGroup >
          <IconFacebook size={30} />
          <IconLink size={30} />
        </ShareGroup>
      </Container>
    );
  }
}

export default InteractiveBoard;
