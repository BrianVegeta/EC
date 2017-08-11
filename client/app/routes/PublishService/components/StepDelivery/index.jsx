import React from 'react';

// import myPropTypes from 'propTypes';
import FormContainer from 'components/Publish/FormContainer';
// import ButtonNextStep, {
//   STATUS_DISABLE,
//   STATUS_LOADING,
//   STATUS_VALID,
// } from 'components/Button/NextStep';

// import classnames from 'classnames/bind';
import CSS from 'react-css-modules';
import styles from './styles.sass';

// const cx = classnames.bind(styles);
class StepDelivery extends React.Component {

  render() {
    return (
      <FormContainer title="寄件資訊" >
        <div >about</div>
      </FormContainer>
    );
  }
}

export default CSS(StepDelivery, styles);
