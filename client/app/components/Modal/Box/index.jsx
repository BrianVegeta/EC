import React from 'react';
import PropTypes from 'prop-types';
import myPropTypes from 'propTypes';
import ReactModal from 'react-modal';

import styled from 'styled-components';
import classnames from 'classnames/bind';
import styles from './styles.sass';

const ContentContainer = styled.div`
  width: ${props => props.width}px;
  z-index: 1;
  background-color: #fcfcfc;
  position: relative;
  box-shadow: 0 0 20px #333;
  margin: 80px auto;
  overflow: hidden;
  border-radius: 6px;
`;

const cx = classnames.bind(styles);
class Modal extends React.Component {

  static defaultProps = {
    width: 600,
  };

  static propTypes = {
    width: myPropTypes.width,
    onClose: PropTypes.func.isRequired,
    children: myPropTypes.children.isRequired,
  };

  constructor(props) {
    super(props);
    this.handleClickOutside = this.handleClickOutside.bind(this);
  }

  componentDidMount() {
    console.log('componentDidMount2');
    document.addEventListener('click', this.handleClickOutside, false);
  }

  componentWillUnmount() {
    console.log('componentWillUnmount2');
    document.removeEventListener('click', this.handleClickOutside, false);
  }

  handleClickOutside(e) {
    if (this.contentBox.contains(e.target)) {
      return;
    }

    this.props.onClose();
  }

  render() {
    const { children, width, onClose } = this.props;
    return (
      <ReactModal
        isOpen
        contentLabel="POPUP BOX"
        onRequestClose={onClose}
        className={cx('modal')}
        overlayClassName={cx('overlay')}
      >
        <ContentContainer
          width={width}
        >
          <div ref={contentBox => (this.contentBox = contentBox)}>
            {children}
          </div>
        </ContentContainer>
      </ReactModal>
    );
  }
}

export default Modal;
