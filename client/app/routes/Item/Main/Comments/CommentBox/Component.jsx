import React, { PropTypes } from 'react';
// import { Editor, EditorState } from 'draft-js';
import Editable from 'react-plain-editable';

class Comment extends React.Component {

  constructor(props) {
    super(props);
    this.onChange = this.onChange.bind(this);
  }

  onChange(e, value) {
    console.log(value);
  }

  render() {
    return (
      <div style={{ border: '1px solid red' }}>
        <Editable onChange={this.onChange} />
      </div>
    );
  }
}

export default Comment;
