import React, {ReactNode} from "react";
import {EventInfoModel, ShortEventInfoModel} from "../../../../../../store/api/planning-api/types/event-info.types";
import {EventInfoUpdateFn} from "../../../SupportsComponent/ToggleTaskInformerButtons";
import {ObjectId} from "../../../../../../store/api/rtk-api.types";

export interface ChainsAccordionProps {
	title: ReactNode,
	onClickOnAction?: () => void,
	onWrapTitle?: () => void,
	isWrap: boolean,
	content: ReactNode,
	titleBadge?: number
}

export type ChainsEventModel = Pick<EventInfoModel, 'title' | "status" | "priority" | "_id">

export interface TaskChainItemProps {
	chainItem: ChainsEventModel,
	eventInfo?: EventInfoModel,
	updateFn?: EventInfoUpdateFn,
	suffix?: string,
	withMarginLeft?: boolean,
	bgColor?: string,
	onTitleClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void
}

export interface EventChainItemsWrapperProps {
	wrapState: boolean,
	children: ReactNode
}

export interface ChildrenEventsListProps {
	eventInfo: EventInfoModel,
	updateFn: EventInfoUpdateFn,
	title: string,
	childrenEvents: Array<ShortEventInfoModel> | null | undefined,
	onConnectClick?: () => void
}

export interface EventSingleChainProps {
	fromTask: ShortEventInfoModel | null | undefined,
	updateFn: EventInfoUpdateFn,
	title: string,
	suffix: string
}

export type ConnectChainsType = "childOf" | "parentOf"

export interface ConnectChainsProps {
	taskInfo: EventInfoModel,
	onSuccess?: (taskInfo: EventInfoModel) => any,
	initialState?: ConnectChainsType | null,
	onGoBack?: () => void,
	excludeEventId?: Array<ObjectId | null | undefined>
}

export interface ConnectChildEventsProps {
	taskInfo: EventInfoModel,
	onSuccess: ConnectChainsProps['onSuccess'],
	excludeEventId?: Array<ObjectId | null | undefined>
}