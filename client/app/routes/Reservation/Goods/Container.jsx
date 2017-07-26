import React from 'react';
import PropTypes from 'prop-types';
import myPropTypes from 'propTypes';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import styled from 'styled-components';

import { checkBankaccReady, unzipBankInfo } from 'actions/module/bankaccActions';
import { isStateInitial as isItemInitial } from 'reducers/itemReducer';

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
    item: myPropTypes.item.isRequired,
    dispatch: PropTypes.func.isRequired,
  };

  componentDidMount() {
    this.props.dispatch(checkBankaccReady({
      success: data => console.log(data),
      error: () => console.log('error'),
    }));
  }

  render() {
    const { item } = this.props;
    if (isItemInitial(item)) {
      return null;
    }

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
  const { environment, item } = state;
  return ({ environment, item });
};
export default connect(mapStateToProps)(withRouter(ReservationGoods));
