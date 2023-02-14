import React, {FC} from "react";
import {UsageTaskItemBaseProps} from "../types";
import {FlexBlock} from "../../LayoutComponents/FlexBlock";
import {getHumanizeDateValue} from "../../../common/constants";
import dayjs from "dayjs";
import {Heading} from "../../Text/Heading";
import {LinkStyled} from "../../Buttons/Link.styled";
import {CalendarUserIndicator} from "../Users/UserIndicator";
import {openUrlInNewTab} from "../../../common/url";


export const TaskCreatedMessage: FC<UsageTaskItemBaseProps> = ({taskItem}) => {
	return (
		<FlexBlock fSize={16} direction={'column'} gap={12} width={'100%'}>
			<Heading.H2 style={{textAlign: 'left', fontSize: 16}}>Создано</Heading.H2>
			<FlexBlock direction={'column'} gap={12} width={'100%'}>
				<CalendarUserIndicator
					name={taskItem.userId.name}
					surname={taskItem.userId.surname}
					id={taskItem.userId._id}
					onClick={(userId) => {
						openUrlInNewTab(`${window.location.origin}/profile/${userId}`)
					}}
				/>
				<span>
					{/*<LinkStyled*/}
					{/*	style={{fontSize: 16}}*/}
					{/*	to={`/profile/${taskItem.userId._id}`}*/}
					{/*	target={"_blank"}*/}
					{/*>*/}
					{/*	{`${[taskItem.userId.surname, taskItem.userId.name, taskItem.userId.patronymic].filter((item) => !!item).join(' ')}`}*/}
					{/*</LinkStyled>, */}
					{getHumanizeDateValue(dayjs(taskItem.createdAt).toDate(), true)}
				</span>
			</FlexBlock>
		</FlexBlock>
	)
}