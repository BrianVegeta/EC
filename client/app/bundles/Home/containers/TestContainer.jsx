import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import Test from '../components/Test';

class TestContainer extends React.Component {
  render() {
    return (
      <div>
        <div>test page</div>
        <Test />
      </div>
    );
  }
}


const mapStateToProps = (state) => {
  const { environment } = state;
  return ({ environment });
};
export default connect(mapStateToProps)(TestContainer);
