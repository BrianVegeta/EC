import React from 'react';
import { Link } from 'react-router';
import CSS from 'react-css-modules';
import styles from './styles.sass';
import myPropTypes from '../../../../propTypes';
import Picture from '../../../../components/Picture';


class Category extends React.Component {
  static propTypes = {
    category: myPropTypes.category.isRequired,
  };
  render() {
    const { category } = this.props;
    const { img, name, id } = category;
    return (
      <Link to={`/p/i/lease/${name}-c.${id}`}>
        <div styleName="container">
          <div styleName="cover" >
            <Picture src={img} />
          </div>
          <div styleName="name">{name}</div>
        </div>
      </Link>
    );
  }
}

export default CSS(Category, styles);
