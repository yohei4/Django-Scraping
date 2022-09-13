import React, { FC } from 'react';
import '@/assets/sass/style.scss';
import ReactDOM from 'react-dom/client';
// import { Home, Login, Register } from '@/components/Pages';
import reportWebVitals from './reportWebVitals';
import { Route, BrowserRouter, Routes } from "react-router-dom";
import { Router } from '@/routes/Router';

const root = ReactDOM.createRoot(
	document.getElementById('root') as HTMLElement
);

root.render(
	<React.StrictMode>
		<BrowserRouter>
			<Router />
		</BrowserRouter>
	</React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
