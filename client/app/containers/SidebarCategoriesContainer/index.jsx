import React from 'react';
import PropTypes from 'prop-types';
import myPropTypes from 'propTypes';
import { connect } from 'react-redux';
import { List } from 'immutable';
import ReactHoverObserver from 'react-hover-observer';

import {
  CATEGORY_GOODS,
  CATEGORY_SERVICE,
  CATEGORY_SPACE,
} from 'constants/enums';

import CSS from 'react-css-modules';
import styles from './styles.sass';
import ListItem from './ListItem';
import SubCategories from './SubCategories';

class SidebarCategoriesContainer extends React.Component {

  static propTypes = {
    topCategory: PropTypes.oneOf([
      CATEGORY_GOODS,
      CATEGORY_SERVICE,
      CATEGORY_SPACE,
    ]).isRequired,
    options: myPropTypes.options.isRequired,
  };

  constructor(props) {
    super(props);

    this.state = {
      openCategories: List([]),
    };
  }

  onSubCatesToggleOpen(index) {
    const { openCategories } = this.state;
    this.setState({
      openCategories: openCategories.set(
        index,
        openCategories.includes(index) ? undefined : index,
      ),
    });
  }

  render() {
    const { options: { categories }, topCategory } = this.props;
    const { openCategories } = this.state;

    return (
      <div styleName="container">
        <ul styleName="list-container">
          {categories[topCategory].map((category, index) => (
            <li key={category.id}>
              <ReactHoverObserver >
                <ListItem
                  category={category}
                  isSubCategoryOpen={openCategories.includes(index)}
                  onSubCatesToggleOpen={() => this.onSubCatesToggleOpen(index)}
                />
              </ReactHoverObserver>
              {openCategories.includes(index) &&
                <SubCategories
                  subCategories={category.children}
                />
              }
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const { options } = state;
  return { options };
};
export default connect(mapStateToProps)(CSS(SidebarCategoriesContainer, styles));
