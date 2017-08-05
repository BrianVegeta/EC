import React from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import ItemBoard from 'components/ItemBoard';

import Container from '../components/Container';


class CollectionsContainer extends React.Component {

  static propTypes = {
    myCollection: PropTypes.shape({
      collections: PropTypes.array.isRequired,
    }).isRequired,
  };

  render() {
    const { myCollection } = this.props;
    return (
      <Container titleText={'收藏'}>
        {myCollection.collections.map(item => (
          <div style={{ width: 246, display: 'inline-block' }}>
            <ItemBoard
              item={item}
            />
          </div>
        ))}
      </Container>
    );
  }
}

const mapStateToProps = (state) => {
  const { environment, myCollection } = state;
  return ({ environment, myCollection });
};
export default connect(mapStateToProps)(CollectionsContainer);
