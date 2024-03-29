import { IPlannerDate } from '@planner-reducer/types';
import { TooltipProps } from 'chernikov-kit';
import React, { CSSProperties, FC, ReactNode } from 'react';

import { DateScopeInterface } from '@src/common/calendarSupport/scopes';
import { EVENT_ACCESS_RIGHTS } from '@src/common/constants/enums';

import { DatePickerSwitchProps } from '@components/DatePicker/DatePickerSwitch';
import { DefaultTextInputProps } from '@components/Input/TextInput/TextInput';
import { FlexBlockProps } from '@components/LayoutComponents/FlexBlock';

import {
  IFinanceOperation,
  IFinanceSampleObject,
} from '@api/finance-api/types';
import {
  IGetEventInfoResponse,
  ShortEventInfoModel,
} from '@api/planning-api/types/event-info.types';
import { ObjectId } from '@api/rtk-api.types';
import { UserModel } from '@api/session-api/session-api.types';

import { TWeekDayEventListRenderModes } from './Modes/Week/components/types';


export type FCWithChildren<T = any> = FC<{ children?: ReactNode } & T>;

export interface DatePickerProps {
  onClear?: () => void;
  useOtherDays?: boolean;
  onFocus?: (e: React.FocusEvent<HTMLInputElement>) => void;
  onChange?: (date: Date | null) => void;
  currentDate: Date | null;
  label?: ReactNode;
  containerProps?: FlexBlockProps;
  isDirty?: boolean;
  errorMessage?: string;
  icon?: ReactNode;
  actionHandler?: DefaultTextInputProps['actionHandler'];
  actions?: DefaultTextInputProps['actions'];
  iconPlacement?: DefaultTextInputProps['iconPlacement'];
  disabledOptions?: CalendarDisabledOptions;
  useForceUpdateValue?: boolean;
  onDecline?: () => void;
  placeholder?: string;
  placement?: TooltipProps['placement'];
  inputId?: string;
  isDisabled?: boolean;
  style?: CSSProperties;
  withArrow?: boolean;
}

export interface GlobalTaskListProps {
  // onAddTask?: OnAddTaskFnType;
  renderTaskCount?: RenderTaskCountType;
}

export interface YearCalendarProps {}

export interface MonthCalendarProps extends GlobalTaskListProps {}

export interface ListCalendarModeProps {}

export interface FavoritesCalendarModeProps {}

export interface WeekItemProps extends Omit<MonthCalendarProps, 'monthItem'> {
  config: WeekItem;
  taskStorage: EventsStorage;
  animationIndex?: number;
  renderMode: TWeekDayEventListRenderModes;
  byEventsSample?: {[key: ObjectId]: IFinanceSampleObject} | null
}
export type RenderTaskCountType = number | 'all';

export interface CalendarCellProps extends GlobalTaskListProps {
  isVisible?: boolean;
  value: CalendarItem;
  tasks?: Array<ShortEventInfoModel>;
  onSelectTask?: OnSelectTaskFnType;
  onClickToDate?: (date: CalendarItem) => void;
}

export type OnSelectDateFromCalendarFn = (data: CalendarItem) => void;

export interface DaySettingsPanelProps {}

export interface SmallCalendarMonthTitleProps
  extends Partial<DatePickerSwitchProps> {
  monthItem: MonthItem;
  onClick?: (monthItem: MonthItem) => void;
  renderYear?: boolean;
  isCurrentMonth?: boolean;
}

export type CalendarList = Array<CalendarItem>;
export type CalendarWeekList = Array<WeekItem>;
export type CalendarMonthList = Array<MonthItem>;
export type WeekItem = {
  stateDate: IPlannerDate;
  weekOfYear: number;
  month: number;
  year: number;
  days: Array<CalendarItem>;
  scope: TLayoutItemsScope;
};

export type MonthItem = {
  stateDate: IPlannerDate;
  monthOfYear: number;
  year: number;
  weeks: Array<WeekItem>;
  scope: TLayoutItemsScope;
};

export type CalendarCurrentContext = {
  year: number;
  month?: number;
  week?: number;
};

export type TLayoutItemsScope = Record<keyof DateScopeInterface, IPlannerDate>;

export type YearItem = {
  stateDate: IPlannerDate;
  year: number;
  months: Array<MonthItem>;
  scope: TLayoutItemsScope;
};

export interface CalendarItem {
  value: IPlannerDate;
  meta: CalendarItemMetaData;
}

export interface CalendarItemMetaData {
  isToday: boolean;
  isTomorrow: boolean;
  isYesterday: boolean;
  isDisabled: boolean;
  isCurrent: boolean;
}

export interface CalendarDisabledOptions {
  min?: Date;
  max?: Date;
  includeMin?: boolean;
  includeMax?: boolean;
  excludeWeekends?: boolean;
  disableDates?: Array<Date>;
}

export type CalendarPriorityKeys =
  | 'veryLow'
  | 'low'
  | 'medium'
  | 'high'
  | 'veryHigh'
  | 'not_selected';

export type UUID = string;
export type TaskStatusesType =
  | 'completed'
  | 'created'
  | 'in_progress'
  | 'review'
  | 'archive';

export interface ICheckListItem {
  _id: ObjectId;
  title: string;
  state: boolean;
  eventLink: ObjectId | null;
}

export enum EVENT_WIDGET_MODEL_MAP {
  'FINANCE' = 'FinanceOperation',
}

