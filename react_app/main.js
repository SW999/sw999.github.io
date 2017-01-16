// Custom styles
require("./Assets/scss/main.scss");

import { render } from 'react-dom';
import { Router, browserHistory } from 'react-router';
import { routes } from './routes';

document.addEventListener("DOMContentLoaded", function () {
  render(
    <Router history={browserHistory} routes={routes} />, 
    document.getElementById('react-app')
  )
});
