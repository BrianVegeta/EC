import React from 'react';
import { browserHistory } from 'react-router';
import CSS from 'react-css-modules';
import { connect } from 'react-redux';
import Modal from '../../components/Modal';
import FormBody from './FormBody';
import styles from './styles.sass';

class DiscountContainer extends React.Component {
  static goBack() {
    browserHistory.goBack();
  }

  constructor(props) {
    super(props);
    this.closeModal = this.closeModal.bind(this);
  }

  closeModal() {
    this.modal.closeModal();
  }

  render() {
    return (
      <div>
        <Modal onClose={this.constructor.goBack} ref={m => (this.modal = m)}>
          <div styleName="header">
            新增折扣
            <button className="button" styleName="close" onClick={this.closeModal}>
              <span className="fa fa-times" />
            </button>
          </div>
          <div styleName="body">
            <FormBody />
          </div>
          <div styleName="footer" className="clear">
            <button className="button" styleName="saveBtn" >
             儲存
           </button>
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
