import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames/bind';
import IconPrev from 'react-icons/lib/fa/angle-left';
import CSS from 'react-css-modules';
import styles from './styles.sass';

const cx = classnames.bind(styles);
const Collection = props => (
  <div styleName="container">
    <div styleName="header">
      {props.isPaginating &&
        <span styleName="prev">
          <button
            className="button"
            onClick={props.seeAll}
          >
            <IconPrev size={30} />
          </button>
        </span>
      }
      {props.headerText}
      {!props.isPaginating &&
        <button
          className={`button ${cx('all')}`}
          onClick={props.seeAll}
        >
          看全部&nbsp;&gt;
        </button>
      }
    </div>
    <div styleName="body">{props.children}</div>
  </div>
);
Collection.defaultProps = {
  isPaginating: false,
};
Collection.propTypes = {
  headerText: PropTypes.string.isRequired,
  seeAll: PropTypes.func.isRequired,
  isPaginating: PropTypes.bool,
  prev: PropTypes.func.isRequired,
  children: PropTypes.arrayOf(
    PropTypes.node,
  ).isRequired,
};
export default CSS(Collection, styles);
