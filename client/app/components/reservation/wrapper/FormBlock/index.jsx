import React from 'react';
import PropTypes from 'prop-types';
import myPropTypes from 'propTypes';
import styled from 'styled-components';
import colors from 'styles/colorExport.scss';

const Container = styled.div`
  padding: 40px 0;
  ${props => props.hasBottomLine &&
    `border-bottom: 1px solid ${colors.lineColor};`}
`;

const Title = styled.div`
  font-size: 24px;
  line-height: 30px;
  font-weight: 500;
  color: ${colors.blackColor};
`;

const Tip = styled.div`
  color: ${colors.middleBlack};
  font-size: 14px;
  line-height: 18px;
`;

const InnerContainer = styled.div`
  ${props => props.paddingTop && 'padding-top: 40px;'}
`;

class FormBlock extends React.Component {

  static defaultProps = {
    title: null,
    hasMargin: true,
    hasBottomLine: true,
    tip: null,
  };

  static propTypes = {
    children: myPropTypes.children.isRequired,
    title: PropTypes.string,
    hasMargin: PropTypes.bool,
    hasBottomLine: PropTypes.bool,
    tip: PropTypes.string,
  };

  render() {
    const { title, tip, children, hasMargin, hasBottomLine } = this.props;

    return (
      <Container hasBottomLine={hasBottomLine}>
        {title && <Title>{title}</Title>}
        {tip && <Tip>{tip}</Tip>}
        <InnerContainer
          paddingTop={hasMargin && title}
        >
          {children}
        </InnerContainer>
      </Container>
    );
  }
}

export default FormBlock;
