import {FindEvents, FindEventsProps} from "../../../../../SupportsComponent/FindEvents/FindEvents";
import {FC, useCallback, useEffect, useState} from "react";
import {EmptyButtonStyled} from "../../../../../../../../components/Buttons/EmptyButton.styled";
import {FlexBlock} from "../../../../../../../../components/LayoutComponents/FlexBlock";
import {Heading} from "../../../../../../../../components/Text/Heading";
import {Badge} from "../../../../../../../../components/Badge/Badge";
import {ButtonWithLoading} from "../../../../../../../../components/Buttons/ButtonWithLoading";
import {PreviewEventsList} from "../../../../../SupportsComponent/FindEvents/PreviewEventsList";
import {useConnectChainsMutation} from "../../../../../../../../store/api/planning-api";
import {toast} from "react-toastify";
import {ShortEventInfoModel} from "../../../../../../../../store/api/planning-api/types/event-info.types";
import {MyServerResponse, ObjectId} from "../../../../../../../../store/api/rtk-api.types";
import {ConnectChildEventsProps} from "../../event-chains.types";

export const ConnectChildEvents: FC<ConnectChildEventsProps> = ({taskInfo, onSuccess, excludeEventId}) => {
	//Список выбранных событий
	const [selectedEventsList, setSelectedEventsList] = useState<Array<ShortEventInfoModel>>([])
	//Шаг формы
	const [step, setStep] = useState<null | "preview-before-submit">(null)
	//Методы для сохранения связей
	const [addChains, {data, isLoading, error}] = useConnectChainsMutation()
	
	//
	const saveHandler = useCallback(async () => {
		if (!step) {
			return setStep("preview-before-submit")
		}
		
		if (step === 'preview-before-submit') {
			return await addChains({
				chainType: "childOf",
				eventsToAdd: selectedEventsList.map((event) => event._id),
				taskId: taskInfo._id,
			})
				.unwrap()
				.then(() => onSuccess && onSuccess(taskInfo))
				.catch((r: MyServerResponse<null>) => {
					if (r.info?.message) {
						toast(r.info.message, {
							type: r.info.type
						})
					}
				})
		}
	}, [step, selectedEventsList, taskInfo])
	
	const goBackHandler = useCallback(() => {
		if (!step) {
			return setSelectedEventsList([])
		}
		
		if (step === 'preview-before-submit') {
			return setStep(null)
		}
	}, [step, selectedEventsList])
	
	const addToSelected: FindEventsProps['onSelect'] = (item) => {
		setSelectedEventsList((prev) => {
			const newArr = [...prev];
			newArr.push(item)
			return newArr
		})
	}
	
	const removeFromSelected: FindEventsProps['onSelect'] = (item) => {
		setSelectedEventsList((prev) => prev.filter((prevItem) => prevItem._id !== item._id))
	}
	
	const selectHandler: FindEventsProps['onSelect'] = (item) => {
		if (selectedEventsList.find((arrItem) => arrItem._id === item._id)) {
			return removeFromSelected(item)
		}
		
		return addToSelected(item)
	}
	
	useEffect(() => {
		if (step === 'preview-before-submit' && selectedEventsList.length === 0) {
			setStep(null)
		}
	}, [selectedEventsList, step])
	
	if (step === 'preview-before-submit') {
		return (
			<PreviewEventsList
				title={
					<Heading.H3>События, которые вы выбрали <Badge>{selectedEventsList.length}</Badge></Heading.H3>
				}
				selectedEvents={selectedEventsList || []}
				onSelectActionType={'select'}
				eventsArray={{
					throughEvents: [],
					baseEvents: selectedEventsList
				}}
				onSelect={removeFromSelected}
				buttons={
					<FlexBlock direction={'row'} width={'100%'} justify={'flex-end'} gap={6}>
						<ButtonWithLoading onClick={saveHandler} isLoading={isLoading}>
							Сохранить
						</ButtonWithLoading>
						<EmptyButtonStyled onClick={goBackHandler}>
							Вернуться назад
						</EmptyButtonStyled>
					</FlexBlock>
				}
			/>
		)
	}
	
	return (
		<FindEvents
			taskInfo={taskInfo}
			excludeFromFilters={{
				eventIds: [...(excludeEventId?.filter((item): item is ObjectId => !!item) || [])],
				parentId: taskInfo.parentId || undefined
			}}
			selectedEvents={selectedEventsList}
			buttons={
				<FlexBlock width={'100%'} direction={'row'} justify={'space-between'} align={'center'} gap={6}>
					<FlexBlock direction={'row'} grow={3} gap={6}>
						{selectedEventsList.length > 0 && (
							<Heading.H3>Выбранные события <Badge>{selectedEventsList.length}</Badge></Heading.H3>
						)}
					</FlexBlock>
					<FlexBlock direction={'row'} align={'center'} gap={6}>
						<ButtonWithLoading isLoading={false} onClick={saveHandler}>
							Далее
						</ButtonWithLoading>
						<EmptyButtonStyled onClick={goBackHandler}>
							Очистить
						</EmptyButtonStyled>
					</FlexBlock>
				</FlexBlock>
			}
			onSelect={selectHandler}
			onSelectActionType={'select'}
		/>
	)
}