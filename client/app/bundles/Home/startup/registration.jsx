import ReactOnRails from 'react-on-rails';
import Header from '../components/Header';
// import App from './App';
import App from './renderRouter';

// This is how react_on_rails can see the HelloWorld in the browser.
ReactOnRails.register({
  App,
  Header,
});
