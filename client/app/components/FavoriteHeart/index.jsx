import React from 'react';
import PropTypes from 'prop-types';
import IconFavoriteO from 'react-icons/lib/md/favorite-outline';
import IconFavorite from 'react-icons/lib/md/favorite';
import colors from 'styles/colorExport.scss';

class FavoriteHeart extends React.Component {
  static defaultProps = {
    size: 20,
    active: false,
  };
  static propTypes = {
    size: PropTypes.number,
    active: PropTypes.bool,
  };
  render() {
    const { active, size } = this.props;
    if (active) {
      return <IconFavorite size={size} color={colors.colorDanger} />;
    }
    return <IconFavoriteO size={size} />;
  }
}

export default FavoriteHeart;
