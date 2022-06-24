import logo from './logo.svg';
import './App.css';

import { Route, Switch } from 'react-router-dom';
import Medicine from './container/Medicine';
import Patients from './container/Patients';
import Layout from './components/Layout';

function App() {
  return (
    <>
      <Layout>
        <Switch>
          <Route path={'/medicine'} exact component={Medicine}/>
          <Route path={'/patients'} exact component={Patients}/>
        </Switch>
      </Layout>
    </>
  );
}

export default App;
