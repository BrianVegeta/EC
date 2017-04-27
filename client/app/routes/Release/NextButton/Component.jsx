import React, { PropTypes } from 'react';
import Spinner from '../../../components/SpinnerCircle';

const propTypes = {
  editStatus: PropTypes.string.isRequired,
  dispatch: PropTypes.func.isRequired,
};
const NextButton = (props) => {
  const { editStatus } = props;
  switch (editStatus) {
    case 'ready':
      return (
        <button
          className="button"
          styleName="next"
          onClick={props.dispatch}
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
