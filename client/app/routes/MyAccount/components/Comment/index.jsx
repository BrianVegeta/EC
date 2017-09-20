import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';

import { my } from 'lib/paths';

import classnames from 'classnames/bind';
import CSS from 'react-css-modules';
import AcccountNav from 'constants/myAccountNavs';
import ListContainer from 'components/ListContainer';
import PaginationContainer from 'components/PaginationContainer';
import CommentNote from 'components/CommentNote';
import Stars from 'components/Stars';

import styles from './styles.sass';
import Container from '../Container';

const cx = classnames.bind(styles);
const titleName = AcccountNav.comment.text;
class Navigation extends React.Component {

  static propTypes = {
    dispatchRecords: PropTypes.func.isRequired,
    dispatchReset: PropTypes.func.isRequired,
    myComment: PropTypes.shape({
      isFetching: PropTypes.bool,
    }).isRequired,
  };

  componentDidMount() {
    this.props.dispatchReset();
    this.props.dispatchRecords();
  }

  componentWillUnmount() {
    this.props.dispatchReset();
  }

  render() {
    const navs = [
      { name: '分享人評價', href: my.commentOwnerPath },
      { name: '享用人評價', href: my.commentLesseePath },
    ];

    const { myComment, dispatchRecords, isOwner, auth } = this.props;
    const { currentUser } = auth;
    const score = (isOwner) ? currentUser.owner_credit : currentUser.lessee_credit;

    const {
      isPaginable,
      isFetching,
      records,
    } = myComment;

    const hasNoData = !isPaginable && !isFetching && records.length === 0;

    return (
      <Container titleText={titleName}>
        <div styleName="container">
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
        <div>
          <div styleName="score-container">
            <div styleName="score">{score.toFixed(1)}</div>
            <div styleName="stars-container">
              <Stars score={score} activeColor="#FF9442" size={28} />
              <div styleName="comment-count" />
            </div>
          </div>
        </div>

        <ListContainer
          minHeight={500}
          noDataText={hasNoData ? '尚無任何評價' : null}
          isInitialFetching={isFetching && records.length === 0}
        >
          <PaginationContainer
            isPaginable={isPaginable}
            isFetching={isFetching}
            loadMore={dispatchRecords}
          >
            {records.map((record, index) => (
              <CommentNote
                key={`${index + 1}`}
                data={record}
              />
            ))}
          </PaginationContainer>
        </ListContainer>
      </Container>
    );
  }
}

export default CSS(Navigation, styles);
