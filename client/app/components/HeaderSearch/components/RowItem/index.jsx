import React from 'react';
import PropTypes from 'prop-types';
import CSS from 'react-css-modules';
import styles from './styles.sass';
import Picture from '../../../Picture';

class RowWish extends React.Component {
  static propTypes = {
    source: PropTypes.shape({
      title: PropTypes.string.isRequired,
      priceLabel: PropTypes.string.isRequired,
      picture: PropTypes.string.isRequired,
    }).isRequired,
  };
  render() {
    const { source } = this.props;
    const { title, priceLabel, pictureBg } = source;
    return (
      <div styleName="container">
        <div styleName="avatar">
          <Picture src={pictureBg} width={60} />
        </div>
        <div styleName="body">
          <div styleName="name">{title}</div>
          <div styleName="price">{priceLabel}</div>
        </div>
      </div>
    );
  }
}
export default CSS(RowWish, styles);
