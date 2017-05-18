import React, { PropTypes } from 'react';
import Spinner from '../../../../../components/SpinnerCircle';

const propTypes = {
  status: PropTypes.string.isRequired,
  next: PropTypes.func.isRequired,
};
const NextButton = (props) => {
  switch (props.status) {
    case 'ready':
      return (
        <button
          className="button"
          styleName="next"
          onClick={props.next}
        >
          下一步
        </button>
      );
    case 'nexting':
      return (
        <button className="button" styleName="next-waiting">
          <Spinner style={{ margin: '0 auto' }} />
        </button>
      );
    default:
      return (
        <button className="button" styleName="next-disable">
          下一步
        </button>
      );
  }
};
NextButton.propTypes = propTypes;
export default NextButton;
