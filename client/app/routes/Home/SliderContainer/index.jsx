import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import IconArrow from 'react-icons/lib/md/keyboard-arrow-right';
import CSS from 'react-css-modules';
import styles from './styles.sass';
import myPropTypes from '../../../propTypes';

class SliderContainer extends React.Component {
  static propTypes = {
    title: PropTypes.node.isRequired,
    allLink: PropTypes.string.isRequired,
    children: myPropTypes.children.isRequired,
    icon: PropTypes.func.isRequired,
  };
  render() {
    const { title, allLink, children, icon } = this.props;
    return (
      <div styleName="container">
        <div styleName="header" className="clear">
          <div styleName="head">
            <div styleName="icon">{icon({ size: 30 })}</div>
            <div styleName="title">{title}</div>
          </div>
          <div styleName="seeAll">
            <Link to={allLink} >
              <div styleName="linkContainer">
                <div styleName="text">查看全部</div>
                <IconArrow size={27} />
              </div>
            </Link>
          </div>
        </div>
        <div>{children}</div>
      </div>
    );
  }
}
export default CSS(SliderContainer, styles);
