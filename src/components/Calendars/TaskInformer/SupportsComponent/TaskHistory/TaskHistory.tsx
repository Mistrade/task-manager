import {FC} from "react";
import {FullResponseEventModel} from "../../../../../store/api/taskApi/types";
import {FlexBlock} from "../../../../LayoutComponents/FlexBlock";
import {EventHistoryResponseItem, useGetEventHistoryQuery} from "../../../../../store/api/taskApi/taskApi";
import {Loader} from "../../../../Loaders/Loader";
import {TaskHistoryItem} from "./TaskHistoryItem";
import {TaskHistoryFieldController} from "./Fields";
import {ErrorScreen} from "../../../../Errors/ErrorScreen";
import {ScrollVerticalView} from "../../../../ScrollView/ScrollVerticalView";


export interface TaskHistoryProps {
	taskInfo: FullResponseEventModel
}

export const TaskHistory: FC<TaskHistoryProps> = ({taskInfo}) => {
	const {data: history, isFetching, error} = useGetEventHistoryQuery(taskInfo.id, {
		refetchOnMountOrArgChange: 60,
		pollingInterval: 60 * 1000
	})
	
	if (!history?.data && isFetching) {
		return <Loader
			isActive={true}
			title={'Загрузка истории события'}
		/>
	}
	
	if (error && 'data' in error) {
		return (
			<FlexBlock
				width={'100%'}
				height={'100%'}
				justify={'center'}
				align={'center'}
			>
				<ErrorScreen
					title={"Не удалось загрузить историю события"}
					errorType={"ERR_FORBIDDEN"}
					description={error.data.info?.message || "Произошла непредвиденная ошибка"}
				/>
			</FlexBlock>
		)
	}
	
	if (!history?.data) {
		return (
			<FlexBlock
				width={'100%'}
				height={'100%'}
				justify={'center'}
				align={'center'}
			>
				<ErrorScreen
					title={"Не удалось загрузить историю события"}
					errorType={"ERR_FORBIDDEN"}
					description={"История данного события не найдена"}
				/>
			</FlexBlock>
		)
	}
	
	if (history.data.length === 0) {
		return (
			<FlexBlock
				width={'100%'}
				height={'100%'}
				justify={'center'}
				align={'center'}
			>
				<ErrorScreen
					title={"Записи не найдены"}
					errorType={"ERR_FORBIDDEN"}
					description={"Записи в истории этого события не найдены"}
				/>
			</FlexBlock>
		)
	}
	
	
	return (
		<ScrollVerticalView>
			<FlexBlock width={'100%'} height={'100%'} gap={12} direction={'column'}>
				{history.data.map((item: EventHistoryResponseItem) => (
					<TaskHistoryItem
						key={item._id}
						user={item.changeUserId}
						date={item.date}
						description={item.snapshotDescription}
					>
						<TaskHistoryFieldController historyItem={item}/>
					</TaskHistoryItem>
				))}
			</FlexBlock>
		</ScrollVerticalView>
	)
}