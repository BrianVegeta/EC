import React, { PropTypes } from 'react';
import classnames from 'classnames/bind';
import CSS from 'react-css-modules';
import styles from './styles.sass';

const cx = classnames.bind(styles);
class DecoratorDots extends React.PureComponent {
  static propTypes = {
    goToSlide: PropTypes.func.isRequired,
    currentSlide: PropTypes.number.isRequired,
    slideCount: PropTypes.number.isRequired,
  };
  isCurrentSlide(index) {
    return index === this.props.currentSlide;
  }
  render() {
    const { slideCount, goToSlide } = this.props;
    return (
      <div styleName="container">
        <ul styleName="list">
          {[...Array(slideCount)].map((x, index) =>
            <li key={`${index + 1}`} styleName="listItem">
              <button
                className={`button ${cx('dot', { active: this.isCurrentSlide(index) })}`}
                onClick={() => goToSlide(index)}
              />
            </li>,
          )}
        </ul>
      </div>
    );
  }
}
export default CSS(DecoratorDots, styles);
