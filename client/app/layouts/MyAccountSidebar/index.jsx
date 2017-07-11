import React from 'react';
import _ from 'lodash';
import { Link } from 'react-router';
import CSS from 'react-css-modules';
import styles from './styles.sass';
import myPropTypes from '../../propTypes';
import Avatar from '../../components/Avatar';
import myAccountNavs from '../../constants/myAccountNavs';

const tempUserAvatar = 'https://sharetestbuckets.s3.amazonaws.com/SACAY0OT_profile.jpg';
class MyAccountSidebar extends React.Component {
  static propTypes = {
    children: myPropTypes.children.isRequired,
  };
  render() {
    const navs = _.map(myAccountNavs, nav => nav);
    // TODO: USER AVATAR
    return (
      <div styleName="container" className="clear">
        <div styleName="sidebar">
          <div styleName="profile">
            <div styleName="avatar">
              <Avatar width={100} src={tempUserAvatar} />
            </div>
            <div styleName="username">User name</div>
          </div>
          <ul styleName="navsList" className="default-ul">
            {navs.map((nav, index) =>
              <li key={`${index + 1}`} styleName="listItem">
                <Link to={nav.path} styleName="itemLink">
                  {nav.text}
                </Link>
              </li>,
            )}
          </ul>
        </div>
        <div styleName="contentWrapper">{this.props.children}</div>
      </div>
    );
  }
}

export default CSS(MyAccountSidebar, styles);
