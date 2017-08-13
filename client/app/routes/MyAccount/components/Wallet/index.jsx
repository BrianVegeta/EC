import React from 'react';
import PropTypes from 'prop-types';

import DatesPicker from 'components/inputs/DatesPicker';
import FormButton from 'components/FormButton';
import ListContainer from 'components/ListContainer';
import PaginationContainer from 'components/PaginationContainer';

import CSS from 'react-css-modules';

import { Link } from 'react-router';
import classnames from 'classnames/bind';

import styles from './styles.sass';
import Container from '../Container';

const cx = classnames.bind(styles);
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
  }

  componentDidMount() {

  }

  componentWillUnmount() {
    this.props.dispatchReset;
  }

  onDatesChange({ startDate, endDate }) {
    console.log(startDate, endDate);
    this.setState({ startDate, endDate });
  }

  render() {
    const navs = [
      { name: '所有交易', href: '' },
      { name: '入帳', href: '' },
      { name: '出帳', href: '' },
    ];
    console.log(this.state);

    const { myWallet, dispatchFetchRecords } = this.props;

    const {
      isPaginable,
      isFetching,
      records,
    } = myWallet;

    const hasNoData = !isPaginable && !isFetching && records.length === 0;
    console.log(this.state);
    return (
      <Container titleText={'我的錢包'}>
        <div styleName="wallet_banner_bkg" />
        <div styleName="wallet-balance-text-style">錢包餘額</div>
        <div styleName="wallet-balance-value-style">NTD $2,000</div>
        <div style={{ paddingTop: 40, display: 'inline-block' }}>
          <DatesPicker
            startDate={this.state.startDate}
            endDate={this.state.endDate}
            onDatesChange={this.onDatesChange}
          />
        </div>
        <div style={{ paddingLeft: 40, display: 'inline-block' }}>
          <FormButton
            size={'sm'}
            width={'100px'}
            onClick={() => {}}
            content={'搜尋'}
          />
        </div>
        <div styleName="wallet-nav-container">
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
              <div key={`${index + 1}`}>
                record
              </div>
            ))}
          </PaginationContainer>
        </ListContainer>
      </Container>
    );
  }
}
export default CSS(Wallet, styles);