export interface IEventFinanceWidget {
  modelName: EVENT_WIDGET_MODEL_MAP.FINANCE;
  model: ObjectId;
  fromEvent: ObjectId;
}

export interface IPopulatedEventFinanceWidget {
  modelName: EVENT_WIDGET_MODEL_MAP.FINANCE;
  model: IFinanceOperation | null;
  fromEvent: ObjectId;
}

export type TEventWidgetSources = IEventFinanceWidget;

export type TPopulatedEventWidgetSource = IPopulatedEventFinanceWidget;

export interface IEventWidgetModelBase  extends  TEventWidgetSources{
  title: string;
  message?: string;
}

export interface IEventWidget extends IEventWidgetModelBase {
  eventId: ObjectId;
  createdAt: Date;
  _id: ObjectId;
}

export interface IPopulatedEventWidget extends Omit<IEventWidget, keyof TEventWidgetSources>, TPopulatedEventWidgetSource {
}

export type CreateEventRequestData = Omit<CreateEventDataObject, 'members' | 'widget'> & {
  members: Array<UserModel>;
  widget?: IEventWidgetModelBase
};

export interface IEventSystemDescriptionBase {
  message?: string;
  title: string;
  modelId: ObjectId;
}

export interface IEventSystemDescriptionByFinanceOperation
  extends IEventSystemDescriptionBase {
  model: EVENT_WIDGET_MODEL_MAP.FINANCE;
  data: IFinanceOperation
  fromEvent: ObjectId;
}

export type TEventSystemDescription = IEventSystemDescriptionByFinanceOperation;

export interface CreateEventDataObject {
  linkedFrom?: UUID;
  parentId?: UUID;
  title: string;
  description: string;
  priority: CalendarPriorityKeys;
  time: Date;
  timeEnd: Date;
  status: TaskStatusesType;
  members: TaskMembersListType;
  link: EventLinkItem | null;
  group: ObjectId;
  attachCheckList: boolean;
  checkList: {
    title: string;
    data: Array<ICheckListItem>;
  };
  widget?: TEventSystemDescription;
}

export type CalendarPriorityList = Array<{
  type: CalendarPriorityKeys;
  title: string;
}>;

export interface EventLinkItem {
  key: string;
  value: string;
}

export type EventItem = Omit<CreateEventDataObject, 'time' | 'timeEnd'> & {
  time: string;
  timeEnd: string;
  lastChange: string;
  history: Array<EventHistoryItem>;
};

export type EventHistoryFields = Omit<
  EventItem,
  '_id' | 'linkedFrom' | 'userId' | 'lastChange' | 'history'
>;

export interface EventHistoryItem<
  T extends keyof EventHistoryFields = keyof EventHistoryFields
> {
  date: string;
  field: T;
  description: string;
  userId: UserModel;
  oldValue: EventHistoryFields[T];
  newValue: EventHistoryFields[T];
}

export interface SelectBooleanInputDataItem {
  value: boolean;
  title: string;
  icon?: ReactNode;
  isDisabled?: boolean;
}

export interface TaskStatusInfo extends SelectBooleanInputDataItem {
  key: TaskStatusesType;
}

export interface ICreateEventMemberItem {
  accessRight: EVENT_ACCESS_RIGHTS;
  user: UserModel;
}

//TODO
export type TaskMembersListType = { [key in ObjectId]: UserModel };

export type CustomObject<T = any> = { [key in string]: T };

export type EventsStorage<EVENT = ShortEventInfoModel> = CustomObject<
  EventsStorageYear<EVENT>
>;
export type EventsStorageYear<EVENT = ShortEventInfoModel> = CustomObject<
  EventsStorageMonth<EVENT>
>;
export type EventsStorageMonth<EVENT = ShortEventInfoModel> = CustomObject<
  EventsStorageDate<EVENT>
>;
export type EventsStorageDate<EVENT = ShortEventInfoModel> = Array<EVENT>;

export interface EventInformerProps extends EventInfoModalProps {
  eventInfo: IGetEventInfoResponse | null;
  eventErrorInfo?: string;
}

export interface EventInfoBaseProps {
  eventInfo: IGetEventInfoResponse;
}

export type MainEventInformerProps = EventInfoBaseProps & EventInfoModalProps;

export interface EventInfoModalProps {
  onClose?: () => void;
}

export interface CreateEventModalProps {
  onSuccess?: (eventId: string) => void;
  onClose?: () => void;
}

export interface PlannerYearMode {
  layout: 'year';
  year: number;
}

export interface PlannerMonthMode {
  layout: 'month';
  month: number;
  year: number;
}

export interface PlannerWeekMode {
  layout: 'week';
  aroundDate: Date;
}

export interface PlannerDateMode {
  layout: 'day';
  date: Date;
}

export interface PlannerListMode {
  layout: 'list';
  fromDate: Date;
  toDate: Date;
}

export interface PlannerFavoritesMode {
  layout: 'favorites';
}

export type PlannerMode =
  | PlannerYearMode
  | PlannerMonthMode
  | PlannerWeekMode
  | PlannerDateMode
  | PlannerListMode
  | PlannerFavoritesMode;

export interface DateItem {
  current: PlannerDateMode;
  settingPanel: DateSettingPanelOptions;
}

export interface DateSettingPanelOptions {
  monthItem: MonthItem;
  monthCurrent: PlannerMonthMode;
}

export type OnSelectTaskFnType = (taskId: string) => any;