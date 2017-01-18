// Custom styles
require("./Assets/scss/main.scss");

import React from 'react';
import { render } from 'react-dom';
import { Router, hashHistory } from 'react-router'
import { routes } from './routes';

document.addEventListener("DOMContentLoaded", function () {
    const appContainer = document.getElementById('react-app');

    render(<Router history={hashHistory} onUpdate={() => window.scrollTo(0, 0)} routes={routes} />, appContainer);
});
