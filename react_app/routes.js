import { Route, IndexRoute } from 'react-router';

import App from './Containers/App';
import Home from './Components/Home';
import Articles from './Components/Articles';
import NotFound from './Components/NotFound';

export const routes = (
  <div>
    <Route path='/' component={App}>
      <IndexRoute component={Home} />
      <Route path='/articles' component={Articles} />
    </Route>
    <Route path='*' component={NotFound} />
  </div>
);
