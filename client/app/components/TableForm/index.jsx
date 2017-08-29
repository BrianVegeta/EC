import React from 'react';
import PropTypes from 'prop-types';
import myPropTypes from 'propTypes';
import CSS from 'react-css-modules';
import styles from './styles.sass';
import TableRow from './TableRow';

class TableForm extends React.Component {

  static propTypes = {
    children: myPropTypes.children.isRequired,
    className: PropTypes.string.isRequired,
  };

  render() {
    const { children, className } = this.props;
    return (
      <table className={className}>
        <tbody>
          {children}
        </tbody>
      </table>
    );
  }
}
export {
  TableRow,
};
export default CSS(TableForm, styles);
