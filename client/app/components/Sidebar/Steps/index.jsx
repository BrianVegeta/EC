import React, { PropTypes } from 'react';
import { includes, isNull } from 'lodash';
import StepNav, { CHECKED, UNCHECK } from './StepNav';

export const stepPropType = PropTypes.shape({
  isValid: PropTypes.bool.isRequired,
  text: PropTypes.string.isRequired,
  path: PropTypes.string.isRequired,
});

class SidebarSteps extends React.Component {

  static defaultProps = {
    touchedPaths: null,
  };

  static propTypes = {
    touchedPaths: PropTypes.arrayOf(PropTypes.string),
    steps: PropTypes.arrayOf(stepPropType.isRequired).isRequired,
  };

  mapPathsTouched() {
    const { touchedPaths, steps } = this.props;
    return steps.map(({ text, path, isValid }) => {
      const isTouched = isNull(touchedPaths) || includes(touchedPaths, path);
      return ({ isTouched, isValid, text, path });
    });
  }

  render() {
    const mappedSteps = this.mapPathsTouched();
    return (
      <div>
        {mappedSteps.map(({ text, isValid, isTouched, path }, index) => (
          <StepNav
            key={`${index + 1}`}
            text={text}
            status={(isValid && isTouched) ? CHECKED : UNCHECK}
            isTouched={isTouched}
            path={path}
          />
        ))}
      </div>
    );
  }
}

export default SidebarSteps;
