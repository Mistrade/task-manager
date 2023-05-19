import { FC, ReactNode } from 'react';

import { VerticalScroll } from '@components/LayoutComponents';

export const GroupListScrollContainer: FC<{ children: ReactNode }> = ({
  children,
}) => (
  <VerticalScroll
    renderPattern={'top-bottom'}
    containerProps={{ maxHeight: 300, width: '100%', p: 0 }}
  >
    {children}
  </VerticalScroll>
);
