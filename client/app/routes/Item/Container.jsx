import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import PropTypes from 'prop-types';
import myPropTypes from 'propTypes';

import IconFlag from 'react-icons/lib/fa/flag';
import Sidebar from './Sidebar';
import Main from './Main';
import PriceHeader from './PriceHeader';
import OrderBoard from './OrderBoard';
import InteractiveBoard from './InteractiveBoard';
import Model from './Model';
import {
  Container,
  SidebarContainer,
  MainContainer,
  ReportLink,
} from './styles';


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
