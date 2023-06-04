import { TooltipProps } from 'chernikov-kit';

import { ShortEventInfoModel } from '@api/planning-api/types/event-info.types';

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
}

export interface IWeekDayBaseEventListProps
  extends ITemplateWeekDayEventListProps {
  renderEventCount?: RenderTaskCountType;
}

export type TWeekDayEventListRenderModes = 'scrollable' | 'base';

export interface IWeekDayEventListProps
  extends ITemplateWeekDayEventListProps,
    IWeekDayBaseEventListProps {
  renderMode: TWeekDayEventListRenderModes;
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
}

export interface IWeekDayEventItemProps {
  taskInfo: ShortEventInfoModel;
  date: CalendarItem;
  onSelect?: OnSelectTaskFnType;
  tooltipPlacement: TooltipProps['placement'] | null;
}
