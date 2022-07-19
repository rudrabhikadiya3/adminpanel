import logo from './logo.svg';
import './App.css';

import { Route, Switch } from 'react-router-dom';
import Medicine from './container/Medicine';
import Patients from './container/Patients';
import Layout from './components/Layout';
import { Provider } from 'react-redux';
import configureStore from './redux/store';

function App() {
  const store = configureStore()
  return (
    <>    
    <Provider store={store}>
      <Layout>
        <Switch>
          <Route path={'/medicine'} exact component={Medicine}/>
          <Route path={'/patients'} exact component={Patients}/>
        </Switch>
      </Layout>
      </Provider>
    </>
  );
}

export default App;
