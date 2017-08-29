import React from 'react';
import PropTypes from 'prop-types';
import myPropTypes from 'propTypes';
import CSS from 'react-css-modules';
import styles from './styles.sass';

class TableRow extends React.Component {

  static defaultProps = {
    labelWidth: null,
  };

  static propTypes = {
    children: myPropTypes.children.isRequired,
    labelWidth: PropTypes.number,
  };

  render() {
    const { children, labelWidth } = this.props;
    return (
      <tr styleName="row">
        <th
          width={labelWidth}
          styleName="th"
        >
          {children[0]}
        </th>
        <td styleName="td">{children[1]}</td>
      </tr>
    );
  }
}

export default CSS(TableRow, styles);
