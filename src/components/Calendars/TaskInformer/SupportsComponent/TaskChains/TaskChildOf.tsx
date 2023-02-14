import {UUID} from "../../../types";
import {FC} from "react";
import {useGetChildOfListQuery} from "../../../../../store/api/taskApi/taskApi";
import {FlexBlock} from "../../../../LayoutComponents/FlexBlock";
import {currentColor} from "../../../../../common/constants";
import {Loader} from "../../../../Loaders/Loader";
import {TaskChainItem} from "./TaskChainItem";
import {TaskInformerUpdateFn} from "../ToggleTaskInformerButtons";

interface TaskChildOfProps {
	taskId: UUID,
	updateFn: TaskInformerUpdateFn
}

export const TaskChildOf: FC<TaskChildOfProps> = ({taskId, updateFn}) => {
	const {
		data: childOfList,
		isFetching,
		isError,
		isSuccess
	} = useGetChildOfListQuery(taskId, {refetchOnMountOrArgChange: true,})
	
	
	if (childOfList?.data && childOfList.data.length > 0) {
		return (
			<FlexBlock width={'100%'} direction={'column'} gap={6}>
				<FlexBlock fSize={16} color={currentColor} pl={4} fWeight={'normal'}>
					Дочерние события:
				</FlexBlock>
				<FlexBlock direction={'column'} gap={6} width={'100%'}>
					{childOfList.data.map((item) => <TaskChainItem suffix={'parentOf'} taskChainItem={item} updateFn={updateFn}/>)}
				</FlexBlock>
			</FlexBlock>
		)
	}
	
	return <></>
}