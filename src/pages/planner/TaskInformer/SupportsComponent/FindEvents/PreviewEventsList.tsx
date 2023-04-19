import { FC, ReactNode } from 'react';

import { FlexBlock } from '@components/LayoutComponents';

import { EventListFromArray, EventListFromArrayProps } from './EventsList';


export interface PreviewEventsListProps extends EventListFromArrayProps {
  buttons?: ReactNode;
  title?: ReactNode;
  gap?: number;
}

export const PreviewEventsList: FC<PreviewEventsListProps> = ({
  buttons,
  title,
  gap,
  ...eventListFromArrayProps
}) => {
  return (
    <FlexBlock grow={3} direction={'column'} width={'100%'} overflow={'hidden'}>
      <FlexBlock
        height={'100%'}
        width={'100%'}
        direction={'column'}
        gap={gap || 12}
        pt={6}
        pb={6}
        pl={4}
        pr={4}
      >
        {title}
        <FlexBlock
          grow={3}
          width={'100%'}
          direction={'column'}
          overflow={'hidden'}
        >
          <EventListFromArray {...eventListFromArrayProps} />
        </FlexBlock>
        <FlexBlock
          direction={'row'}
          width={'100%'}
          justify={'flex-end'}
          gap={12}
          grow={0}
        >
          {buttons}
        </FlexBlock>
      </FlexBlock>
    </FlexBlock>
  );
};