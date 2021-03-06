import React from 'react';
import PropTypes from 'prop-types';
import CheckBox from './CheckBox';

class InputChecksGroup extends React.PureComponent {
  static propTypes = {
    options: PropTypes.arrayOf(
      PropTypes.shape({
        text: PropTypes.string,
        onChange: PropTypes.func,
      }),
    ).isRequired,
  };
  render() {
    const { options } = this.props;
    return (
      <div>
        {options.map((v, i) =>
          <CheckBox
            key={`${i + 1}`}
            labelText={v.text}
            onChange={v.onChange}
            collectedNode={v.collectedNode}
            checked={v.isChecked}
          />,
        )}
      </div>
    );
  }
}

export default InputChecksGroup;
