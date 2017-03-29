import React from 'react';
import { Link } from 'react-router';

class Home extends React.PureComponent {
  render() {
    return (
      <div>
        <h1>Home page</h1>
        <Link to="/page/test2" >link to test2</Link>
      </div>
    );
  }
}

export default Home;
