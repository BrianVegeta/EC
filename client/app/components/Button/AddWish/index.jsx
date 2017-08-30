import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import IconWish from 'react-icons/lib/fa/magic';

// import { popupNewWish } from 'actions/popupActions';

import CSS from 'react-css-modules';
import styles from './styles.sass';


class AddWish extends React.Component {

  static propTypes={
    dispatch: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
    this.popupNewWish = this.popupNewWish.bind(this);
  }

  popupNewWish() {
    // this.props.dispatch(popupNewWish({}, 600));
  }

  render() {
    return (
      <div styleName="container">
        <button
          className="button"
          styleName="newWishButton"
          onClick={this.popupNewWish}
        >
          <IconWish size={28} />
          <div styleName="text" >許願</div>
        </button>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const { environment } = state;
  return ({ environment });
};
export default connect(mapStateToProps)(CSS(AddWish, styles));
