import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { IndexLink, Link } from 'react-router';

class HomeContainer extends React.Component {
  render() {
    return (
      <div>
        home page test
        <Link to="/test2" >link to test2</Link>
      </div>
    );
  }
}


const mapStateToProps = (state) => {
  const { enviroment } = state;
  return ({ enviroment });
};
export default connect(mapStateToProps)(HomeContainer);
