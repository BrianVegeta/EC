import React from 'react';
import PropTypes from 'prop-types';
import myPropTypes from 'propTypes';

import TableForm, { TableRow } from 'components/TableForm';

import classnames from 'classnames/bind';
import CSS from 'react-css-modules';
import styles from './styles.sass';


const cx = classnames.bind(styles);
class Profile extends React.Component {

  static propTypes = {
    dispatchChangeData: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
  }

  componentDidMount() {
  }

  render() {

    return (
      <TableForm>
        <TableRow labelWidth={100}>
          <span styleName="label">手機號碼</span>
          <div styleName="input-container">
            content
          </div>
        </TableRow>
      </TableForm>
    );
  }
}

export default CSS(Profile, styles);
