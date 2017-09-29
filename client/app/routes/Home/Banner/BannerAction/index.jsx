import React from 'react';
import { Link } from 'react-router';
import PropTypes from 'prop-types';
import myPropTypes from 'propTypes';
import { userprofilePaths, itemPath } from 'lib/paths';


const BANNER_ACTION_URL = 0;
const BANNER_ACTION_USER = 1;
const BANNER_ACTION_ITEM = 2;
class BannerAction extends React.Component {

  static propTypes = {
    item: PropTypes.shape({
      action: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      arg: PropTypes.oneOfType([
        PropTypes.string, PropTypes.number,
      ]).isRequired,
    }).isRequired,
    children: myPropTypes.children.isRequired,
  };

  render() {
    const {
      item: { action, arg, name },
      children,
    } = this.props;
    switch (action) {
      case BANNER_ACTION_URL: {
        const url = arg;
        return <a href={url} target="_blank">{children}</a>;
      }
      case BANNER_ACTION_USER: {
        const uid = arg;
        return (
          <Link to={userprofilePaths.indexPath(uid)} >
            {children}
          </Link>
        );
      }
      case BANNER_ACTION_ITEM: {
        const pid = arg;
        return (
          <Link to={itemPath(name, pid)}>
            {children}
          </Link>
        );
      }
      default:
        return <div>{children}</div>;
    }
  }
}

export default BannerAction;
