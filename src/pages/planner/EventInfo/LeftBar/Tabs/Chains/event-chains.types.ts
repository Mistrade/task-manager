import { EventChainsObject } from '@api/planning-api/types/event-chains.types';
import {
  EventInfoModel,
  ShortEventInfoModel,
} from '@api/planning-api/types/event-info.types';
import { ObjectId } from '@api/rtk-api.types';
import { UseConnectChainsOfTreeProps } from '@hooks/useConnectChainsOfTree';
import { ReactNode } from 'react';


export interface EventChainItemsWrapperProps {
  children: ReactNode;
}

export interface ChildrenEventsListProps {
  childrenEvents: Array<ShortEventInfoModel> | null | undefined;
  emptyComponent?: ReactNode;
}

export type ConnectChainsType =
  | 'childOf'
  | 'parentOf'
  | 'completed-after'
  | 'approved-after';

export enum EVENT_DEPENDENCIES_MAP {
  'CHILD_OF' = 'childOf',
  'PARENT_OF' = 'parentOf',
  'LINKED_FROM' = 'linked_from',
  'ALL' = 'all',
}

export interface ConnectChainsProps {
  taskInfo: EventInfoModel;
  onSuccess?: (taskInfo: EventInfoModel) => any;
  initialState?: EVENT_DEPENDENCIES_MAP | null;
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