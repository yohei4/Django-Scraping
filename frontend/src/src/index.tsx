import React, { FC } from 'react';
import '@/assets/sass/style.scss';
import ReactDOM from 'react-dom/client';
import Login from '@/components/Login/Login';
import reportWebVitals from './reportWebVitals';
import { Route, BrowserRouter } from "react-router-dom";

const root = ReactDOM.createRoot(
	document.getElementById('root') as HTMLElement
);
	root.render(
	<React.StrictMode>
		{/* <BrowserRouter>
			<div>
			<Route path="app"> */}
				<Login/>
			{/* </Route>
			</div>
		</BrowserRouter> */}
	</React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
