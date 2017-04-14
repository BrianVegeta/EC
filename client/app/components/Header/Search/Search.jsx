import React from 'react';

class Search extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      isFocusing: false,
    };
    this.onInputFocus = this.onInputFocus.bind(this);
    this.onInputBlur = this.onInputBlur.bind(this);
  }

  onInputFocus() {
    this.setState({ isFocusing: true });
  }

  onInputBlur() {
    this.setState({ isFocusing: false });
  }

  render() {
    const { isFocusing } = this.state;
    return (
      <div styleName="container">
        <div styleName="input-group">
          <button
            styleName="search-icon"
            className="default-button"
          >
            <i className="fa fa-search" aria-hidden="true" />
          </button>
          <input
            type="search"
            placeholder={'你的好物、服務、空間、分享人名稱'}
            autoComplete="off"
            spellCheck="false"
            styleName={isFocusing ? 'input-focus' : 'input'}
            onFocus={this.onInputFocus}
            onBlur={this.onInputBlur}
          />
        </div>
      </div>
    );
  }
}
export default Search;
