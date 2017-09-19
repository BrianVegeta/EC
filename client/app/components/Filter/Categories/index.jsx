import React from 'react';
import PropTypes from 'prop-types';
import { map, find } from 'lodash';
import myPropTypes from 'propTypes';
import ReactHoverObserver from 'react-hover-observer';
import FilterButton from 'components/Filter/Button';
import { mappingIDFromCategory, mappingCategoryFromID } from 'constants/enums';
import { mapCategoryNameByID } from 'lib/category';
import CSS from 'react-css-modules';
import classnames from 'classnames/bind';
import styles from './styles.sass';


const cx = classnames.bind(styles);
class Categories extends React.Component {

  static defaultProps = {
    categoryId: null,
  };

  static propTypes = {
    fetchCategories: PropTypes.func.isRequired,
    categories: myPropTypes.categories.isRequired,
    categoryId: PropTypes.string,
    isOpening: PropTypes.bool.isRequired,
    openFilter: PropTypes.func.isRequired,
    closeFilter: PropTypes.func.isRequired,
    onApplyChange: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      hoveringTopCategoryId: null,
      hoveringMiddleCategoryId: null,
    };
    this.onButtonToggle = this.onButtonToggle.bind(this);
    this.renderTopCategory = this.renderTopCategory.bind(this);
    this.renderMiddleCategory = this.renderMiddleCategory.bind(this);
    this.renderSubCategory = this.renderSubCategory.bind(this);
    this.onContainerHoverChanged = this.onContainerHoverChanged.bind(this);
    this.onOutsideClick = this.onOutsideClick.bind(this);
    this.onClear = this.onClear.bind(this);
  }

  componentDidMount() {
    this.props.fetchCategories();
    document.addEventListener('mousedown', this.onOutsideClick, false);
  }

  componentWillUnmount() {
    document.removeEventListener('mousedown', this.onOutsideClick, false);
  }

  onButtonToggle() {
    const {
      isOpening,
      openFilter,
      closeFilter,
    } = this.props;
    if (isOpening) {
      closeFilter();
      this.clearHover();
    } else {
      openFilter();
    }
  }

  onApplyChange(categoryId) {
    this.props.onApplyChange(categoryId.toString());
    this.props.closeFilter();
    this.clearHover();
  }

  onClear() {
    this.props.onApplyChange(null);
  }

  onTopCategoryHovering(hoveringTopCategoryId) {
    this.setState({
      hoveringTopCategoryId,
      hoveringMiddleCategoryId: null,
    });
  }

  onMiddleCategoryHovering(hoveringMiddleCategoryId) {
    this.setState({ hoveringMiddleCategoryId });
  }

  onContainerHoverChanged({ isHovering }) {
    // if (!isHovering) this.onTopCategoryHovering(null);
  }

  onOutsideClick(e) {
    if (!this.container) return;
    if (this.container.contains(e.target)) return;
    this.props.closeFilter();
    this.clearHover();
  }

  clearHover() {
    this.setState({
      hoveringTopCategoryId: null,
      hoveringMiddleCategoryId: null,
    });
  }

  renderTopCategory(middleCategories, topCategory) {
    const { categories } = this.props;
    const topCategoryId = mappingIDFromCategory[topCategory];
    return (
      <div
        key={topCategory}
        role="button"
        tabIndex="-1"
        className="button"
        styleName="button"
        onClick={() => this.onApplyChange(topCategoryId)}
      >
        <ReactHoverObserver
          className={cx('category-item')}
          onHoverChanged={() => this.onTopCategoryHovering(topCategoryId)}
        >
          {mapCategoryNameByID(topCategoryId, categories)}
        </ReactHoverObserver>
      </div>
    );
  }

  renderMiddleCategory(middleCategory, index) {
    const { id: middleCategoryId, name } = middleCategory;
    return (
      <div
        key={`${index + 1}`}
        role="button"
        tabIndex="-1"
        className="button"
        styleName="button"
        onClick={() => this.onApplyChange(middleCategoryId)}
      >
        <ReactHoverObserver
          className={cx('category-item')}
          onHoverChanged={() => this.onMiddleCategoryHovering(middleCategoryId)}
        >
          {name}
        </ReactHoverObserver>
      </div>
    );
  }

  renderSubCategory(subCategory, index) {
    const { id: subCategoryId, name } = subCategory;
    return (
      <div
        key={`${index + 1}`}
        role="button"
        tabIndex="-1"
        className="button"
        styleName="button"
        onClick={() => this.onApplyChange(subCategoryId)}
      >
        <ReactHoverObserver className={cx('category-item')} >
          {name}
        </ReactHoverObserver>
      </div>
    );
  }

  renderSubCategoriesPanel() {
    const { categories } = this.props;
    const {
      hoveringTopCategoryId,
      hoveringMiddleCategoryId,
    } = this.state;
    const topCategory = mappingCategoryFromID[hoveringTopCategoryId];
    const middleCategories = categories[topCategory];
    const middleCategory = find(middleCategories, {
      id: hoveringMiddleCategoryId,
    });
    if (!middleCategory.children) return null;
    return (
      <div styleName="middle-container">
        <div styleName="panel">
          {middleCategory.children.map(this.renderSubCategory)}
        </div>
      </div>
    );
  }

  renderButtonContent(defaultDesc) {
    const { categoryId, categories } = this.props;
    if (!categoryId) return defaultDesc;
    return mapCategoryNameByID(categoryId.toString(), categories);
  }

  render() {
    const { isOpening, categories, categoryId } = this.props;
    const {
      hoveringTopCategoryId,
      hoveringMiddleCategoryId,
    } = this.state;
    const topCategory = mappingCategoryFromID[hoveringTopCategoryId];
    return (
      <div ref={container => (this.container = container)}>
        <FilterButton
          content={this.renderButtonContent('分類')}
          isOpen={isOpening}
          onClick={this.onButtonToggle}
          onClickClear={categoryId ? this.onClear : null}
        >
          <ReactHoverObserver onHoverChanged={this.onContainerHoverChanged} >
            <div styleName="container">
              {map(categories, this.renderTopCategory)}
            </div>
            {
              hoveringTopCategoryId &&
              <div styleName="middle-container">
                <div styleName="panel">
                  {categories[topCategory].map(
                    this.renderMiddleCategory,
                  )}
                </div>
                {hoveringMiddleCategoryId && this.renderSubCategoriesPanel()}
              </div>
            }
          </ReactHoverObserver>
        </FilterButton>
      </div>
    );
  }
}

export default CSS(Categories, styles);
