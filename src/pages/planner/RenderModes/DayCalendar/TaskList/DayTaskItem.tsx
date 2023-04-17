import { useAppDispatch } from '@redux/hooks/hooks';
import dayjs from 'dayjs';
import React, { FC, useCallback, useMemo } from 'react';
import { css } from 'styled-components';

import { borderRadiusSize } from '@src/common/borderRadiusSize';
import { DateHelper } from '@src/common/calendarSupport/dateHelper';
import {
  DATE_HOURS_FORMAT,
  darkColor,
  defaultColor,
  disabledColor,
  hoverColor,
  orangeColor,
  pageHeaderColor,
} from '@src/common/constants';

import { EmptyLink } from '@components/Buttons/EmptyButton.styled';
import { LikeButton } from '@components/Buttons/LikeButton';
import { UrlIcon } from '@components/Icons/SocialNetworkIcons';
import { FlexBlock } from '@components/LayoutComponents/FlexBlock';
import { Tooltip } from '@components/Tooltip/Tooltip';

import {
  EventInfoUpdateFn,
  ToggleEventCalendar,
  ToggleEventPriority,
  ToggleEventStatus,
} from '@planner/TaskInformer/SupportsComponent/ToggleTaskInformerButtons';
import { CalendarUserIndicator } from '@planner/Users/UserIndicator';
import { OnSelectTaskFnType } from '@planner/planner.types';

import { useUpdateTaskMutation } from '@api/planning-api';
import { ShortEventInfoModel } from '@api/planning-api/types/event-info.types';
import { CatchHandleForToast, thenHandleForToast } from '@api/tools';

import { CutText } from './TaskList.styled';

interface DayTaskItemProps {
  taskInfo: ShortEventInfoModel;
  tabIndex: number;
  onSelectTask?: OnSelectTaskFnType;
  day: Date;
  onDelete?: (id: string) => void;
  refetchTaskList?: () => void;
}

export const DayEventItemBoxShadowMixin = css`
  & {
    cursor: pointer;
    box-shadow: none;
    transition: box-shadow 0.3s ease-in-out;
  }

  &:hover {
    box-shadow: 0px 0px 4px ${defaultColor};
  }
`;

const DayEventItemMixin = css`
  & {
    cursor: pointer;
    box-shadow: none;
    transition: box-shadow 0.3s ease-in-out;
  }

  &:hover {
    box-shadow: 0px 0px 4px ${defaultColor};
  }

  &:not(:last-child) {
    margin-bottom: 8px;
  }
`;

