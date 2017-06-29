import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import IconArrow from 'react-icons/lib/md/keyboard-arrow-right';
import CSS from 'react-css-modules';
import styles from './styles.sass';
import myPropTypes from '../../../propTypes';

class SliderContainer extends React.Component {
  static defaultProps = {
    allLink: null,
    ready: false,
  };
  static propTypes = {
    title: PropTypes.node.isRequired,
    allLink: PropTypes.string,
    children: myPropTypes.children.isRequired,
    icon: PropTypes.func.isRequired,
    ready: PropTypes.bool,
  };
  render() {
    const { title, allLink, children, icon, ready } = this.props;
    if (!ready) return null;
    return (
      <div styleName="container">
        <div styleName="header" className="clear">
          <div styleName="head">
            <div styleName="icon">{icon({ size: 30 })}</div>
            <div styleName="title">{title}</div>
          </div>
          {allLink &&
            <div styleName="seeAll">
              <Link to={allLink} >
                <div styleName="linkContainer">
                  <div styleName="text">查看全部</div>
                  <IconArrow size={27} />
                </div>
              </Link>
            </div>
          }
        </div>
        <div>{children}</div>
      </div>
    );
  }
}
export default CSS(SliderContainer, styles);
