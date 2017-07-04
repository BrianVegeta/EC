import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import styled from 'styled-components';

const Container = styled.div`
  position: relative;
`;
const MainContainer = styled.div`
  margin-left: 253px;
  width: 612px;
`;
const SidebarContainer = styled.div`
  height: 100%;
  width: 205px;
  position: fixed;
  top: 0;
  z-index: 1000;
`;
class ReservationGoods extends React.PureComponent {
  static propTypes = {
    formComponent: PropTypes.node.isRequired,
  };
  render() {
    return (
      <Container className="clear">
        <MainContainer>{this.props.formComponent}</MainContainer>
        <SidebarContainer >
          sidebar
        </SidebarContainer>
      </Container>
    );
  }
}

const mapStateToProps = (state) => {
  const { environment } = state;
  return ({ environment });
};
export default connect(mapStateToProps)(withRouter(ReservationGoods));