export const DayTaskItem: FC<DayTaskItemProps> = ({
  taskInfo,
  tabIndex,
  // onSelectTask,
  day,
  onDelete,
  refetchTaskList,
}) => {
  const dispatch = useAppDispatch();
  const [updateTask] = useUpdateTaskMutation();

  const setTaskInfo = useCallback(() => {
    // openEventInfo(taskInfo._id);
  }, [taskInfo, day]);

  const keyPressHandler = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Enter') {
      setTaskInfo();
    }
  };

  const updateTaskHandler: EventInfoUpdateFn = useCallback(
    async (field, data) => {
      return await updateTask({
        id: taskInfo._id,
        field,
        data,
      })
        .unwrap()
        .then(thenHandleForToast)
        .catch(CatchHandleForToast);
    },
    [taskInfo._id]
  );

  const timeRenderObject = useMemo(() => {
    const start = dayjs(taskInfo.time);
    const end = dayjs(taskInfo.timeEnd);
    if (start.isSame(end, 'date')) {
      return {
        start: start.format(DATE_HOURS_FORMAT),
        end: end.format(DATE_HOURS_FORMAT),
      };
    }

    return {
      start: DateHelper.getHumanizeDateValue(start.toDate()),
      end: DateHelper.getHumanizeDateValue(end.toDate()),
    };
  }, [taskInfo]);

  return (
    <FlexBlock
      direction={'row'}
      align={'flex-start'}
      wrap={'nowrap'}
      width={'100%'}
      borderRadius={borderRadiusSize.md}
      role={'button'}
      tabIndex={tabIndex}
      bgColor={pageHeaderColor}
      border={`1px solid ${hoverColor}`}
      onKeyUp={keyPressHandler}
      onClick={setTaskInfo}
      additionalCss={css`
        ${DayEventItemMixin};
      `}
      p={'8px 12px'}
      gap={8}
    >
      <FlexBlock
        shrink={0}
        direction={'row'}
        align={'flex-start'}
        justify={'flex-start'}
        gap={6}
        height={'100%'}
      >
        <FlexBlock direction={'column'} shrink={0}>
          <CalendarUserIndicator
            withFullName={false}
            name={taskInfo.userId.name}
            surname={taskInfo.userId.surname}
            id={taskInfo.userId._id}
          />
        </FlexBlock>
      </FlexBlock>
      <FlexBlock
        direction={'row'}
        width={'100%'}
        height={'100%'}
        borderLeft={`1px solid ${disabledColor}`}
        pl={12}
      >
        <FlexBlock
          grow={10}
          gap={6}
          justify={'flex-start'}
          align={'flex-start'}
          direction={'row'}
          width={'100%'}
        >
          <FlexBlock
            width={'100%'}
            direction={'column'}
            align={'flex-start'}
            justify={'flex-start'}
            gap={12}
          >
            <FlexBlock
              width={'100%'}
              direction={'row'}
              gap={8}
              align={'flex-start'}
              wrap={'nowrap'}
            >
              <FlexBlock direction={'column'} gap={6} grow={1} shrink={0}>
                <FlexBlock
                  wrap={'wrap'}
                  additionalCss={css`
                    text-decoration: ${taskInfo.status === 'completed'
                      ? 'line-through'
                      : 'none'};
                    text-decoration-color: ${taskInfo.status === 'completed'
                      ? orangeColor
                      : '#000'};
                    text-decoration-thickness: 2px;
                    font-weight: 500;
                  `}
                >
                  <CutText fontSize={18} color={darkColor} rows={1}>
                    {taskInfo.title}
                  </CutText>
                </FlexBlock>
                <FlexBlock
                  direction={'column'}
                  gap={8}
                  onClick={(e) => e.stopPropagation()}
                >
                  <FlexBlock
                    direction={'row'}
                    gap={6}
                    wrap={'nowrap'}
                    align={'center'}
                  >
                    <Tooltip
                      content={
                        taskInfo.isLiked
                          ? 'Убрать из избранного'
                          : 'Добавить в избранное'
                      }
                    >
                      <LikeButton
                        isChecked={taskInfo.isLiked}
                        onChange={async (isChecked) => {
                          await updateTask({
                            id: taskInfo._id,
                            data: !taskInfo.isLiked,
                            field: 'isLiked',
                          });
                          // if (currentLayout === 'favorites') {
                          //   dispatch(
                          //     planningApi.util.invalidateTags(['EventsCount'])
                          //   );
                          // }
                        }}
                      />
                    </Tooltip>
                    <ToggleEventPriority
                      iconProps={{ size: 20 }}
                      stopPropagation={true}
                      renderText={false}
                      elementId={`change__priority_${taskInfo._id}_${tabIndex}`}
                      value={taskInfo.priority}
                      onChange={updateTaskHandler}
                    />
                    <ToggleEventCalendar
                      iconProps={{ size: 20 }}
                      stopPropagation={true}
                      renderText={false}
                      elementId={`change__calendar_${taskInfo._id}_${tabIndex}`}
                      value={taskInfo.group}
                      onChange={updateTaskHandler}
                    />
                    <ToggleEventStatus
                      stopPropagation={true}
                      renderText={false}
                      iconProps={{ size: 20 }}
                      elementId={`change__status_${taskInfo._id}_${tabIndex}`}
                      value={taskInfo.status}
                      onChange={updateTaskHandler}
                    />
                    {taskInfo.link?.value && (
                      <Tooltip
                        content={'Нажав на иконку вы перейдете по ссылке'}
                      >
                        <EmptyLink
                          href={taskInfo.link.value}
                          target={'_blank'}
                          rel={''}
                          onClick={(e) => e.stopPropagation()}
                        >
                          <UrlIcon name={taskInfo.link.key} size={20} />
                        </EmptyLink>
                      </Tooltip>
                    )}
                    <FlexBlock grow={1} shrink={0} align={'center'} gap={8}>
                      <span style={{ color: defaultColor, fontSize: 15 }}>
                        с{' '}
                        <span
                          style={{
                            fontWeight: 500,
                            color: darkColor,
                            fontSize: 16,
                          }}
                        >
                          {timeRenderObject.start}
                        </span>
                      </span>
                      <span style={{ color: defaultColor, fontSize: 15 }}>
                        до{' '}
                        <span
                          style={{
                            fontWeight: 500,
                            color: darkColor,
                            fontSize: 16,
                          }}
                        >
                          {timeRenderObject.end}
                        </span>
                      </span>
                    </FlexBlock>
                  </FlexBlock>
                </FlexBlock>
                {/*<FlexBlock>*/}
                {/*	<ContinueTaskButtonGroup*/}
                {/*		status={taskInfo.status}*/}
                {/*		updateFn={async (nextStatus) => {*/}
                {/*			await updateTask({field: 'status', data: nextStatus, id: taskInfo._id})*/}
                {/*			if (refetchTaskList) {*/}
                {/*				await refetchTaskList()*/}
                {/*			}*/}
                {/*		}}*/}
                {/*	/>*/}
                {/*</FlexBlock>*/}
              </FlexBlock>
            </FlexBlock>
            {taskInfo?.description && (
              <CutText rows={1}>{taskInfo.description}</CutText>
            )}
          </FlexBlock>
        </FlexBlock>
      </FlexBlock>
    </FlexBlock>
  );
};
