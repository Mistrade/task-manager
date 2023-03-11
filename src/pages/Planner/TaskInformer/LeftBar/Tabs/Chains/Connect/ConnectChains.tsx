import {FlexBlock} from "../../../../../../../components/LayoutComponents/FlexBlock"
import {Heading} from "../../../../../../../components/Text/Heading"
import {ChangeEvent, FC, useCallback, useState} from "react";
import {Checkbox} from "../../../../../../../components/Input/Checkbox/Checkbox";
import {ConnectChildEvents} from "./ConnectTypes/ConnectChildEvents";
import {ConnectParentEvent} from "./ConnectTypes/ConnectParentEvent";
import {EmptyButtonStyled} from "../../../../../../../components/Buttons/EmptyButton.styled";
import {
	ApprovedAfterIcon,
	Arrow,
	ChildOfIcon,
	CompletedAfterIcon,
	ParentOfIcon
} from "../../../../../../../components/Icons/Icons";
import {
	borderRadiusSize,
	currentColor,
	darkColor,
	defaultColor,
	disabledColor
} from "../../../../../../../common/constants";
import {ConnectChainsProps, ConnectChainsType} from "../event-chains.types";
import {Tooltip} from "../../../../../../../components/Tooltip/Tooltip";
import {css} from "styled-components";
import {ConnectChainsCard, ConnectChainsCardObject} from "./ConnectChainsCard";
import {ChainsShowcase} from "./ChainsShowcase";


export const ConnectChains: FC<ConnectChainsProps> = ({
																												taskInfo,
																												onSuccess,
																												initialState,
																												onGoBack,
																												excludeEventId
																											}) => {
	const [type, setType] = useState<ConnectChainsType | null>(initialState || null)
	
	const changeTypeHandler = useCallback((e: ChangeEvent<HTMLInputElement>, key: ConnectChainsType) => {
		setType(e.target.checked ? key : null)
	}, [])
	
	const getTitle = useCallback(() => {
		switch (type) {
			case 'childOf':
				return 'Добавьте дочерние события'
			case 'parentOf':
				return 'Укажите родительское событие'
			case 'completed-after':
				return 'Выберите события для условия completed-after'
			case 'approved-after':
				return 'Выберите события для условия approved-after'
			default:
				return 'Выберите тип связи'
		}
	}, [type])
	
	const goBackHandler = useCallback(() => {
		if (type !== null) {
			return setType(null)
		}
		
		return onGoBack && onGoBack()
	}, [type])
	
	return (
		<FlexBlock
			width={'100%'}
			direction={'column'}
			gap={8}
			height={'100%'}
		>
			<FlexBlock grow={0} direction={'column'} gap={8} width={'100%'}>
				<FlexBlock width={'100%'} gap={12} align={'center'}>
					<Tooltip content={'Вернуться назад'}>
						<EmptyButtonStyled style={{transform: 'rotate(180deg)'}} onClick={goBackHandler} type={'button'}>
							<Arrow size={16} color={darkColor}/>
						</EmptyButtonStyled>
					</Tooltip>
					<Heading.H3 textColor={'dark'}>
						{getTitle()}
					</Heading.H3>
				</FlexBlock>
			</FlexBlock>
			<FlexBlock grow={3} direction={'column'} width={'100%'} overflow={'hidden'}>
				{type === null && (
					<ChainsShowcase
						onSelect={(item) => setType(item.type)}
					/>
				)}
				{type === 'childOf' && (
					<ConnectChildEvents
						excludeEventId={excludeEventId}
						onSuccess={onSuccess}
						taskInfo={taskInfo}
					/>
				)}
				{type === 'parentOf' && (
					<ConnectParentEvent/>
				)}
			</FlexBlock>
		</FlexBlock>
	)
}