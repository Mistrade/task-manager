import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './style.css'
import {store} from "./store";
import {Provider} from "react-redux";
import {BrowserRouter} from "react-router-dom";

const root = ReactDOM.createRoot(
	document.getElementById('root') as HTMLElement
);

root.render(
	<React.StrictMode>
		<Provider store={store}>
			<BrowserRouter basename={'/'}>
				<App/>
			</BrowserRouter>
		</Provider>
	</React.StrictMode>
);
