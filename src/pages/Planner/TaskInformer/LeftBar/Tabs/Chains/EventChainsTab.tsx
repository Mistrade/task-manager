import {FC, useState} from "react";
import {FlexBlock} from "../../../../../../components/LayoutComponents/FlexBlock";
import {EventSingleChain} from "./View/ViewTypes/EventSingleChain";
import {EventInfoUpdateFn} from "../../../SupportsComponent/ToggleTaskInformerButtons";
import {ChildrenEventList} from "./View/ViewTypes/ChildrenEventList";
import {ErrorScreen} from "../../../../../../components/Errors/ErrorScreen";
import {useGetEventChainsQuery} from "../../../../../../store/api/planning-api";
import {Loader} from "../../../../../../components/Loaders/Loader";
import {ScrollVerticalView} from "../../../../../../components/LayoutComponents/ScrollView/ScrollVerticalView";
import {ConnectChains} from "./Connect/ConnectChains";
import {EventInfoModel} from "../../../../../../store/api/planning-api/types/event-info.types";
import {ConnectChainsType} from "./event-chains.types";

interface EventChainsTabProps {
	taskItem: EventInfoModel,
	updateFn: EventInfoUpdateFn
}

export const EventChainsTab: FC<EventChainsTabProps> = ({taskItem, updateFn}) => {
	const [addChains, setAddChains] = useState(false)
	const [initialType, setInitialType] = useState<ConnectChainsType | null>(null)
	
	const {data: chainsObject, isFetching, refetch} = useGetEventChainsQuery(taskItem._id, {
		skip: !taskItem._id,
		pollingInterval: addChains ? undefined : 10 * 60 * 1000,
		refetchOnMountOrArgChange: true,
	})
	
	if (addChains) {
		return (
			<FlexBlock height={'100%'} width={'100%'}>
				<ConnectChains
					excludeEventId={[
						taskItem._id,
						chainsObject?.data?.parentEvent?._id || null,
						...(chainsObject?.data?.childrenEvents?.map((item) => item._id) || [])
					]}
					initialState={initialType}
					taskInfo={taskItem}
					onSuccess={() => {
						setAddChains(false)
						setInitialType(null)
						refetch()
					}}
					
					onGoBack={() => {
						setAddChains(false)
						setInitialType(null)
					}}
				/>
			</FlexBlock>
		)
	}
	
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
	
	if (!chainsObject.data?.childrenEvents?.length && !chainsObject.data?.parentEvent && !chainsObject.data?.linkedFromEvent) {
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
					action={{
						title: "Добавить связи",
						onClick: () => {
							setAddChains(true)
						}
					}}
				/>
			</FlexBlock>
		)
	}
	
	return (
		<ScrollVerticalView>
			<FlexBlock height={'100%'} direction={'column'} gap={12} justify={'flex-start'} align={'flex-start'}>
				<ChildrenEventList
					onConnectClick={() => {
						setAddChains(true)
						setInitialType('childOf')
					}}
					childrenEvents={chainsObject?.data?.childrenEvents || []}
					eventInfo={taskItem}
					updateFn={updateFn}
					title={'Вложенные:'}
				/>
				<EventSingleChain
					fromTask={chainsObject.data?.parentEvent}
					updateFn={updateFn}
					title={'Вложено в:'}
					suffix={'childOf'}
				/>
				<EventSingleChain
					fromTask={chainsObject.data?.linkedFromEvent}
					updateFn={updateFn}
					title={'Клонировано от:'}
					suffix={'cloneOf'}
				/>
			</FlexBlock>
		</ScrollVerticalView>
	)
}