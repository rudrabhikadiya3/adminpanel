
import "./App.css";

import { Route, Switch } from "react-router-dom";
import Medicine from "./container/Medicine";
import Patients from "./container/Patients";
import Layout from "./components/Layout";
import { Provider } from "react-redux";
import configureStore from "./redux/store";
import Counter from "./container/Counter";

import { PersistGate } from "redux-persist/integration/react";

function App() {
  const { store, persistor} = configureStore();
  return (
    <>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <Layout>
            <Switch>
              <Route path={"/medicine"} exact component={Medicine} />
              <Route path={"/patients"} exact component={Patients} />
              <Route path={"/counter"} exact component={Counter} />
            </Switch>
          </Layout>
        </PersistGate>
      </Provider>
    </>
  );
}

export default App;
