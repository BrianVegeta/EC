import React from 'react';
import PropTypes from 'prop-types';
import IconDate from 'react-icons/lib/md/date-range';
import IconTime from 'react-icons/lib/md/access-time';
import IconBank from 'react-icons/lib/md/account-balance';
import IconPersonOutline from 'react-icons/lib/md/person-outline';
import styled from 'styled-components';

const Container = styled.div`
  color: #777;
  margin-bottom: 12px;
`;
const TextWrapper = styled.span`
  font-size: 15px;
  line-height: 15px;
  vertical-align: middle;
  margin-left: 2px;
  ${props => (props.underline && 'text-decoration: underline;')}
`;
class Detail extends React.Component {
  static propTypes = {
    content: PropTypes.string.isRequired,
    icon: PropTypes.oneOf(['date', 'time', 'bank', 'person']).isRequired,
  };
  renderIcon() {
    const size = 20;
    switch (this.props.icon) {
      case 'time':
        return <IconTime size={size} />;
      case 'bank':
        return <IconBank size={size} />;
      case 'person':
        return <IconPersonOutline size={size} />;
      default:
        return <IconDate size={size} />;

    }
  }
  render() {
    return (
      <Container>
        {this.renderIcon()}
        <TextWrapper underline={this.props.icon === 'bank'}>
          {this.props.content}
        </TextWrapper>
      </Container>
    );
  }
}

export default Detail;
