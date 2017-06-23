import React from 'react';
import PropTypes from 'prop-types';
import TitleIcon from 'react-icons/lib/md/add-circle';
import { connect } from 'react-redux';
import myAccountNavs from '../../../constants/myAccountNavs';
import myPropTypes from '../../../propTypes';
import Container from '../components/Container';
import ItemCard from '../components/ItemCard';
import ItemControlBar from '../components/ItemControlBar';
import ItemCardCreate from '../components/ItemCardCreate';
import ItemList from './Itemlist';
import Model from './Model';
import ModelItem from './ModelItem';

class Items extends React.Component {
  static propTypes = {
    mine: myPropTypes.mine.isRequired,
    dispatch: PropTypes.func.isRequired,
  };
  componentDidMount() {
    const { mine, dispatch } = this.props;
    new Model(mine, dispatch).fetchItems();
  }
  render() {
    const { text } = myAccountNavs.wishs;
    const { mine, dispatch } = this.props;
    const mineModel = new Model(mine, dispatch);
    return (
      <Container icon={TitleIcon} titleText={text}>
        <ItemControlBar
          tab={mineModel.tabCate}
          getIsActive={mineModel.getIsActive}
        />
        <ItemList>
          <ItemCardCreate path={mineModel.createPath} />
          {mineModel.items.map((item, index) =>
            <ItemCard
              key={`${index + 1}`}
              resource={new ModelItem(item, dispatch)}
            />,
          )}
        </ItemList>
      </Container>
    );
  }
}

const mapStateToProps = (state) => {
  const { environment, mine } = state;
  return ({ environment, mine });
};
export default connect(mapStateToProps)(Items);
