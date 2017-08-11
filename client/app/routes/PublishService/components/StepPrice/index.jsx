import React from 'react';
// import PropTypes from 'prop-types';

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
class StepPrice extends React.Component {

  render() {
    return (
      <FormContainer title="設定價格" >
        <div >about</div>
      </FormContainer>
    );
  }
}

export default CSS(StepPrice, styles);
