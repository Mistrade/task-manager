import {
  OnAddTaskFnType,
  OnChangeCurrentFnType,
  OnCloseTaskInfoFnType,
  OnSelectTaskFnType,
  PlannerMode,
} from '../pages/Planner/planner.types';
import { useCallback, useMemo } from 'react';
import { useAppDispatch, useAppSelector } from '../store/hooks/hooks';
import {
  changeDateOfCreateEvent,
  changeEventStatuses,
  changeGroupRemoved,
  changePlanner,
  setClonedParentEvent,
} from '../store/reducers/planner-reducer';
import { CalendarCurrentSelector } from '../store/selectors/calendarItems';
import dayjs from 'dayjs';
import { toast } from 'react-toastify';
import { useSearchNavigate } from './useSearchNavigate';
import { EventInfoModel } from '../store/api/planning-api/types/event-info.types';
import { ObjectId } from '../store/api/rtk-api.types';
import { EventFilterTaskStatuses } from '../pages/Planner/RenderModes/FindEventFilter/find-event-filters.types';
import { GroupModelResponse } from '../store/api/planning-api/types/groups.types';

export interface UsePlannerReturned {
  planner: PlannerMode;
  createEventDateState: Date | null;
  setCreateEventDate: (
    value: Date | null,
    initialValues?: EventInfoModel | null
  ) => void;
  onSelectTask: OnSelectTaskFnType;
  onAddTask: OnAddTaskFnType;
  onChangePlanner: OnChangeCurrentFnType;
  onCloseEventInformer: OnCloseTaskInfoFnType;
  onCloseCreateEventModal: (taskStatus?: EventFilterTaskStatuses) => void;
  onCloseCreateGroupModal: () => void;
  onSelectRemovedGroup: (item: GroupModelResponse | null) => void;
  groupRemoved: GroupModelResponse | null;
  onCloneEvent: (initialValues: Partial<EventInfoModel>) => void;
  clonedEventInfo: Partial<EventInfoModel> | null;
  onSuccessClonedEvent: (
    date: Date,
    taskStatus: EventFilterTaskStatuses,
    taskId?: ObjectId
  ) => void;
  onCreateGroup: (calendarId?: ObjectId) => void;
}

export type UsePlannerType = () => UsePlannerReturned;

export const usePlanner: UsePlannerType = () => {
  const planner = useAppSelector(CalendarCurrentSelector);
  const navigate = useSearchNavigate();
  const { groupRemoved, dateOfCreateEvent, clonedEventInfo, statuses } =
    useAppSelector((state) => state.planner);

  const dispatch = useAppDispatch();

  const setCreateEventDate = useCallback(
    (value: Date | null, initialValues?: Partial<EventInfoModel> | null) => {
      const date = dayjs(value);
      if (date.isValid()) {
        dispatch(changeDateOfCreateEvent(date.toString()));
        dispatch(setClonedParentEvent(initialValues || null));
        return;
      }

      return dispatch(changeDateOfCreateEvent(null));
    },
    []
  );

  const createEventDateState: Date | null = useMemo(() => {
    const date = dayjs(dateOfCreateEvent);

    if (date.isValid()) {
      return date.toDate();
    }

    return null;
  }, [dateOfCreateEvent]);

  const onCreateGroup: UsePlannerReturned['onCreateGroup'] = useCallback(
    (calendarId) => {
      const defaultPath = `/planner/${planner.layout}/${statuses}/group`;
      navigate(calendarId ? `${defaultPath}/${calendarId}` : defaultPath);
    },
    [statuses, planner.layout]
  );

  const onSelectRemovedGroup = useCallback(
    (item: GroupModelResponse | null) => {
      dispatch(changeGroupRemoved(item));
    },
    [groupRemoved, planner.layout]
  );

  const onCloseCreateGroupModal = useCallback(() => {
    return navigate(`/planner/${planner.layout}/${statuses}`);
  }, [planner.layout, statuses]);

  const onSelectTask: OnSelectTaskFnType = useCallback(
    (taskId: string) => {
      navigate(`/planner/${planner.layout}/${statuses}/info/${taskId}/about`);
    },
    [planner.layout, statuses]
  );

  const onAddTask: OnAddTaskFnType = useCallback(
    (date, initialValues) => {
      navigate(`/planner/${planner.layout}/${statuses}/create`);
      setCreateEventDate(date, initialValues || null);
    },
    [planner.layout, statuses]
  );

  const onChangePlanner: UsePlannerReturned['onChangePlanner'] = useCallback(
    (date, l) => {
      navigate(`/planner/${l}/${statuses}`, { replace: true });
      if ('fromDate' in date || 'toDate' in date) {
        dispatch(
          changePlanner({
            layout: date.layout,
            date: {
              layout: date.layout,
              fromDate: date.fromDate.toString(),
              toDate: date.toDate.toString(),
            },
          })
        );
      } else {
        dispatch(changePlanner({ layout: l, date: date.toString() }));
      }
    },
    [statuses]
  );

  const onCloseEventInformer = useCallback(() => {
    navigate(`/planner/${planner.layout}/${statuses}`, { replace: true });
  }, [planner.layout, statuses]);

  const onCloseCreateEventModal = useCallback(
    (taskStatus?: EventFilterTaskStatuses, taskId?: ObjectId) => {
      setCreateEventDate(null, null);
      const defaultPath = `/planner/${planner.layout}/${
        taskStatus || statuses
      }`;
      navigate(taskId ? `${defaultPath}/info/${taskId}/about` : defaultPath, {
        replace: true,
      });
    },
    [planner.layout, statuses]
  );

  const onCloneEvent = useCallback(
    (event: Partial<EventInfoModel>) => {
      const date = dayjs(event.time);
      if (date.isValid()) {
        onAddTask(dayjs(event.time).toDate(), event);
      } else {
        toast('Не удалось клонировать событие', { type: 'warning' });
      }
    },
    [statuses, planner.layout]
  );

  const onSuccessClonedEvent: UsePlannerReturned['onSuccessClonedEvent'] =
    useCallback(
      (date, taskStatus, taskId) => {
        dispatch(changeEventStatuses(taskStatus));
        dispatch(
          changePlanner({ layout: planner.layout, date: date.toString() })
        );
        onCloseCreateEventModal(taskStatus, taskId);
      },
      [planner.layout]
    );

  return {
    planner,
    createEventDateState,
    setCreateEventDate,
    onSelectTask,
    onAddTask,
    onChangePlanner,
    onCloseEventInformer,
    onCloseCreateEventModal,
    onCloseCreateGroupModal,
    onSelectRemovedGroup,
    groupRemoved,
    onCloneEvent,
    clonedEventInfo,
    onSuccessClonedEvent,
    onCreateGroup,
  };
};
