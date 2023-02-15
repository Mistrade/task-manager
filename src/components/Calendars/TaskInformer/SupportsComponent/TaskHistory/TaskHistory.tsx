import {FC} from "react";
import {FullResponseEventModel} from "../../../../../store/api/taskApi/types";
import {FlexBlock} from "../../../../LayoutComponents/FlexBlock";
import {useGetEventHistoryQuery} from "../../../../../store/api/taskApi/taskApi";
import {Loader} from "../../../../Loaders/Loader";


export interface TaskHistoryProps {
	taskInfo: FullResponseEventModel
}

export const TaskHistory: FC<TaskHistoryProps> = ({taskInfo}) => {
	const {data: history, isFetching} = useGetEventHistoryQuery(taskInfo.id, {refetchOnMountOrArgChange: true})
	
	if(isFetching) {
		return <Loader
			isActive={true}
			title={'Загрузка истории события'}
		/>
	}
	
	if(!history?.data){
		return <FlexBlock width={'100%'}>
			Не удалось найти историю события
		</FlexBlock>
	}
	
	if(history.data.length === 0){
		return <FlexBlock width={'100%'}>
			Не удалось найти историю события
		</FlexBlock>
	}
	
	
	return (
		<FlexBlock width={'100%'} gap={6} direction={'column'}>
			{history.data.map((item: any) => (
				<FlexBlock>
					{item.fieldName} - {item.description}
				</FlexBlock>
			))}
		</FlexBlock>
	)
}