import React from 'react';
import PropTypes from 'prop-types';
import myPropTypes from 'propTypes';
import IconClear from 'react-icons/lib/md/clear';
import IconArrowDown from 'components/Icons/ArrowDown';
import classnames from 'classnames/bind';
import CSS from 'react-css-modules';
import { primaryColor } from 'styles/colorExport.scss';
import styles from './styles.sass';


const cx = classnames.bind(styles);
class FilterButton extends React.Component {

  static defaultProps = {
    isOpen: false,
    onClickClear: null,
  };

  static propTypes = {
    children: myPropTypes.children.isRequired,
    content: PropTypes.string.isRequired,
    isOpen: PropTypes.bool,
    onClick: PropTypes.func.isRequired,
    onClickClear: PropTypes.func,
  };

  render() {
    const {
      children,
      content,
      isOpen,
      onClick,
      onClickClear,
    } = this.props;

    return (
      <div styleName="container">
        {
          onClickClear &&
            <button
              className="button"
              styleName="close-button"
              onClick={onClickClear}
            >
              <IconClear size={18} />
            </button>
        }
        <button
          className={`button ${cx('button', { opening: isOpen })}`}
          onClick={onClick}
        >
          <div styleName="inner-content">{content}</div>
          <IconArrowDown
            viewBox="-2 -6 20 20"
            size={16}
            color={primaryColor}
          />
        </button>
        {isOpen && <div styleName="dropdown">{children}</div>}
      </div>
    );
  }
}

export default CSS(FilterButton, styles);
