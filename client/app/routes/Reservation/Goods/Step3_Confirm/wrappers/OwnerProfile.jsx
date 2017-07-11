import React from 'react';
import PropTypes from 'prop-types';
import myPropTypes from 'propTypes';
import styled from 'styled-components';
import colors from 'styles/colorExport.scss';

import Avatar from 'components/Avatar';
import FormButton from 'components/FormButton';

const sibling = `
  display: inline-block;
  float: left;
  height: 50px;
`;
const Container = styled.div`
  padding: 20px 0 40px 0;
`;

const AvatarContainer = styled.div`
  ${sibling}
  width: 50px;
  margin-right: 15px;
`;

const InfoContainer = styled.div`
  ${sibling}
  width: auto;
  color: ${colors.blackColor};
  font-size: 1.1em;
  line-height: 25px;
  margin-right: 20px;
`;

const UsernameContainer = styled.div`

`;

const UidContaienr = styled.div`

`;

const ToChatContainer = styled.div`
  ${sibling}
  width: auto;
  padding-top: 8px;
`;

class OwnerProfile extends React.Component {

  static propTypes = {
    model: PropTypes.shape({
      avatarSrc: PropTypes.string,
      username: PropTypes.string,
      uid: PropTypes.string,
    }).isRequired,
  };

  render() {
    const {
      avatarSrc,
      username,
      uid,
    } = this.props.model;

    return (
      <Container className="clear">
        <AvatarContainer >
          <Avatar src={avatarSrc} />
        </AvatarContainer>
        <InfoContainer >
          <UsernameContainer >分享人：{username}</UsernameContainer>
          <UidContaienr>ID：{uid}</UidContaienr>
        </InfoContainer>
        <ToChatContainer>
          <FormButton
            colorType="greenBorder"
            onClick={() => console.log('Add user to chat')}
            content="私訊"
            size="sm"
          />
        </ToChatContainer>
      </Container>
    );
  }
}

export default OwnerProfile;
