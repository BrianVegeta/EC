import React from 'react';
import PropTypes from 'prop-types';
import IconPrev from 'react-icons/lib/fa/angle-left';
import IconNext from 'react-icons/lib/md/keyboard-arrow-right';
import CSS from 'react-css-modules';
import styles from './styles.sass';


class Collection extends React.Component {

  static defaultProps = {
    isPaginating: false,
  };

  static propTypes = {
    headerText: PropTypes.string.isRequired,
    seeAll: PropTypes.func.isRequired,
    isPaginating: PropTypes.bool,
    prev: PropTypes.func.isRequired,
    children: PropTypes.arrayOf(
      PropTypes.node,
    ).isRequired,
  };

  render() {
    return (
      <div styleName="container">
        <div styleName="header">
          {this.props.isPaginating &&
            <span styleName="prev">
              <button className="button" onClick={this.props.prev}>
                <IconPrev size={30} />
              </button>
            </span>
          }
          {this.props.headerText}
          {!this.props.isPaginating &&
            <span styleName="all">
              <button
                className="button"
                onClick={this.props.seeAll}
              >
                看全部<IconNext size={20} />
              </button>
            </span>
          }
        </div>
        <div styleName="body">{this.props.children}</div>
      </div>
    );
  }
}

export default CSS(Collection, styles);
