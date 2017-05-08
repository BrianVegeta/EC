import React, { PropTypes } from 'react';

class SelectionCategory extends React.Component {

  constructor(props) {
    super(props);
    this.onBlur = this.onBlur.bind(this);
    this.onFocus = this.onFocus.bind(this);
    this.state = {
      isFocusing: true,
      tracks: [],
    };
  }

  onBlur() {
    this.setState({ isFocusing: true });
  }

  onFocus() {
    this.setState({ isFocusing: true });
  }

  select(track) {
    this.setState({ tracks: this.state.tracks.concat(track) });
  }

  endSelect(track) {
    this.setState({ tracks: this.state.tracks.concat(track) });
  }

  render() {
    const { isFocusing } = this.state;
    const { categories } = this.props;
    console.log(categories);
    return (
      <button
        styleName={isFocusing ? 'inputFocusing' : 'input'}
        className="button"
        onFocus={this.onFocus}
        onBlur={this.onBlur}
      >
        <div styleName="innerWrapper">select</div>
        {
          categories &&
          <div styleName="dropdown">
            {categories.map((category, i) =>
              <div
                key={`${i + 1}`}
                role="button"
                onClick={() => this.select(category.text)}
              >
                {category.text}
              </div>,
            )}
          </div>
        }
      </button>
    );
  }
}

export default SelectionCategory;
