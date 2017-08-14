import React from 'react';
import PropTypes from 'prop-types';
import myPropTypes from 'propTypes';
import Sidebar from '../Sidebar';

class MyAccount extends React.Component {

  static defaultProps = {
    children: null,
  };

  static propTypes = {
    currentUser: PropTypes.shape({
      picture: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
    }).isRequired,
    children: myPropTypes.children,
  };

  render() {
    const { currentUser, children } = this.props;
    return (
      <div>
        <Sidebar user={currentUser} >
          <div>{children}</div>
        </Sidebar>
      </div>
    );
  }
}

export default MyAccount;
