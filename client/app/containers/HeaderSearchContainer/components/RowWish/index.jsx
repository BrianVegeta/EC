import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import { wishRouter } from 'lib/paths';
import Picture from 'components/Picture';
import CSS from 'react-css-modules';
import styles from './styles.sass';


class RowWish extends React.Component {

  static propTypes = {
    source: PropTypes.shape({
      id: PropTypes.number,
      title: PropTypes.string.isRequired,
      picture: PropTypes.string.isRequired,
      priceLabel: PropTypes.string.isRequired,
    }).isRequired,
  };

  render() {
    const { source } = this.props;
    const { id, title, priceLabel, picture } = source;
    return (
      <div styleName="container">
        <Link to={wishRouter.detailPath(id)}>
          <div styleName="avatar">
            <Picture src={picture} width={60} />
          </div>
          <div styleName="body">
            <div styleName="name">{title}</div>
            <div styleName="price">{priceLabel}</div>
          </div>
        </Link>
      </div>
    );
  }
}
export default CSS(RowWish, styles);
