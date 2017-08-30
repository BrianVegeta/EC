// @author: vincent
import React from 'react';
import PropTypes from 'prop-types';
import CSS from 'react-css-modules';
import _ from 'lodash';
import colors from 'styles/colorExport.scss';
import styles from './styles.sass';


class TitleWrapper extends React.Component {

  static defaultProps = {
    error: null,
    children: null,
  }

  static propTypes = {
    error: PropTypes.object,
    children: PropTypes.object,
  };

  constructor(props) {
    super(props);
    this.state = {
      limit: null,
      value: null,
    };
    this.onCountWord = this.onCountWord.bind(this);
  }

  onCountWord(word) {
    return _.trim(word).length;
  }

  render() {
    const { limit, word } = this.props.error;
    const style = {
      color: this.onCountWord(word) > limit ? colors.colorDanger : colors.blackColor,
    };
    return (
      <div>
        <div styleName="word">
          <span style={style}>{this.onCountWord(word)}</span> / {limit}
        </div>
        { this.props.children }
      </div>
    );
  }
}

export default CSS(TitleWrapper, styles);
