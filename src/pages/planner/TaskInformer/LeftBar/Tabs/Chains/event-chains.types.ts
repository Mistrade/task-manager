import React, { ReactNode } from 'react';
import {
  EventInfoModel,
  ShortEventInfoModel,
} from '@api/planning-api/types/event-info.types';
import { EventInfoUpdateFn } from '@planner/TaskInformer/SupportsComponent/ToggleTaskInformerButtons';
import { ObjectId } from '@api/rtk-api.types';
import { UseConnectChainsOfTreeProps } from './Connect/useConnectChainsOfTree';
import { EventChainsObject } from '@api/planning-api/types/event-chains.types';

export interface ChainsAccordionProps {
  title: ReactNode;
  onClickOnAction?: () => void;
  onWrapTitle?: () => void;
  isWrap: boolean;
  content: ReactNode;
  titleBadge?: number;
}

export type ChainsEventModel = Pick<
  EventInfoModel,
  'title' | 'status' | 'priority' | '_id'
>;

export interface TaskChainItemProps {
  chainItem: ChainsEventModel;
  eventInfo?: EventInfoModel;
  updateFn?: EventInfoUpdateFn;
  suffix?: string;
  withMarginLeft?: boolean;
  bgColor?: string;
  onTitleClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void;
}

export interface EventChainItemsWrapperProps {
  children: ReactNode;
}

export interface ChildrenEventsListProps {
  eventInfo: EventInfoModel;
  title: ReactNode;
  childrenEvents: Array<ShortEventInfoModel> | null | undefined;
  onConnectClick?: () => void;
}

export interface EventSingleChainProps {
  fromTask: ShortEventInfoModel | null | undefined;
  updateFn: EventInfoUpdateFn;
  title: string;
  suffix: string;
  onConnectClick?: () => void;
}

export type ConnectChainsType =
  | 'childOf'
  | 'parentOf'
  | 'completed-after'
  | 'approved-after';

export interface ConnectChainsProps {
  taskInfo: EventInfoModel;
  onSuccess?: (taskInfo: EventInfoModel) => any;
  initialState?: ConnectChainsType | null;
  onGoBack?: () => void;
  excludeEventId?: Array<ObjectId | null | undefined>;
}

export interface ConnectChildEventsProps {
  chainsType: UseConnectChainsOfTreeProps['chainsType'];
  taskInfo: EventInfoModel;
  onSuccess: ConnectChainsProps['onSuccess'];
  excludeEventId?: Array<ObjectId | null | undefined>;
}

export interface ChainsRenderModeProps {
  eventItem: EventInfoModel;
  chains: EventChainsObject;
  onConnectChains: () => void;
}
