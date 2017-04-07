import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import { fetchItems } from '../../../actions/itemsActions';

const propTypes = {
  items: PropTypes.object.isRequired,
  currentType: PropTypes.string.isRequired,
  params: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
};
class Sidebar extends React.Component {
  constructor(props) {
    super(props);
    this.state = { index: 0, isOpen: false };
    this.handleSubcatesToggle = this.handleSubcatesToggle.bind(this);
    this.linkOnClick = this.linkOnClick.bind(this);
  }

  handleSubcatesToggle(index) {
    const isOpen = (this.state.index === index) ? !this.state.isOpen : this.state.isOpen;
    this.setState({ index, isOpen });
  }

  ableToExpandSubcates(category) {
    const { params } = this.props;
    const { subcates } = category;
    return (
      subcates &&
      params.id &&
      category.id === parseInt(params.id, 10)
    );
  }

  linkOnClick(e, link) {
    e.preventDefault();
    history.pushState(null, null, link);
    const { dispatch } = this.props;
    dispatch(fetchItems(() => window.scrollTo(0, 330)));
  }

  render() {
    const { items, currentType } = this.props;
    const categories = items.categories[currentType] || [];
    return (
      <div styleName="container">
        <ul styleName="categories">
          {
            categories.map((category, index) => {
              const { subcates, text, link } = category;
              return (
                <li key={`${text}_${index + 1}`} styleName="category">
                  <Link to={link} onClick={e => this.linkOnClick(e, link)} >
                    <span styleName="icon">
                      <i className="fa fa-suitcase" aria-hidden="true" />
                    </span>
                    <span>{text}</span>
                  </Link>
                  {
                    this.ableToExpandSubcates(category) &&
                      <ul styleName="subcates">
                        {
                          subcates.map((subcate, subIndex) =>
                            <li key={`${subIndex + 1}`}>{subcate.text}</li>,
                          )
                        }
                      </ul>
                  }
                </li>
              );
            })
          }
        </ul>
      </div>
    );
  }
}
Sidebar.propTypes = propTypes;
export default Sidebar;
