import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames/bind';
import CSS from 'react-css-modules';
import styles from './styles.sass';
import IconArrowRight from '../../../components/Icons/ArrowRight';
import IconArrowLeft from '../../../components/Icons/ArrowLeft';

const cx = classnames.bind(styles);
class SliderArrow extends React.Component {
  static defaultProps = {
    onClick: null,
    coverAlign: false,
  };
  static propTypes = {
    side: PropTypes.oneOf(['left', 'right']).isRequired,
    onClick: PropTypes.func,
    coverAlign: PropTypes.bool,
  };
  isLeft() {
    return this.props.side === 'left';
  }
  isRight() {
    return this.props.side === 'right';
  }
  render() {
    const { onClick, coverAlign } = this.props;
    if (!onClick) return null;
    return (
      <button
        className={`button ${cx(
          'container',
          {
            left: this.isLeft(),
            right: this.isRight(),
            coverAlign,
          },
        )}`}
        {...{ onClick }}
      >
        {this.isLeft() && <IconArrowLeft size={50} />}
        {this.isRight() && <IconArrowRight size={50} />}
      </button>
    );
  }
}

export default CSS(SliderArrow, styles);
