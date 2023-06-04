import { FinanceOperationSystemDescription } from './modules/FinanceOperation';
import { TEventSystemDescription } from '@planner/types';
import { FC } from 'react';


export interface EventSystemDescriptionProps {
  data: TEventSystemDescription;
}

export const EventSystemDescription: FC<EventSystemDescriptionProps> = ({
  data,
}) => {
  switch (data.model) {
    case 'FinanceOperation':
      return (
        <FinanceOperationSystemDescription
          data={data.data}
          title={data.title}
          _id={data.modelId}
          message={data.message}
          fromEventId={data.fromEvent}
        />
      );
  }
};