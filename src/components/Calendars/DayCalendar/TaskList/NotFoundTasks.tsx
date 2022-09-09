import styled from "styled-components";
import {defaultColor} from "../../../../common/constants";
import React, {FC, ReactNode} from "react";
import {FlexBlock} from "../../../LayoutComponents/FlexBlock";
import {NotFoundIcon} from "../../../Icons/Icons";
import {Button} from "../../../Buttons/Buttons.styled";
import {GlobalTaskListProps} from "../../types";

export interface NotFoundTaskProps extends Omit<GlobalTaskListProps, 'renderTaskCount'> {
	day: Date,
	text?: ReactNode,
	actions?: ReactNode
}

const NotFoundTitle = styled('h2')`
  & {
    font-size: 24px;
    color: ${defaultColor};
    font-weight: 500;
    text-align: center;
    width: 100%;
    margin-bottom: 24px;
  }
`
export const NotFoundTask: FC<NotFoundTaskProps> = ({onAddTask, day, text, actions}) => {
	return (
		<FlexBlock
			height={400}
			minWidth={300}
			maxWidth={'100%'}
			direction={'column'}
			align={'center'}
			justify={'flex-start'}
		>
			<FlexBlock mb={12}>
				<NotFoundIcon/>
			</FlexBlock>
			<NotFoundTitle>
				{text || <>Событий, назначенных на текущую дату,<br/> не найдено</>}
			</NotFoundTitle>
			<FlexBlock direction={'column'} gap={16}>
				<Button
					onClick={() => onAddTask && day && onAddTask(day)}
				>
					Добавить событие
				</Button>
				{actions}
			</FlexBlock>
		</FlexBlock>
	)
}