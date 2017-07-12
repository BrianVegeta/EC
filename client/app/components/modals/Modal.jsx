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

  render() {
    return (
      <ReactModal
        isOpen
        contentLabel="onRequestClose Example"
        onRequestClose={this.props.onClose}
        className={cx('modal')}
        overlayClassName={cx('overlay')}
      >
        <ContentContainer width={this.props.width}>
          {this.props.children}
        </ContentContainer>
      </ReactModal>
    );
  }
}

export default Modal;
