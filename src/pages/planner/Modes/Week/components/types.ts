import { TooltipProps } from 'chernikov-kit';

import { IFinanceSampleObject } from '@api/finance-api/types';
import { ShortEventInfoModel } from '@api/planning-api/types/event-info.types';
import { ObjectId } from '@api/rtk-api.types';

import {
  CalendarItem,
  OnSelectTaskFnType,
  RenderTaskCountType,
} from '../../../types';
import { StepByStepAnimationProps } from './styled';


export interface ITemplateWeekDayEventListProps {
  events: Array<ShortEventInfoModel>;
  date: CalendarItem;
  onSelectTask?: OnSelectTaskFnType;
  byEventsSample?: {[key: ObjectId]: IFinanceSampleObject} | null
}

export interface IWeekDayBaseEventListProps
  extends ITemplateWeekDayEventListProps {
  renderEventCount?: RenderTaskCountType;
  byEventsSample?: {[key: ObjectId]: IFinanceSampleObject} | null
}

export type TWeekDayEventListRenderModes = 'scrollable' | 'base';

export interface IWeekDayEventListProps
  extends ITemplateWeekDayEventListProps,
    IWeekDayBaseEventListProps {
  renderMode: TWeekDayEventListRenderModes;
  byEventsSample?: {[key: ObjectId]: IFinanceSampleObject} | null
}

export interface IStyledWeekDayTileProps extends StepByStepAnimationProps {
  fullHeight?: boolean; //Заполняет все доступное пространство по высоте, вместо fit-content
  isCurrentTile?: boolean; //Изменяет цвет рамки на голубой, вместо серого
}

export interface IWeekDayTileProps {
  events: Array<ShortEventInfoModel>;
  tileDate: CalendarItem;
  renderTaskCount: RenderTaskCountType;
  renderMode: TWeekDayEventListRenderModes;
  onSelectTask?: OnSelectTaskFnType;
  animationIndex?: number;
  byEventsSample?: {[key: ObjectId]: IFinanceSampleObject} | null
}

export interface IWeekDayEventItemProps {
  taskInfo: ShortEventInfoModel;
  date: CalendarItem;
  onSelect?: OnSelectTaskFnType;
  tooltipPlacement: TooltipProps['placement'] | null;
  eventSample?: IFinanceSampleObject | null
}