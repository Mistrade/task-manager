import React from 'react';

import Badge from '../Badge';
import { BreadCrumbsContainer } from './BreadCrumbs.styled';

export interface BreadCrumbsItem<T> {
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
          <Badge
            type={'primary'}
            style={{ cursor: 'pointer' }}
            onClick={() => onClick(item.value)}
          >
            {item.title}
          </Badge>
          {index !== data.length - 1 && '/'}
        </React.Fragment>
      ))}
    </BreadCrumbsContainer>
  );
}
