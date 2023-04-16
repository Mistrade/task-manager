import React from 'react';

import { TimeBadge } from '@components/Badge/Badge';

import { BreadCrumbsContainer } from './BreadCrumbs.styled';

interface BreadCrumbsItem<T> {
  title: string;
  value: T;
}

export interface BreadCrumbsProps<T> {
  data: Array<BreadCrumbsItem<T>>;

  onClick(data: T): void;
}

export function BreadCrumbs<T>({ data, onClick }: BreadCrumbsProps<T>) {
  return (
    <BreadCrumbsContainer>
      {data.map((item, index) => (
        <React.Fragment key={item.title}>
          <TimeBadge
            style={{ cursor: 'pointer' }}
            onClick={() => onClick(item.value)}
          >
            {item.title}
          </TimeBadge>
          {index !== data.length - 1 && '/'}
        </React.Fragment>
      ))}
    </BreadCrumbsContainer>
  );
}
