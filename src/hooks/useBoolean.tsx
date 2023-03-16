import { useState } from 'react';

export const useBoolean = (initialState: boolean) => {
  const [state, setState] = useState(initialState);

  return {
    state,
    toggleState: () => setState((prev) => !prev),
    setState: setState,
  };
};
