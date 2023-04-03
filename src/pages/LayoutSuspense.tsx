import { FCWithChildren } from './Planner/planner.types';
import { Loader } from '../components/Loaders/Loader';
import React from 'react';

export const LayoutSuspense: FCWithChildren = ({ children }) => {
  return (
    <React.Suspense
      fallback={
        <Loader
          title={'Загружаем ваш календарь, секундочку...'}
          isActive={true}
        />
      }
    >
      {children}
    </React.Suspense>
  );
};
