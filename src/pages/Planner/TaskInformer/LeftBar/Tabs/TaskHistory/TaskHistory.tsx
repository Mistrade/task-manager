import {FC} from "react";
import {FlexBlock} from "../../../../../../components/LayoutComponents/FlexBlock";
import {useGetEventHistoryQuery} from "../../../../../../store/api/planning-api";
import {Loader} from "../../../../../../components/Loaders/Loader";
import {TaskHistoryItem} from "./TaskHistoryItem";
import {TaskHistoryFieldController} from "./Fields";
import {ErrorScreen} from "../../../../../../components/Errors/ErrorScreen";
import {ScrollVerticalView} from "../../../../../../components/LayoutComponents/ScrollView/ScrollVerticalView";
import {EventInfoModel} from "../../../../../../store/api/planning-api/types/event-info.types";
import {EventHistoryQueryResult} from "../../../../../../store/api/planning-api/types/event-history.types";
import dayjs from "dayjs";


export interface TaskHistoryProps {
	taskInfo: EventInfoModel
}

export const TaskHistory: FC<TaskHistoryProps> = ({taskInfo}) => {
	const {data: history, isFetching, error} = useGetEventHistoryQuery(taskInfo._id, {
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
		<ScrollVerticalView renderPattern={'top-bottom'}>
			<FlexBlock width={'100%'} gap={12} direction={'column'}>
				{history.data.map((item: EventHistoryQueryResult) => (
					<TaskHistoryItem
						key={item._id}
						user={item.changeUserId}
						date={dayjs(item.date).toDate()}
						description={item.snapshotDescription}
					>
						<TaskHistoryFieldController historyItem={item}/>
					</TaskHistoryItem>
				))}
			</FlexBlock>
		</ScrollVerticalView>
	)
}