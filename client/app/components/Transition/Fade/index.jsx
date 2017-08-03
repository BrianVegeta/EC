import React from 'react';
import myPropTypes from 'propTypes';
import CSSTransition from 'react-transition-group/CSSTransition';
import classnames from 'classnames/bind';
import styles from './styles.sass';

const cx = classnames.bind(styles);
class TransitionFade extends React.Component {

  static propTypes = {
    children: myPropTypes.children.isRequired,
  };

  render() {
    return (
      <CSSTransition
        in
        appear
        timeout={500}
        classNames={{
          appear: cx('appear'),
          appearActive: cx('active'),
        }}
      >
        {this.props.children}
      </CSSTransition>
    );
  }
}

export default TransitionFade;
