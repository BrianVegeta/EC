import React from 'react';
import CSS from 'react-css-modules';
import styles from './styles.sass';
import SearchPanel from './SearchPanel';

class Search extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      isFocusing: false,
    };
    this.onInputFocus = this.onInputFocus.bind(this);
    this.onInputBlur = this.onInputBlur.bind(this);
    this.onTyping = this.onTyping.bind(this);
  }

  onInputFocus() {
    this.setState({ isFocusing: true });
  }

  onInputBlur() {
    this.setState({ isFocusing: false });
  }

  onTyping(e) {
    console.log(e.target.value);
  }

  render() {
    const { isFocusing } = this.state;
    return (
      <div styleName="container">
        <div styleName="input-group">
          <button styleName="search-icon" className="default-button">
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
            onKeyUp={this.onTyping}
          />
        </div>
        { isFocusing &&
          <SearchPanel>
            <div style={{ height: 2000 }}>TEST</div>
          </SearchPanel>
        }
      </div>
    );
  }
}
export default CSS(Search, styles);
