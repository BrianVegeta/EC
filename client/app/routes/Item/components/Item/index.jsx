import React from 'react';
import PropTypes from 'prop-types';
import myPropTypes from 'propTypes';

import CSS from 'react-css-modules';
import styles from './styles.sass';
import Main from '../Main';
import SidebarContainer from '../../containers/SidebarContainer';


class Item extends React.Component {
  static propTypes = {
    item: myPropTypes.item.isRequired,
    dispatchFetchItem: PropTypes.func.isRequired,
    dispatchResetMessage: PropTypes.func.isRequired,
    dispatchReset: PropTypes.func.isRequired,
    dispatchRecords: PropTypes.func.isRequired,
  };

  componentDidMount() {
    // console.log('did MOUNT');
    this.props.dispatchFetchItem();
    this.props.dispatchResetMessage();
    this.props.dispatchRecords();
  }

  shouldComponentUpdate(nextProps) {
    if (nextProps.item.isFetching) {
      return false;
    } else if (nextProps.messageboard.isFetching === true) {
      return false;
    }
    return true;
  }

  componentWillUnmount() {
    this.props.dispatchReset();
  }

  render() {
    const { item } = this.props;
    if (!item.isFetched) return null;
    return (
      <div styleName="container" className="clear">
        <div styleName="sidebar-container">
          <SidebarContainer />
        </div>
        <div styleName="main-container" >
          <Main {...this.props} />
        </div>
      </div>
    );
  }
}

export default CSS(Item, styles);
