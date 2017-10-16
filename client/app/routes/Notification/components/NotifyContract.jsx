import React from 'react';
import PropTypes from 'prop-types';
import notifyNavs from 'constants/notifyNavs';
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
    notify: PropTypes.shape({
      isFetching: PropTypes.bool,
    }).isRequired,
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
    return (
      <Container titleText="通知">
        <Navigation navs={notifyNavs.navs} unreads={unreadCount} />
        <ListContainer
          minHeight={500}
          noDataText={(isFetching === false && records.length === 0) ? '尚無任何訂單通知' : null}
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
                itemImage={record.itemImage}
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
