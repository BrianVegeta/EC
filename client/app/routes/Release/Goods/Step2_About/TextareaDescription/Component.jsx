import React, { PropTypes } from 'react';
import TextareaAutosize from 'react-autosize-textarea';
import { DESCRIPTION } from '../placeholder';

const propTypes = {
  dispatch: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  itemRelease: PropTypes.object.isRequired,
};
class Description extends React.Component {
  constructor(props) {
    super(props);
    this.onChange = this.onChange.bind(this);
  }

  onChange(e) {
    const { dispatch, onChange } = this.props;
    dispatch(onChange(e.target.value));
  }

  render() {
    const { itemRelease } = this.props;
    return (
      <div styleName="inputControl">
        <TextareaAutosize
          styleName="textareaField"
          placeholder={DESCRIPTION}
          onChange={this.onChange}
          value={itemRelease.form.descript}
        />
      </div>
    );
  }
}
Description.propTypes = propTypes;
export default Description;
