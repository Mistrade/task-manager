import { Loader } from '@components/Loaders/Loader';
import { FCWithChildren } from '@planner/planner.types';
import React from 'react';

export const LayoutSuspense: FCWithChildren<{ title?: string }> = ({
  children,
  title,
}) => {
  return (
    <React.Suspense
      fallback={
        <Loader
          title={title || 'Загружаем ваш календарь, секундочку...'}
          isActive={true}
        />
      }
    >
      {children}
    </React.Suspense>
  );
};
