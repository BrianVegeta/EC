//@ author: vincnet
import React from 'react';
import { Link } from 'react-router';
import PropTypes from 'prop-types';
import myPropTypes from 'propTypes';

import IconFlag from 'react-icons/lib/fa/flag';

import Sidebar from '../Sidebar';
import Main from '../Main';
import PriceHeader from '../PriceHeader';
import OrderBoard from '../OrderBoard';
import InteractiveBoard from '../InteractiveBoard';
import Model from '../Model';
import {
  Container,
  SidebarContainer,
  MainContainer,
  ReportLink,
} from './styles';


class Item extends React.Component {
  static propTypes = {
    item: myPropTypes.item.isRequired,
    auth: myPropTypes.authOnHeader.isRequired,
    dispatch: PropTypes.func.isRequired,
  };
  render() {
    const { item, dispatch, auth } = this.props;
    console.log('item');
    console.log(item);
    console.log('author');
    console.log(auth);
    const model = new Model(item, dispatch, auth.currentUser);
    if (!model.exist) return null;
    return (
      <Container className="clear">
        <SidebarContainer>
          <Sidebar header={<PriceHeader price={item.price} />}>
            <OrderBoard model={model.orderBoard} />
            <InteractiveBoard favorite={item.favorite_count} />
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

export default Item;
