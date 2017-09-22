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
      picture: PropTypes.string,
      name: PropTypes.string.isRequired,
    }).isRequired,
    children: myPropTypes.children,
    pathname: PropTypes.string.isRequired,
  };

  render() {
    const { currentUser, pathname, children } = this.props;
    return (
      <div>
        <Sidebar user={currentUser} pathname={pathname} >
          <div>{children}</div>
        </Sidebar>
      </div>
    );
  }
}

export default MyAccount;
