import React from 'react';
import ReactDOM from 'react-dom/client';
import { router } from './routes/Routes';
import { RouterProvider } from 'react-router-dom';
import { Provider } from 'react-redux';
import { persistor, store } from './store';
import { PersistGate } from 'redux-persist/integration/react';

const container = document.getElementById('app');
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
