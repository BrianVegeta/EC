import React, { PropTypes } from 'react';
import _ from 'lodash';
import CSS from 'react-css-modules';
import styles from './styles.sass';

class Block extends React.Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
    content: PropTypes.arrayOf(PropTypes.oneOfType([
      PropTypes.node, PropTypes.string, PropTypes.object,
    ])).isRequired,
  };
  renderContent() {
    const { content } = this.props;
    if (_.isArray(content)) {
      return (
        <table>
          {content.map((body, head) =>
            <tr styleName="row">
              <th styleName="head" width={154}>{head}</th>
              <td styleName="body">{body}</td>
            </tr>,
          )}
        </table>
      );
    }
    return (
      <table>
        <tr styleName="row">
          <td styleName="body">{content}</td>
        </tr>
      </table>
    );
  }
  render() {
    const { title } = this.props;
    return (
      <div styleName="container">
        <div styleName="title">{title}</div>
        {this.renderContent()}
      </div>
    );
  }
}

export default CSS(Block, styles);
