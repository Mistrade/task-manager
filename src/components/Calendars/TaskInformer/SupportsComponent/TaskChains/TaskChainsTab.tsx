import {FC, useMemo} from "react";
import {FlexBlock} from "../../../../LayoutComponents/FlexBlock";
import {UUID} from "../../../types";
import {TaskSingleChain} from "./ClonedBy";
import {TaskInformerUpdateFn} from "../ToggleTaskInformerButtons";
import {FullResponseEventModel} from "../../../../../store/api/taskApi/types";
import {TaskChildOf} from "./TaskChildOf";
import {ErrorScreen} from "../../../../Errors/ErrorScreen";
import {useGetEventChainsQuery} from "../../../../../store/api/taskApi/taskApi";
import {Loader} from "../../../../Loaders/Loader";

interface TaskChainsTabProps {
	taskItem: FullResponseEventModel,
	updateFn: TaskInformerUpdateFn
}

export const TaskChainsTab: FC<TaskChainsTabProps> = ({taskItem, updateFn}) => {
	const {data: chainsObject, isFetching} = useGetEventChainsQuery(taskItem.id, {
		skip: !taskItem.id,
		pollingInterval: 10 * 60 * 1000,
		refetchOnMountOrArgChange: true,
	})
	
	if (!chainsObject && isFetching) {
		return (
			<FlexBlock
				width={'100%'}
				height={'100%'}
				justify={'center'}
				align={'center'}
			>
				<Loader
					isActive={true}
					title={'Ищем связи события...'}
				/>
			</FlexBlock>
		)
	}
	
	if (!chainsObject) {
		return (
			<FlexBlock width={'100%'} height={'100%'} justify={'center'} align={'center'}>
				<ErrorScreen
					title={'Связи не найдены'}
					errorType={'SYSTEM_ERROR'}
					description={"Не удалось найти связи с другими событиями"}
				/>
			</FlexBlock>
		)
	}
	
	if (!chainsObject.data?.childrenEvents && !chainsObject.data?.parentEvent && !chainsObject.data?.linkedFromEvent) {
		return (
			<FlexBlock
				width={'100%'}
				height={'100%'}
				justify={'center'}
				align={'center'}
			>
				<ErrorScreen
					title={'Событие не связано с другими'}
					errorType={'ERR_FORBIDDEN'}
					description={"Это событие пока что не связано с другими событиями!"}
				/>
			</FlexBlock>
		)
	}
	
	return (
		<FlexBlock direction={'column'} gap={12} justify={'flex-start'} align={'flex-start'}>
			<TaskChildOf
				childOfList={chainsObject?.data?.childrenEvents || []}
				taskInfo={taskItem}
				updateFn={updateFn}
				title={'Вложенные:'}
			/>
			<TaskSingleChain
				fromTask={chainsObject.data?.parentEvent}
				updateFn={updateFn}
				title={'Вложено в:'}
				suffix={'childOf'}
			/>
			<TaskSingleChain
				fromTask={chainsObject.data?.linkedFromEvent}
				updateFn={updateFn}
				title={'Клонировано от:'}
				suffix={'cloneOf'}
			/>
		</FlexBlock>
	)
}