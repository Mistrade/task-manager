import { ShortChangeCurrentPattern } from '@src/common/commonTypes';
import { currentColor } from '@src/common/constants/constants';
import { PLANNER_LAYOUTS } from '@src/common/constants/enums';

import {
  ArchiveIcon,
  CompleteIcon,
  CreatedIcon,
  ProcessIcon,
  ReviewIcon,
} from '@components/Icons/Icons';

import {
  EventFilterTaskStatuses,
  StatusesTabsObject,
} from '@planner/Filters/find-event-filters.types';
import { TaskStatusInfo, TaskStatusesType } from '@planner/types';


type TChangeDateOfPatternSignature = {
  [key in PLANNER_LAYOUTS]: {
    [key in ShortChangeCurrentPattern]: {
      method: 'subtract' | 'add';
      unit: 'day' | 'week' | 'month' | 'year';
      value: number;
    };
  };
};
export const CHANGE_DATE_OF_PATTERN_SIGNATURE: TChangeDateOfPatternSignature = {
  [PLANNER_LAYOUTS.DAY]: {
    '++': {
      method: 'add',
      unit: 'day',
      value: 1,
    },
    '+': {
      method: 'add',
      unit: 'day',
      value: 1,
    },
    today: {
      method: 'add',
      unit: 'day',
      value: 0,
    },
    '-': {
      method: 'subtract',
      unit: 'day',
      value: 1,
    },
    '--': {
      method: 'subtract',
      unit: 'day',
      value: 1,
    },
  },
  [PLANNER_LAYOUTS.WEEK]: {
    '++': {
      method: 'add',
      unit: 'week',
      value: 2,
    },
    '+': {
      method: 'add',
      unit: 'week',
      value: 1,
    },
    today: {
      method: 'add',
      unit: 'day',
      value: 0,
    },
    '-': {
      method: 'subtract',
      unit: 'week',
      value: 1,
    },
    '--': {
      method: 'subtract',
      unit: 'week',
      value: 2,
    },
  },
  [PLANNER_LAYOUTS.MONTH]: {
    '++': {
      method: 'add',
      unit: 'month',
      value: 3,
    },
    '+': {
      method: 'add',
      unit: 'month',
      value: 1,
    },
    today: {
      method: 'add',
      unit: 'day',
      value: 0,
    },
    '-': {
      method: 'subtract',
      unit: 'month',
      value: 1,
    },
    '--': {
      method: 'subtract',
      unit: 'month',
      value: 3,
    },
  },
  [PLANNER_LAYOUTS.YEAR]: {
    '++': {
      method: 'add',
      unit: 'year',
      value: 2,
    },
    '+': {
      method: 'add',
      unit: 'year',
      value: 1,
    },
    today: {
      method: 'add',
      unit: 'day',
      value: 0,
    },
    '-': {
      method: 'subtract',
      unit: 'year',
      value: 1,
    },
    '--': {
      method: 'subtract',
      unit: 'year',
      value: 2,
    },
  },
  [PLANNER_LAYOUTS.LIST]: {
    '++': {
      method: 'add',
      unit: 'day',
      value: 2,
    },
    '+': {
      method: 'add',
      unit: 'day',
      value: 1,
    },
    today: {
      method: 'add',
      unit: 'day',
      value: 0,
    },
    '-': {
      method: 'subtract',
      unit: 'day',
      value: 1,
    },
    '--': {
      method: 'subtract',
      unit: 'day',
      value: 2,
    },
  },
  [PLANNER_LAYOUTS.FAVORITES]: {
    '++': {
      method: 'add',
      unit: 'day',
      value: 0,
    },
    '+': {
      method: 'add',
      unit: 'day',
      value: 0,
    },
    today: {
      method: 'add',
      unit: 'day',
      value: 0,
    },
    '-': {
      method: 'subtract',
      unit: 'day',
      value: 0,
    },
    '--': {
      method: 'subtract',
      unit: 'day',
      value: 0,
    },
  },
};
export const URLTaskStatuses: {
  [key in EventFilterTaskStatuses]: EventFilterTaskStatuses;
} = {
  created: 'created',
  in_work: 'in_work',
  completed: 'completed',
  archive: 'archive',
  all: 'all',
};
export const TaskStatusesTitles: { [key in EventFilterTaskStatuses]: string } =
  {
    created: 'Запланировано',
    in_work: 'В работе',
    completed: 'Выполнено',
    archive: 'В архиве',
    all: 'Любой',
  };
export const TASK_STATUSES: { [key in TaskStatusesType]: TaskStatusInfo } = {
  created: {
    value: false,
    key: 'created',
    title: 'Запланировано',
    icon: <CreatedIcon size={16} />,
  },
  in_progress: {
    value: false,
    key: 'in_progress',
    title: 'В работе',
    icon: <ProcessIcon size={16} />,
  },
  review: {
    value: false,
    key: 'review',
    title: 'На проверке',
    icon: <ReviewIcon size={16} />,
  },
  completed: {
    value: true,
    key: 'completed',
    title: 'Выполнено',
    icon: <CompleteIcon size={16} />,
  },
  archive: {
    value: false,
    key: 'archive',
    title: 'В архиве',
    icon: <ArchiveIcon size={16} color={currentColor} />,
  },
};
export const TaskStatusesList: Array<StatusesTabsObject> = [
  { title: 'Все события', type: URLTaskStatuses.all },
  { title: 'Запланировано', type: URLTaskStatuses.created },
  { title: 'В работе', type: URLTaskStatuses.in_work },
  { title: 'Выполнено', type: URLTaskStatuses.completed },
  { title: 'Архив', type: URLTaskStatuses.archive },
];