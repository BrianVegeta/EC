/* eslint-disable class-methods-use-this */
import React from 'react';
import PropTypes from 'prop-types';

export default class extends React.Component {

  static propTypes = {
    isOpening: PropTypes.bool.isRequired,
    onApplyChange: PropTypes.func.isRequired,
    openFilter: PropTypes.func.isRequired,
    closeFilter: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
    this.onCancel = this.onCancel.bind(this);
    this.onApply = this.onApply.bind(this);
    this.onClear = this.onClear.bind(this);
    this.onButtonToggle = this.onButtonToggle.bind(this);
  }

  onButtonToggle() {
    const {
      isOpening,
      openFilter,
      closeFilter,
    } = this.props;
    if (isOpening) {
      closeFilter();
      this.backtrack();
    } else {
      openFilter();
    }
  }

  onCancel() {
    this.props.closeFilter();
    this.backtrack();
  }

  onApply() {
    const {
      onApplyChange,
      closeFilter,
    } = this.props;
    onApplyChange(this.applyState());
    closeFilter();
  }

  onClear() {
    this.props.onApplyChange(this.clearState());
    this.setState(this.clearState());
  }

  applyState() {
    // 繼承
  }

  clearState() {
    // 繼承
  }

  backtrack() {
    // 繼承
  }
}
