import React from 'react';
import PropTypes from 'prop-types';

import FavoriteHeartIcon from 'components/FavoriteHeart';
// import { addFavorite, removeFavorite } from 'actions/module/favoriteActions';

import CSS from 'react-css-modules';
import styles from './styles.sass';

class FavoriteHeart extends React.Component {

  static defaultProps = {
    isActive: false,
  };

  static propTypes = {
    pid: PropTypes.number.isRequired,
    isActive: PropTypes.bool.isRequired,
    count: PropTypes.number.isRequired,
    dispatch: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      isActive: this.props.isActive,
      count: this.props.count,
      isLoading: false,
    };
    this.addFavorite = this.addFavorite.bind(this);
    this.waiting = this.waiting.bind(this);
    this.addDone = this.addDone.bind(this);
    this.removeFavorite = this.removeFavorite.bind(this);
    this.removeDone = this.removeDone.bind(this);
  }

  addFavorite() {
    this.props.dispatch(
     addFavorite(this.props.pid, this.waiting, this.addDone),
    );
  }
  waiting() {
    this.setState({
      isLoading: true,
    });
  }

  addDone() {
    this.setState({
      isActive: true,
      count: this.state.count + 1,
      isLoading: false,
    });
  }

  removeFavorite() {
    this.props.dispatch(
      removeFavorite(this.props.pid, this.waiting, this.removeDone),
    );
  }

  removeDone() {
    this.setState({
      isActive: false,
      count: this.state.count - 1,
      isLoading: false,
    });
  }

  render() {
    return (
      <div>
        <span styleName="favorite-count-span">{this.state.count}</span>
        <button
          className="button"
          onClick={this.state.isActive ? this.removeFavorite : this.addFavorite}
        >
          <FavoriteHeartIcon active={this.state.isActive} size={20} />
        </button>
      </div>
    );
  }
}

export default CSS(FavoriteHeart, styles);
