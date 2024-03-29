import { RenderResult, render } from '@testing-library/react';
import React, { ReactElement } from 'react';
import { Provider } from 'react-redux';

import { RootState, createAppStore } from '@src/store';


export const TestRender = (
  component: ReactElement,
  preloadedState?: RootState
): RenderResult => {
  const store = createAppStore(preloadedState);

  function Wrapper({ children }: React.PropsWithChildren<{}>) {
    return <Provider store={store}>{children}</Provider>;
  }

  return render(component, { wrapper: Wrapper });
};