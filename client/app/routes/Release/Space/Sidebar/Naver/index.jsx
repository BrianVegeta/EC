import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import IconChecked from 'react-icons/lib/md/check-circle';
import CSS from 'react-css-modules';
import classnames from 'classnames/bind';
import styles from './styles.sass';

const cx = classnames.bind(styles);
class Naver extends React.Component {
  static propTypes = {
    nav: PropTypes.object.isRequired,
  };
  render() {
    const { nav } = this.props;
    const { isTouched, isValid, link, text } = nav;
    const renderedText = <div className={cx('text', { textActive: isTouched })}>{text}</div>;
    return (
      <div styleName="container">
        <div styleName="icon">
          {isValid && <IconChecked size={25} />}
        </div>
        {isTouched ?
          <Link to={link} className="link">{renderedText}</Link> :
          renderedText
        }
      </div>
    );
  }
}

export default CSS(Naver, styles);
