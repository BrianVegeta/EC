import React from 'react';
import { browserHistory } from 'react-router';
import CSS from 'react-css-modules';
import { connect } from 'react-redux';
import { Modal } from 'react-bootstrap';
import styles from './styles.sass';
import FormBody from './FormBody';

class DiscountContainer extends React.Component {

  constructor(props) {
    super(props);
    this.closeModal = this.closeModal.bind(this);
    this.state = {
      isModalOpen: true,
    };
  }

  closeModal() {
    browserHistory.goBack();
    this.setState({ isModalOpen: false });
  }

  render() {
    return (
      <div>
        <Modal
          show={this.state.isModalOpen}
          onHide={this.closeModal}
          closeButton
        >
          <Modal.Header className={styles.header}>
            <button className="button" styleName="close" onClick={this.closeModal}>
              <span className="fa fa-times" />
            </button>
            <Modal.Title>新增折扣</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <FormBody />
          </Modal.Body>
          <Modal.Footer>
            <button
              className="button"
              styleName="saveBtn"
            >
             儲存
           </button>
          </Modal.Footer>
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
