import React, { memo } from 'react';
import { css } from 'styled-components';

import { borderRadiusSize } from '@src/common/borderRadiusSize';
import { orangeColor, pageHeaderColor } from '@src/common/constants';
import { eventIsDelayed } from '@src/common/functions';

import { TimeBadge } from '@components/Badge/Badge';
import { FlexBlock } from '@components/LayoutComponents/FlexBlock';
import { Tooltip } from '@components/Tooltip/Tooltip';

import { EventInformerToggles } from '@planner/TaskInformer/Header/Toggles';
import { TaskInformerLinkButton } from '@planner/TaskInformer/SupportsComponent/TaskInformerLinkButton';
import { TaskInformerMoreActions } from '@planner/TaskInformer/SupportsComponent/TaskInformerMoreActions';
import { TaskInformerSwitchers } from '@planner/TaskInformer/SupportsComponent/TaskInformerSwitchers';
import { TaskInformerTitle } from '@planner/TaskInformer/SupportsComponent/TaskInformerTitle';
import { EventInfoUpdateFn } from '@planner/TaskInformer/SupportsComponent/ToggleTaskInformerButtons';

import { EventInfoModel } from '@api/planning-api/types/event-info.types';

export interface EventInformerHeaderProps {
  eventInfo: EventInfoModel;
  updateTaskHandler: EventInfoUpdateFn;
}

export const EventInformerHeader = memo<EventInformerHeaderProps>(
  ({ eventInfo, updateTaskHandler }) => {
    return (
      <FlexBlock
        pt={24}
        mb={12}
        pl={20}
        pr={20}
        gap={8}
        bgColor={pageHeaderColor}
        borderRadius={`${borderRadiusSize.xl} ${borderRadiusSize.xl} 0px 0px`}
        direction={'column'}
        width={'100%'}
        additionalCss={css``}
      >
        <FlexBlock
          direction={'row'}
          justify={'flex-start'}
          align={'center'}
          gap={12}
          mb={12}
        >
          <TaskInformerTitle
            title={eventInfo.title}
            onChange={async (value) => await updateTaskHandler('title', value)}
            isLiked={eventInfo.isLiked}
            onChangeLiked={async (value) =>
              await updateTaskHandler('isLiked', value)
            }
          />
          {eventIsDelayed(eventInfo.timeEnd, eventInfo.status) && (
            <Tooltip
              content={
                'Событие считается просроченным, когда текущее время становится позже даты завершения события. Сравнение происходит в минутах.'
              }
              theme={'light'}
              delay={[100, 200]}
              placement={'bottom'}
            >
              <TimeBadge style={{ backgroundColor: orangeColor }}>
                Просрочено
              </TimeBadge>
            </Tooltip>
          )}
        </FlexBlock>
        <FlexBlock
          justify={'flex-start'}
          gap={8}
          direction={'row'}
          additionalCss={css`
            z-index: 1;
          `}
        >
          <TaskInformerMoreActions
            // onClose={onClose}
            // onCloneEvent={onCloneEvent}
            // onOpenClonedEvent={onOpenClonedEvent}
            taskItem={eventInfo}
          />
          <FlexBlock maxWidth={600} width={'100%'}>
            <TaskInformerLinkButton
              link={eventInfo.link}
              updateFn={updateTaskHandler}
            />
          </FlexBlock>
        </FlexBlock>
        <EventInformerToggles
          _id={eventInfo._id}
          updateTaskHandler={updateTaskHandler}
          status={eventInfo.status}
          group={eventInfo.group}
          priority={eventInfo.priority}
        />
        <TaskInformerSwitchers />
      </FlexBlock>
    );
  },
  (prevProps, nextProps) =>
    prevProps.eventInfo._id === nextProps.eventInfo._id &&
    prevProps.eventInfo.title === nextProps.eventInfo.title &&
    prevProps.eventInfo.link === nextProps.eventInfo.link &&
    prevProps.eventInfo.priority === nextProps.eventInfo.priority &&
    prevProps.eventInfo.status === nextProps.eventInfo.status &&
    prevProps.eventInfo.isLiked === nextProps.eventInfo.isLiked &&
    prevProps.eventInfo.group?._id === nextProps.eventInfo.group?._id
);
