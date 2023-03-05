import {UserModel} from "../../session-api/session-api.types";
import {ObjectId, UtcDate} from "../../rtk-api.types";

export interface ChangeSelectGroupRequestProps extends GroupIdObject {
	state: boolean
}

export interface GroupIdObject {
	groupId: ObjectId
}

export type GroupTypes = 'Invite' | 'Custom' | 'Main'

export interface GroupModelResponse {
	_id: ObjectId,
	userId: UserModel,
	created: UtcDate,
	isSelected: boolean,
	title: string,
	editable: boolean,
	color: string,
	deletable: boolean,
	type: GroupTypes
}

export interface GetGroupsListRequestProps {
	exclude?: Array<GroupModelResponse['type']>
}

export type ArrayOfGroupModel = Array<GroupModelResponse>