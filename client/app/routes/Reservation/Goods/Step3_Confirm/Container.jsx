import React from 'react';
import { connect } from 'react-redux';

class Form extends React.PureComponent {
  render() {
    return (
      <div>form</div>
    );
  }
}

const mapStateToProps = (state) => {
  const { environment } = state;
  return ({ environment });
};
export default connect(mapStateToProps)(Form);
