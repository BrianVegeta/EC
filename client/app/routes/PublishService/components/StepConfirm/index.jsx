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
class StepConfirm extends React.Component {

  render() {
    return (
      <FormContainer title="確認發佈" >
        <div >about</div>
      </FormContainer>
    );
  }
}

export default CSS(StepConfirm, styles);
