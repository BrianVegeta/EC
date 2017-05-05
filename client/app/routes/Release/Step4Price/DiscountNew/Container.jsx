import React from 'react';
import CSS from 'react-css-modules';
import { connect } from 'react-redux';
import { Modal } from 'react-overlays';
import styles from './styles.sass';

const modalStyle = {
  position: 'fixed',
  zIndex: 1040,
  top: 0,
  bottom: 0,
  left: 0,
  right: 0,
};
const backdropStyle = {
  ...modalStyle,
  zIndex: 'auto',
  backgroundColor: '#000',
  opacity: 0.5,
};
const rand = () => (Math.floor(Math.random() * 20) - 10);
const dialogStyle = () => {
  // we use some psuedo random coords so nested modals
  // don't sit right on top of each other.
  const top = 50 + rand();
  const left = 50 + rand();

  return {
    position: 'absolute',
    width: 400,
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
    border: '1px solid #e5e5e5',
    backgroundColor: 'white',
    boxShadow: '0 5px 15px rgba(0,0,0,.5)',
    padding: 20,
  };
};

class DiscountContainer extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <Modal
          aria-labelledby="modal-label"
          style={modalStyle}
          backdropStyle={backdropStyle}
          show
        >
          <div style={dialogStyle()} >
            <p>Duis mollis, est non commodo luctus, nisi erat porttitor ligula.</p>
          </div>
        </Modal>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const { environment, routesHelper } = state;
  return ({ environment, routesHelper });
};
export default connect(mapStateToProps)(CSS(DiscountContainer, styles));
