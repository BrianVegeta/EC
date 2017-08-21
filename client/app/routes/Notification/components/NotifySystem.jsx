import React from 'react';
// import PropTypes from 'prop-types';
import { notifyPath } from 'lib/paths';
import ListContainer from 'components/ListContainer';

import Navigation from './Navigation';
import Container from './Container';

class SystemActivity extends React.Component {

  render() {
    const navs = [
      { name: '訂單更新',
        href: notifyPath.contractNotifyPath,
        tabName: 'CONTRACT' },
      { name: '活動通知',
        href: notifyPath.activityNotifyPath,
        tabName: 'ACTIVITY' },
      { name: '系統通知',
        href: notifyPath.systemNotifyPath,
        tabName: 'SYSTEM' },
    ];
    const unreads = [];
    unreads["CONTRACT"] = 0;
    unreads["ACTIVITY"] = 2;
    unreads["SYSTEM"] = 0;
    const records = [];
    return (
      <Container titleText={'訂單更新'}>
        <Navigation navs={navs} unreads={unreads} />
      </Container>
    );
  }
}
export default SystemActivity;
