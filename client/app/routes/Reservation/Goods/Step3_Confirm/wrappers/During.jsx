import React from 'react';
import PropTypes from 'prop-types';
import myPropTypes from 'propTypes';
import DateRangeIcon from 'react-icons/lib/md/date-range';
import styled from 'styled-components';
import colors from 'styles/colorExport.scss';

const sibling = `
  display: inline-block;
  float: left;
`;

const Container = styled.div`
`;

const IconContainer = styled.div`
  ${sibling}
  width: 50px;
  color: ${colors.blackColor};
  margin-right: 15px;
  text-align: center;
`;

const InfoContainer = styled.div`
  ${sibling}
  width: auto;
  color: ${colors.blackColor};
  font-size: 1.1em;
  line-height: 25px;
`;

const DateRange = styled.span`
  color: ${colors.primaryColor};
`;


class During extends React.Component {

  static propTypes = {
    dateRangeDesc: PropTypes.string.isRequired,
  };

  render() {
    return (
      <Container className="clear">
        <IconContainer >
          <DateRangeIcon size={25} />
        </IconContainer>
        <InfoContainer>
          <span>使用日期：</span>
          <DateRange>{this.props.dateRangeDesc}</DateRange>
        </InfoContainer>
      </Container>
    );
  }
}

export default During;
