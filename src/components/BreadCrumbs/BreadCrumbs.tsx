import { BreadCrumbsContainer } from './BreadCrumbs.styled';
import { TimeBadge } from '../Badge/Badge';
import React from 'react';

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
        <React.Fragment>
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
