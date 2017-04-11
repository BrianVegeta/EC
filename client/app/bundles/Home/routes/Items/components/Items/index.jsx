import CSS from 'react-css-modules';
import Page from './Page';
import styles from './page.css';
import FeatureHeader from './FeatureHeader';

module.exports = {
  ItemsPage: CSS(Page, styles),
  FeatureHeader,
};
