import { GroupModelResponse } from '@api/planning-api/types/groups.types';
import { ObjectId } from '@api/rtk-api.types';
import {
  OnChangeCurrentFnType,
  OnCloseTaskInfoFnType,
  OnSelectTaskFnType,
  PlannerMode,
} from '@planner/planner.types';
import { useAppDispatch, useAppSelector } from '@redux/hooks/hooks';
import {
  changeGroupRemoved,
  changePlanner,
} from '@redux/reducers/planner-reducer';
import { CalendarCurrentSelector } from '@selectors/calendarItems';
import { useCallback } from 'react';
import { useSearchNavigate } from './useSearchNavigate';

export interface UsePlannerReturned {
  planner: PlannerMode;
  // createEventDateState: Date | null;
  // setCreateEventDate: (
  //   value: Date | null,
  //   initialValues?: EventInfoModel | null
  // ) => void;
  onSelectTask: OnSelectTaskFnType;
  // onAddTask: OnAddTaskFnType;
  onChangePlanner: OnChangeCurrentFnType;
  onCloseEventInformer: OnCloseTaskInfoFnType;
  // onCloseCreateEventModal: (taskStatus?: EventFilterTaskStatuses) => void;
  onCloseCreateGroupModal: () => void;
  onSelectRemovedGroup: (item: GroupModelResponse | null) => void;
  groupRemoved: GroupModelResponse | null;
  // onCloneEvent: (initialValues: Partial<EventInfoModel>) => void;
  // clonedEventInfo: Partial<EventInfoModel> | null;
  // onSuccessClonedEvent: (
  //   date: Date,
  //   taskStatus: EventFilterTaskStatuses,
  //   taskId?: ObjectId
  // ) => void;
  onCreateGroup: (calendarId?: ObjectId) => void;
}

export type UsePlannerType = () => UsePlannerReturned;

export const usePlanner: UsePlannerType = () => {
  const planner = useAppSelector(CalendarCurrentSelector);
  const navigate = useSearchNavigate();
  const { groupRemoved, clonedEventInfo, statuses } = useAppSelector(
    (state) => state.planner
  );

  const dispatch = useAppDispatch();

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
      navigate(`/planner/${planner.layout}/${statuses}/info/${taskId}`);
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

  return {
    planner,
    // createEventDateState,
    // setCreateEventDate,
    onSelectTask,
    // onAddTask,
    onChangePlanner,
    onCloseEventInformer,
    // onCloseCreateEventModal,
    onCloseCreateGroupModal,
    onSelectRemovedGroup,
    groupRemoved,
    // onCloneEvent,
    clonedEventInfo,
    // onSuccessClonedEvent,
    onCreateGroup,
  };
};
