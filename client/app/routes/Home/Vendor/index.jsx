import React from 'react';
import TextTruncate from 'react-text-truncate';
import CSS from 'react-css-modules';
import { Link } from 'react-router';
import { userprofilePaths, itemPath } from 'lib/paths';

import styles from './styles.sass';
import bindSlider from '../bindSlider';
import myPropTypes from '../../../propTypes';
import Avatar from '../../../components/Avatar';
import Picture from '../../../components/Picture';

class Vendor extends React.Component {
  static propTypes = {
    item: myPropTypes.vendorCard.isRequired,
  };
  render() {
    const { item } = this.props;
    const { items } = item;
    return (
      <div styleName="container">
        <div styleName="card">
          <div styleName="avatar">
            <Link to={userprofilePaths.indexPath(item.uid)}>
              <Avatar src={item.img} />
            </Link>
          </div>
          <div styleName="script">
            <Link
              to={userprofilePaths.indexPath(item.uid)}
              styleName="title"
            >
              <TextTruncate
                line={1}
                truncateText="…"
                text={item.name}
              />
            </Link>
            <div styleName="biography">
              <div styleName="inner">
                <TextTruncate
                  line={2}
                  truncateText="…"
                  text={item.autobiography}
                />
              </div>
            </div>
          </div>
          <div styleName="gallery">
            {items.map((ownItem, index) =>
              (<div styleName="item" key={`${index + 1}`}>
                <Link to={itemPath(ownItem.pname, ownItem.pid)}>
                  <Picture src={ownItem.img1} />
                </Link>
              </div>),
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default bindSlider(CSS(Vendor, styles));
