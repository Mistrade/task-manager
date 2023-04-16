import { useCreateEventModal } from '@hooks/useCreateEventModal';
import React, { FC, ReactNode } from 'react';
import styled from 'styled-components';

import { defaultColor } from '@src/common/constants';

import { Button } from '@components/Buttons/Buttons.styled';
import { NotFoundIcon } from '@components/Icons/Icons';
import { FlexBlock } from '@components/LayoutComponents/FlexBlock';

import { GlobalTaskListProps } from '@planner/planner.types';


export interface NotFoundTaskProps
  extends Omit<GlobalTaskListProps, 'renderTaskCount'> {
  day: Date;
  text?: ReactNode;
  actions?: ReactNode;
}

const NotFoundTitle = styled('h2')`
  & {
    font-size: 24px;
    color: ${defaultColor};
    font-weight: 500;
    text-align: center;
    width: 100%;
    margin-bottom: 24px;
  }
`;
export const NotFoundTask: FC<NotFoundTaskProps> = ({ day, text, actions }) => {
  const { openModal } = useCreateEventModal();

  return (
    <FlexBlock
      height={400}
      minWidth={300}
      maxWidth={'100%'}
      direction={'column'}
      align={'center'}
      justify={'flex-start'}
    >
      <FlexBlock mb={12}>
        <NotFoundIcon />
      </FlexBlock>
      <NotFoundTitle>
        {text || (
          <>
            На текущую дату <br />
            ничего не найдено
          </>
        )}
      </NotFoundTitle>
      <FlexBlock direction={'column'} gap={16}>
        <Button
          onClick={() =>
            openModal(
              { time: day.toString() },
              { modalPath: 'event/create', useReturnBackOnDecline: true }
            )
          }
        >
          Создать событие
        </Button>
        {actions}
      </FlexBlock>
    </FlexBlock>
  );
};