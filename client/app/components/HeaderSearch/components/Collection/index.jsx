import React from 'react';
import PropTypes from 'prop-types';
import IconPrev from 'react-icons/lib/fa/angle-left';
import IconNext from 'react-icons/lib/md/keyboard-arrow-right';
import CSS from 'react-css-modules';
import styles from './styles.sass';

const Collection = props => (
  <div styleName="container">
    <div styleName="header">
      {props.isPaginating &&
        <span styleName="prev">
          <button className="button" onClick={props.prev}>
            <IconPrev size={30} />
          </button>
        </span>
      }
      {props.headerText}
      {!props.isPaginating &&
        <span styleName="all">
          <button className="button" onClick={props.seeAll} >
            看全部
            <IconNext size={20} />
          </button>
        </span>
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
