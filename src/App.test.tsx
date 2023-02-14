import React from 'react';
import App from './App';
import {TestRender} from "./utils/test/test-utils";
import {TestIdList} from "./utils/test/testid-list";

describe('App Test Render', () => {
	it('123', () => {
		const view = TestRender(<App/>);
		
		const header = view.getByTestId(TestIdList["MAIN_HEADER"])
		expect(header).toBeInTheDocument()
	})
})
