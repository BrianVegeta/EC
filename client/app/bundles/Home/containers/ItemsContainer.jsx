import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

const propTypes = {
  dispatch: PropTypes.func.isRequired,
};

class ItemsContainer extends React.Component {
  render() {
    return <div>items</div>;
  }
}

ItemsContainer.propTypes = propTypes;


const mapStateToProps = (state) => {
  const { environment } = state;
  return ({
    environment,
  });
};
export default connect(mapStateToProps)(ItemsContainer);
