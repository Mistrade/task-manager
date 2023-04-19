import { UseConnectChainsOfTreeProps } from '@hooks/useConnectChainsOfTree';
import { ReactNode } from 'react';

import { EventChainsObject } from '@api/planning-api/types/event-chains.types';
import {
  EventInfoModel,
  ShortEventInfoModel,
} from '@api/planning-api/types/event-info.types';
import { ObjectId } from '@api/rtk-api.types';

export interface EventChainItemsWrapperProps {
  children: ReactNode;
}

export interface ChildrenEventsListProps {
  title: ReactNode;
  childrenEvents: Array<ShortEventInfoModel> | null | undefined;
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
