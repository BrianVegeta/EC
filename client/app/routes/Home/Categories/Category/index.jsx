import React from 'react';
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
    const { img, name } = category;
    return (
      <div styleName="container">
        <div styleName="cover" >
          <Picture src={`url(${img})`} />
        </div>
        <div styleName="name">{name}</div>
      </div>
    );
  }
}

export default CSS(Category, styles);
