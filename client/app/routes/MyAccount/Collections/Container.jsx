import React from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';

class CollectionsContainer extends React.Component {
  render() {
    return (
      <div>collections</div>
    );
  }
}

const mapStateToProps = (state) => {
  const { environment } = state;
  return ({ environment });
};
export default connect(mapStateToProps)(CollectionsContainer);
