import React, { PropTypes } from 'react';
import RotateRightIcon from 'react-icons/lib/md/rotate-right';
import RotateLeftIcon from 'react-icons/lib/md/rotate-left';

class Controller extends React.Component {
  render() {
    return (
      <div styleName="container">
        <button styleName="rotateBtn" className="button">
          <RotateLeftIcon size={30} />
        </button>
        <button styleName="rotateBtn" className="button">
          <RotateRightIcon size={30} />
        </button>
      </div>
    );
  }
}

export default Controller;
