import React from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';

import Container from '../components/Container';
import ItemBoard from 'components/ItemBoard';

class CollectionsContainer extends React.Component {

  render() {
      console.log(this.props);

      const { myCollection} = this.props;
      return (
            <Container titleText={'收藏'}>
              {myCollection.collections.map(item =>
              <div style={{ width: 246, display: 'inline-block' }}>
                  <ItemBoard
                      item={item}
                  />
              </div>,
             )}
            </Container>
      );
  }
}

const mapStateToProps = (state) => {
  const { environment, myCollection } = state;
  return ({ environment, myCollection });
};
export default connect(mapStateToProps)(CollectionsContainer);