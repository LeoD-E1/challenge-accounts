import { routes } from './view';
import { Switch, Route } from 'wouter';
function App() {
  return (
    <Switch>
      {routes.map((route, index) => (
        <Route key={index} path={route.path} component={route.component} />
      ))}
    </Switch>
  );
}

export default App;
