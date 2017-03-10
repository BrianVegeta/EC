import ReactOnRails from 'react-on-rails';
import Header from '../components/Header';
import HomeApp from './HomeApp';

// This is how react_on_rails can see the HelloWorld in the browser.
ReactOnRails.register({
  HomeApp,
  Header,
});
