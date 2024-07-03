import { App as AntdApp, ConfigProvider } from 'antd';
import zhCN from 'antd/locale/zh_CN';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './redux';

import 'ress';
import './main.css';
console.log("store", store);
console.log("persistor", persistor);

import App from './pages/App';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <ConfigProvider locale={zhCN}>
          <AntdApp>
              <App />
          </AntdApp>
        </ConfigProvider>
      </PersistGate>
    </Provider>
  </React.StrictMode>
);
