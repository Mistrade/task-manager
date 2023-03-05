import {useParams} from "react-router";
import {CreateOrUpdateGroupModal} from "./CreateOrUpdateGroup";
import {FC} from "react";
import {UpdateGroupInfoMiddleware} from "./UpdateGroupInfoMiddleware";
import {ChangeGroupHockProps} from "./groups.types";

export const UpdateGroupInfoHock: FC<ChangeGroupHockProps> = ({onClose}) => {
	const {groupId} = useParams<{ groupId?: string }>()
	
	
	if (groupId) {
		return (
			<UpdateGroupInfoMiddleware
				onClose={onClose}
				groupId={groupId}
			/>
		)
	}
	
	return (
		<CreateOrUpdateGroupModal
			onClose={onClose}
		/>
	)
}