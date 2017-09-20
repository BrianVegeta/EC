import React from 'react';
import PropTypes from 'prop-types';

import AcccountNav from 'constants/myAccountNavs';
import FormButton from 'components/FormButton';
import ListContainer from 'components/ListContainer';
import PaginationContainer from 'components/PaginationContainer';
import WalletNote from 'components/WalletNote';
import DatesPicker from 'components/Input/DatesPicker';

import CSS from 'react-css-modules';

import { my } from 'lib/paths';
import { Link } from 'react-router';
import classnames from 'classnames/bind';

import styles from './styles.sass';
import Container from '../Container';

const cx = classnames.bind(styles);
const titleName = AcccountNav.wallet.text;
class Wallet extends React.Component {
  static propTypes = {
    myWallet: PropTypes.shape({
      records: PropTypes.array.isRequired,
    }).isRequired,
    dispatchFetchRecords: PropTypes.func.isRequired,
    dispatchReset: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      startDate: null,
      endDate: null,
    };
    this.onDatesChange = this.onDatesChange.bind(this);
    this.onSearch = this.onSearch.bind(this);
  }

  componentDidMount() {
    // this.props.dispatchFetchRecords();
  }

  componentWillUnmount() {
    this.props.dispatchReset();
  }

  onSearch() {
    if (this.state.startDate === null || this.state.endDate === null) {
      return;
    }
    this.props.dispatchReset();
    this.props.dispatchFetchRecords(this.state.startDate.valueOf(),
     this.state.endDate.valueOf());
  }
  onDatesChange({ startDate, endDate }) {
    this.setState({ startDate, endDate });
  }

  render() {
    const navs = [
      { name: '所有交易', href: my.walletPath },
      { name: '入帳', href: my.walletPathIn },
      { name: '出帳', href: my.walletPathOut },
    ];
    const { myWallet, dispatchFetchRecords } = this.props;
    const {
      isPaginable,
      isFetching,
      records,
    } = myWallet;

    const hasNoData = !isPaginable && !isFetching && records.length === 0;
    return (
      <Container titleText={titleName}>
        <div styleName="banner">
          <div styleName="background" />
          <div styleName="content" >
            <div styleName="title">啟用銀行託管，好方便！</div>
            <div>直接支付，讓消費更簡單</div>
            <div styleName="detail">
              <a>查看詳情 &gt;&gt;</a>
            </div>
          </div>
        </div>
        <div styleName="balance-text-style">錢包餘額</div>
        <div styleName="balance-value-style">NTD $0.00</div>
        <div style={{ paddingTop: 40, display: 'inline-block' }}>
          <DatesPicker
            startDate={this.state.startDate}
            endDate={this.state.endDate}
            onDatesChange={this.onDatesChange}
            isOutsideRange={() => false}
            showHint={false}
          />
        </div>
        <div style={{ paddingLeft: 40, display: 'inline-block' }}>
          <FormButton
            size={'sm'}
            width={'100px'}
            onClick={this.onSearch}
            content={'搜尋'}
          />
        </div>
        <div styleName="nav-container">
          <ul className="clear">
            {navs.map((nav, index) => (
              <Link
                key={`${index + 1}`}
                to={nav.href}
                activeClassName={cx('active')}
                onlyActiveOnIndex
              >
                <li>{nav.name}</li>
              </Link>
            ))}
          </ul>
        </div>
        <ListContainer
          minHeight={500}
          noDataText={hasNoData ? '尚無任何交易' : null}
          isInitialFetching={isFetching && records.length === 0}
        >
          <PaginationContainer
            isPaginable={isPaginable}
            isFetching={isFetching}
            loadMore={dispatchFetchRecords}
          >
            {records.map((record, index) => (
              <WalletNote
                key={`${index + 1}`}
                transactionDate={record.transaction_time}
                transactionPrice={record.price}
                cidNo={record.args_no}
                remark={record.remark}
              />
            ))}
          </PaginationContainer>
        </ListContainer>
      </Container>
    );
  }
}
export default CSS(Wallet, styles);
