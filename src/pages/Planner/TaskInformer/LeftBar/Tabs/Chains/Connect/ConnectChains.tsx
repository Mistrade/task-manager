import {FlexBlock} from "../../../../../../../components/LayoutComponents/FlexBlock"
import {Heading} from "../../../../../../../components/Text/Heading"
import {ChangeEvent, FC, useCallback, useState} from "react";
import {Checkbox} from "../../../../../../../components/Input/Checkbox/Checkbox";
import {ConnectChildEvents} from "./ConnectTypes/ConnectChildEvents";
import {ConnectParentEvent} from "./ConnectTypes/ConnectParentEvent";
import {EmptyButtonStyled} from "../../../../../../../components/Buttons/EmptyButton.styled";
import {Arrow} from "../../../../../../../components/Icons/Icons";
import {darkColor} from "../../../../../../../common/constants";
import {ConnectChainsProps, ConnectChainsType} from "../event-chains.types";
import {Tooltip} from "../../../../../../../components/Tooltip/Tooltip";

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
	
	return (
		<form
			style={{height: '100%', width: '100%'}}
			onSubmit={(e) => e.preventDefault()}
		>
			<FlexBlock
				width={'100%'}
				direction={'column'}
				gap={8}
				height={'100%'}
			>
				<FlexBlock grow={0} direction={'column'} gap={8} width={'100%'}>
					<FlexBlock width={'100%'} gap={12} align={'center'}>
						<Tooltip content={'Вернуться назад'}>
							<EmptyButtonStyled style={{transform: 'rotate(180deg)'}} onClick={onGoBack} type={'button'}>
								<Arrow size={16} color={darkColor}/>
							</EmptyButtonStyled>
						</Tooltip>
						<Heading.H3 textColor={'dark'}>
							Выберите тип связи
						</Heading.H3>
					</FlexBlock>
					<FlexBlock direction={'row'} gap={12} wrap={'wrap'} align={'flex-start'}>
						<Checkbox
							onChange={(e) => changeTypeHandler(e, 'childOf')}
							title={'Добавить вложенные события'}
							isChecked={type === 'childOf'}
							type={"radio"}
							id={"addChildOf"}
						/>
						<Checkbox
							onChange={(e) => changeTypeHandler(e, 'parentOf')}
							title={'Привязать к другому событию'}
							isChecked={type === 'parentOf'}
							type={"radio"}
							id={"addParentOf"}
						/>
					</FlexBlock>
				</FlexBlock>
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
		</form>
	)
}