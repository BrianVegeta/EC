import React from 'react';
import PropTypes from 'prop-types';

import FormButton from 'components/FormButton';
import CSS from 'react-css-modules';
import styles from './styles.sass';

class TwoButtons extends React.Component {
  static defaultProps = {
    leftBtnContent: '取消',
    rightBtnContent: '確定',
  }
  static propTypes = {
    title: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    leftBtnContent: PropTypes.string,
    onLeftClick: PropTypes.func.isRequired,
    rightBtnContent: PropTypes.string,
    onRightClick: PropTypes.func.isRequired,
    onClose: PropTypes.func.isRequired,
  }

  onRight() {
    const { onLeftClick, onClose } = this.props;
    if (onLeftClick) {
      this.props.onLeftClick();
    }
    onClose();
  }

  onLeft() {
    const { onRightClick, onClose } = this.props;
    if (onRightClick) {
      this.props.onRightClick();
    }
    onClose();
  }

  render() {
    const { title, content, leftBtnContent,
      rightBtnContent, onClose, onRightClick, onLeftClick } = this.props;
    return (
      <div className="clear" styleName="container">
        <div styleName="title">{title}</div>
        <div styleName="content">{content}</div>
        <div className="clear" styleName="action-content">
          <div styleName="left-button">
            <FormButton
              colorType={'greenBorder'}
              content={leftBtnContent}
              onClick={() => {
                onLeftClick();
                onClose();
              }}
            />
          </div>
          <div styleName="right-button">
            <FormButton
              colorType={'green'}
              content={rightBtnContent}
              onClick={() => {
                onRightClick();
                onClose();
              }}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default CSS(TwoButtons, styles);
