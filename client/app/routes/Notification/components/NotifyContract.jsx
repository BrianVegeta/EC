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
    dispatchReset: PropTypes.func.isRequired,
    dispatchMore: PropTypes.func.isRequired,
  };


  componentDidMount() {
    this.props.dispatchUnreadCount();
  }

  componentWillUnmount() {
    this.props.dispatchReset();
  }


  render() {
    // console.log(this.props);
    const { notify } = this.props;
    const { unreadCount, isFetching, isPaginable, records } = notify;
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
    return (
      <Container titleText="通知">
        <Navigation navs={navs} unreads={unreadCount} />
        <ListContainer
          minHeight={500}
          noDataText={(isFetching === false && records.length === 0) ? '尚無任何通知' : null}
          isInitialFetching={isFetching && records.length === 0}
        >
          <PaginationContainer
            isPaginable={isPaginable}
            isFetching={isFetching}
            loadMore={this.props.dispatchMore}
          >
            {records.map(record => (
              <NotifyContractBoard
                key={record.id}
                cid={record.cid}
                message={record.message}
                createTime={record.createTime}
                isRead={record.isRead}
              />
            ))}
          </PaginationContainer>
        </ListContainer>
      </Container>
    );
  }
}
export default NotifyContract;
