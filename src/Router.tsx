import type { VoidFunctionComponent } from 'react';
import { useMemo } from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Comparator from './Comparator';
import Welcome from './Welcome';
import { getStore } from './store';

const Router: VoidFunctionComponent = () => {
  const store = useMemo(() => getStore(), []);

  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route element={<Comparator />} path="/" />
          <Route element={<Welcome />} path="/welcome" />
          <Route element={<Comparator />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  );
};

export default Router;
