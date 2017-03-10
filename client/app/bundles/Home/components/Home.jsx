import React from 'react';

const Home = ({ name, updateName }) => (
  <div>
    <h3> Hello, {name}! </h3>
    <hr />
    <form >
      <label htmlFor="name">
        Say hello to:
      </label>
      <input
        id="name"
        type="text"
        value={name}
        onChange={e => updateName(e.target.value)}
      />
    </form>
  </div>
);
Home.prop
export default Home;
