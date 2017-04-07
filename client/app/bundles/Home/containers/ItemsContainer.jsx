import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
// import Items from '../components/Items';
import ItemsList from '../components/Items/ItemsList';
import Spinner from '../components/Spinner';

class ItemsContainer extends React.Component {
  render() {
    console.log('items container');
    const { items, main } = this.props;
    return (
      <div style={{ minHeight: 1500 }}>
        {
          items.fetchingState === 'fetching' ?
            <Spinner height={500} /> :
            (this.props.main || <ItemsList {...this.props} />)
        }
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const {
    environment,
    items,
  } = state;

  return ({
    environment,
    items,
  });
};
export default connect(mapStateToProps)(ItemsContainer);
