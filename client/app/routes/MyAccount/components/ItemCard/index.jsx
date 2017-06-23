import React from 'react';
import PropTypes from 'prop-types';
import CSS from 'react-css-modules';
import styles from './styles.sass';
import Picture from '../../../../components/Picture';
import EditCheck from './EditCheck';

class ItemCard extends React.Component {
  static propTypes = {
    resource: PropTypes.shape({
      coverSrc: PropTypes.string,
      title: PropTypes.string,
      price: PropTypes.string,
    }).isRequired,
  };
  render() {
    const { resource } = this.props;
    return (
      <div styleName="container">
        <div styleName="picture">
          <Picture src={resource.coverSrc} />
          <div styleName="editOverlay">
            <div styleName="editControl">
              <EditCheck checked />
            </div>
          </div>
        </div>
        <div styleName="title">{resource.title}</div>
        <div styleName="price">{resource.price}</div>
      </div>
    );
  }
}

export default CSS(ItemCard, styles);
