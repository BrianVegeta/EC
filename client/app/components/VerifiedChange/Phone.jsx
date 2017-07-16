import React from 'react';
import PropTypes from 'prop-types';
import FlowController from './FlowController';
import PanelPhoneInit from './Panel/PhoneInit';
import PanelPhoneEditing from './Panel/PhoneEditing';

class VerifiedChangePhone extends React.Component {

  static propTypes = {
    value: PropTypes.string.isRequired,
  };

  constructor(props) {
    super(props);
  }

  render() {
    const { value } = this.props;
    const { renderInit, renderEditing, renderVerifying } = this;
    return (
      <FlowController
        {...{
          value,
          onVerify: () => console.log('verify'),
          onSave: () => console.log('save'),
          renderInit(type, toEdit) {
            return <PanelPhoneInit {...{ type, toEdit }} />;
          },
          renderEditing(type, verify, cancel) {
            return <PanelPhoneEditing {...{ type, verify, cancel }} />;
          },
          renderVerifying(type, complete, resend, cancel) {
            return <div>test2</div>;
          },
        }}
      />
    );
  }
}

export default VerifiedChangePhone;
