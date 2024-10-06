import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import { router } from '@app/routes/Routes';
import { Provider } from 'react-redux';
import { persistor, store } from './store';
import { PersistGate } from 'redux-persist/integration/react';
import '@assets/style.scss';

const container = document.getElementById('root');
const root = ReactDOM.createRoot(container!);

root.render(
    <React.StrictMode>
        <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
            <RouterProvider router={router}>
            </RouterProvider>
        </PersistGate>
        </Provider>
    </React.StrictMode>
);
