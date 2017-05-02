import React, { PropTypes } from 'react';
import TextareaAutosize from 'react-autosize-textarea';
import { DESCRIPTION } from '../placeholder';

class Description extends React.Component {
  constructor(props) {
    super(props);
    this.onChange = this.onChange.bind(this);
  }

  onChange(e) {
    const content = JSON.stringify(e.target.value.replace(/\n/g, ''));
    console.log(content);
    console.log(content.length);
  }

  render() {
    return (
      <div styleName="inputControl">
        <TextareaAutosize
          styleName="textareaField"
          placeholder={DESCRIPTION}
          onChange={this.onChange}
        />
      </div>
    );
  }
}

export default Description;
