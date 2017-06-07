import React from 'react';
import PropTypes from 'prop-types';
import CSS from 'react-css-modules';
import styles from './styles.sass';

class Block extends React.Component {
  static defaultProps = {
    wrapper: 'table',
  };
  static propTypes = {
    title: PropTypes.string.isRequired,
    content: PropTypes.oneOfType([
      PropTypes.arrayOf(PropTypes.oneOfType([
        PropTypes.node,
        PropTypes.string,
        PropTypes.object,
        PropTypes.array,
      ])),
      PropTypes.string,
      PropTypes.node,
    ]).isRequired,
    wrapper: PropTypes.string,
  };
  renderformcontent() {
    const { content, wrapper } = this.props;
    if (wrapper === 'table') {
      return (
        <table styleName="table">
          <tbody>
            {content.map((row, i) =>
              <tr styleName="row" key={`${i + 1}`}>
                <th styleName="head" width={154}>{row[0]}</th>
                <td styleName="body">{row[1]}</td>
              </tr>,
            )}
          </tbody>
        </table>
      );
    }
    if (wrapper === 'photo') {
      return content;
    }
    return (
      <table styleName="table">
        <tbody>
          <tr styleName="row">
            <td styleName="body">{content}</td>
          </tr>
        </tbody>
      </table>
    );
  }
  render() {
    const { title } = this.props;
    return (
      <div styleName="container">
        <div styleName="title">{title}</div>
        {this.renderformcontent()}
      </div>
    );
  }
}

export default CSS(Block, styles);
