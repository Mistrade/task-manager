import { CompleteIcon } from '@components/Icons/Icons';
import { TelegramLogoIcon } from '@components/Icons/SocialNetworkIcons/Telegram';
import { TwoPeopleIcon } from '@components/Icons/UserIcons/UserIcons';
import { EventFilterTaskStatuses } from '@planner/Filters/find-event-filters.types';
import { CalendarPriorityKeys, TaskStatusesType } from '@planner/types';
import {
  FRIEND_REQUESTS_TYPES,
  FRIENDS_ROUTES,
  PLANNER_LAYOUTS,
  SERVICES_NAMES,
} from '@src/common/constants/enums';
import { kitColors } from 'chernikov-kit';
import dayjs from 'dayjs';
import { ReactNode } from 'react';


export const DATE_RENDER_FORMAT = 'DD-MM-YYYY HH:mm';
export const DATE_RENDER_FORMAT_WITH_SEC = 'DD-MM-YYYY HH:mm:ss';
export const DATE_HOURS_FORMAT = 'HH:mm';
export const DATE_HOURS_MINUTES_SECONDS_FORMAT = 'HH:mm:ss';
export const DEFAULT_EVENT_STATUS: TaskStatusesType = 'created';
export const DEFAULT_EVENT_PRIORITY: CalendarPriorityKeys = 'medium';
export const DEFAULT_PLANNER_LAYOUT: PLANNER_LAYOUTS = PLANNER_LAYOUTS.DAY;
export const DEFAULT_PLANNER_STATUS: EventFilterTaskStatuses = 'all';
export const DEFAULT_CHECKLIST_TITLE = 'Чек-лист';

export const UTC_OFFSET = dayjs().utcOffset();
export const FRIENDS_ROUTES_PAGE_NAMES: {
  [key in FRIENDS_ROUTES]: {
    title: string;
    icon: ReactNode;
    path: string;
    matchEndPath: boolean;
  };
} = {
  my_friends: {
    title: 'Мои друзья',
    icon: <TwoPeopleIcon size={24} />,
    path: `/${SERVICES_NAMES.FRIENDS}`,
    matchEndPath: true,
  },
  outgoing: {
    title: 'Заявки',
    icon: <TelegramLogoIcon size={24} color={kitColors.primary} />,
    path: `/${SERVICES_NAMES.FRIENDS}/${FRIENDS_ROUTES.OUTGOING_REQUESTS}`,
    matchEndPath: false,
  },
  incoming: {
    title: 'Входящие заявки',
    icon: <CompleteIcon size={24} color={kitColors.primary} />,
    path: `/${SERVICES_NAMES.FRIENDS}/${FRIENDS_ROUTES.INCOMING_REQUESTS}`,
    matchEndPath: false,
  },
};
export const FRIENDS_PAGE_TITLES = {
  [FRIEND_REQUESTS_TYPES.OUTGOING]: 'Исходящие заявки в друзья',
  [FRIEND_REQUESTS_TYPES.INCOMING]: 'Входящие заявки в друзья',
};
export const SERVICES_TITLES: { [key in SERVICES_NAMES]: string } = {
  [SERVICES_NAMES.PLANNER]: 'Мои дела',
  [SERVICES_NAMES.FRIENDS]: 'Мои друзья',
  [SERVICES_NAMES.FAQ]: 'База знаний',
  [SERVICES_NAMES.PROFILE]: 'Профиль пользователя',
  [SERVICES_NAMES.SESSION]: 'Сессия',
};