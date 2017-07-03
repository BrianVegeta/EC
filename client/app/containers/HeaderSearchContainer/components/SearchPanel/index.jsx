import React from 'react';
import PropTypes from 'prop-types';
import CSS from 'react-css-modules';
import styles from './styles.sass';

const SearchPanel = props => (
  <div styleName="overlay" style={props.style}>
    <div styleName="scroller">{props.children}</div>
  </div>
);
SearchPanel.defaultProps = {
  style: null,
};
SearchPanel.propTypes = {
  children: PropTypes.node.isRequired,
  style: PropTypes.shape({
    left: PropTypes.number,
  }),
};
export default CSS(SearchPanel, styles);
