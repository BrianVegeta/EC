import React from 'react';
import PropTypes from 'prop-types';
import { notifyPath } from 'lib/paths';
import ListContainer from 'components/ListContainer';
import PaginationContainer from 'components/PaginationContainer';

import Navigation from './Navigation';
import Container from './Container';
import NotifyContractBoard from './NotifyContractBoard';

class NotifyContract extends React.Component {
  static propTypes = {
    // dispatch: PropTypes.func.isRequired,
    dispatchUnreadCount: PropTypes.func.isRequired,
  };


  componentDidMount() {
    this.props.dispatchUnreadCount();
  }


  render() {
    const { notify } = this.props;
    const { unreadCount, isFetching, records } = notify;
    if (isFetching === true) {
      return null;
    }
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
    console.log(this.props);
    return (
      <Container titleText={'訂單更新'}>
        <Navigation navs={navs} unreads={unreadCount} />
        <ListContainer
          minHeight={500}
          noDataText={(isFetching === false && records.length === 0) ? '尚無任何評價' : null}
          isInitialFetching={isFetching && records.length === 0}
        >
          <PaginationContainer
            isPaginable
            isFetching={isFetching}
            loadMore={() => { console.log('yes'); }}
          >
            {records.map((record, index) => (
              <NotifyContractBoard
                key={`${index + 1}`}
                id={record.id}
                message={record.message}
                createTime={record.createTime}
                isRead
              />
            ))}
          </PaginationContainer>
        </ListContainer>
      </Container>
    );
  }
}
export default NotifyContract;
