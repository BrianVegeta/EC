import React, { PropTypes } from 'react';

class Category extends React.Component {
  render() {
    const { item } = this.props;
    const { coverUrl, name } = item;

    return (
      <div styleName="container">
        <div styleName="cover" style={{ backgroundImage: `url(${coverUrl})` }} />
        <div styleName="name">{name}</div>
      </div>
    );
  }
}

export default Category;
