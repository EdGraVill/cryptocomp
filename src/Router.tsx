import type { VoidFunctionComponent } from 'react';
import { useMemo } from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Background } from './CommonUI';
import Comparator from './Comparator/Comparator';
import Welcome from './Welcome';
import { getStore } from './store';

const Router: VoidFunctionComponent = () => {
  const store = useMemo(() => getStore(), []);

  return (
    <Provider store={store}>
      <BrowserRouter>
        <Background>
          <Routes>
            <Route element={<Comparator />} path="/" />
            <Route element={<Welcome />} path="/welcome" />
            <Route element={<Comparator />} />
          </Routes>
        </Background>
      </BrowserRouter>
    </Provider>
  );
};

export default Router;
