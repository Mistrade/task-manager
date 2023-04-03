import React, { FC, useCallback, useContext, useMemo } from 'react';
import dayjs from 'dayjs';
import {
  planningApi,
  useUpdateTaskMutation,
} from '../../../../../store/api/planning-api';
import { FlexBlock } from '../../../../../components/LayoutComponents/FlexBlock';
import {
  borderRadiusSize,
  darkColor,
  DATE_HOURS_FORMAT,
  defaultColor,
  disabledColor,
  hoverColor,
  orangeColor,
  pageHeaderColor,
} from '../../../../../common/constants';
import { css } from 'styled-components';
import { PreviewDescription } from './TaskList.styled';
import { OnSelectTaskFnType } from '../../../planner.types';
import {
  EventInfoUpdateFn,
  ToggleEventCalendar,
  ToggleEventPriority,
  ToggleEventStatus,
} from '../../../TaskInformer/SupportsComponent/ToggleTaskInformerButtons';
import { LikeButton } from '../../../../../components/Buttons/LikeButton';
import { UrlIcon } from '../../../../../components/Icons/SocialNetworkIcons';
import { CalendarUserIndicator } from '../../../Users/UserIndicator';
import { EmptyLink } from '../../../../../components/Buttons/EmptyButton.styled';
import { useAppDispatch } from '../../../../../store/hooks/hooks';
import { DateHelper } from '../../../../../common/calendarSupport/dateHelper';
import { ShortEventInfoModel } from '../../../../../store/api/planning-api/types/event-info.types';
import { Tooltip } from '../../../../../components/Tooltip/Tooltip';
import {
  CatchHandleForToast,
  thenHandleForToast,
} from '../../../../../store/api/tools';
import { PlannerContext } from '../../../../../Context/planner.context';

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

  const {
    currentLayout,
    methods: { openEventInfo },
  } = useContext(PlannerContext);

  const setTaskInfo = useCallback(() => {
    openEventInfo(taskInfo._id);
  }, [openEventInfo, taskInfo, day]);

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
        <FlexBlock direction={'column'} shrink={0} minWidth={200} gap={6}>
          <CalendarUserIndicator
            name={taskInfo.userId.name}
            surname={taskInfo.userId.surname}
            id={taskInfo.userId._id}
          />
          <FlexBlock
            direction={'column'}
            gap={8}
            pt={6}
            borderTop={`1px solid ${disabledColor}`}
            onClick={(e) => e.stopPropagation()}
          >
            <FlexBlock direction={'row'} gap={6} wrap={'wrap'}>
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
                    if (currentLayout === 'favorites') {
                      dispatch(
                        planningApi.util.invalidateTags(['EventsCount'])
                      );
                    }
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
                <Tooltip content={'Нажав на иконку вы перейдете по ссылке'}>
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
            </FlexBlock>
          </FlexBlock>
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
              justify={'space-between'}
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
                  {taskInfo.title}
                </FlexBlock>
                <FlexBlock grow={1} shrink={0} align={'center'} gap={8}>
                  <span style={{ color: defaultColor }}>
                    с{' '}
                    <span style={{ fontWeight: 500, color: darkColor }}>
                      {timeRenderObject.start}
                    </span>
                  </span>
                  <span style={{ color: defaultColor }}>
                    до{' '}
                    <span style={{ fontWeight: 500, color: darkColor }}>
                      {timeRenderObject.end}
                    </span>
                  </span>
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
              <PreviewDescription>{taskInfo.description}</PreviewDescription>
            )}
          </FlexBlock>
        </FlexBlock>
      </FlexBlock>
    </FlexBlock>
  );
};
