import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import PropTypes from 'prop-types';
import myPropTypes from 'propTypes';
import styled from 'styled-components';
import IconFlag from 'react-icons/lib/fa/flag';
import Sidebar from './Sidebar';
import Main from './Main';
import PriceHeader from './PriceHeader';
import OrderBoard from './OrderBoard';
import InteractiveBoard from './InteractiveBoard';
import Model from './Model';

const Container = styled.div`
  position: relative;
`;
const SidebarContainer = styled.div`
  width: 368px;
  float: right;
  margin-left: auto;
  margin-right: 0;
`;
const MainContainer = styled.div`
  position: relative;
  width: 612px;
`;
const ReportLink = styled.div`
  text-align: center;
  margin-top: 20px;
  & > a {
    color: #666;
  }
  & > a > span {
    vertical-align: middle;
    font-size: 16px;
  }
`;


class ItemContainer extends React.Component {
  static propTypes = {
    item: myPropTypes.item.isRequired,
    auth: myPropTypes.authOnHeader.isRequired,
    dispatch: PropTypes.func.isRequired,
  };
  render() {
    const { item, dispatch, auth } = this.props;
    const model = new Model(item, dispatch, auth.currentUser);
    if (!model.exist) return null;
    return (
      <Container className="clear">
        <SidebarContainer>
          <Sidebar header={<PriceHeader />}>
            <OrderBoard model={model.orderBoard} />
            <InteractiveBoard />
            <ReportLink >
              <Link to="/" >
                <IconFlag size={18} />
                <span>檢舉此物品</span>
              </Link>
            </ReportLink>
          </Sidebar>
        </SidebarContainer>
        <MainContainer >
          <Main {...this.props} />
        </MainContainer>
      </Container>
    );
  }
}

const mapStateToProps = (state) => {
  const { environment, routesHelper, item, auth } = state;
  return ({ environment, routesHelper, item, auth });
};
export default connect(mapStateToProps)(ItemContainer);
