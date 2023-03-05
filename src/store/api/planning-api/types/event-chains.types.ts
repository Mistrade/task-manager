import {ObjectId} from "../../rtk-api.types";
import {ShortEventInfoModel} from "./event-info.types";

export interface EventChainsObject {
	parentEvent: null | ShortEventInfoModel,
	childrenEvents: null | Array<ShortEventInfoModel>,
	linkedFromEvent: null | ShortEventInfoModel
}

export interface AddEventChildOfProps {
	chainType: "childOf",
	taskId: ObjectId,
	eventsToAdd: Array<ObjectId>
}

export interface AddEventParentIdProps {
	chainType: 'parentId',
	taskId: ObjectId,
	eventToAdd: ObjectId
}

export type AddChainsRequestData = AddEventChildOfProps | AddEventParentIdProps