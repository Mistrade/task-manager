import {FlexBlock} from "../LayoutComponents/FlexBlock"
import {UserModel} from "../../store/api/session-api/session-api.types";
import {FC, useMemo} from "react";
import {CalendarUserIndicator} from "../../pages/Planner/Users/UserIndicator";
import {Button, JoinToEventButton} from "../Buttons/Buttons.styled";
import {EmailIcon, PhoneIcon} from "../Icons/Session/LogoutIcon";
import {DateHelper} from "../../common/calendarSupport/dateHelper";

export interface UserHoverCardProps {
	user: UserModel
}

export const UserHoverCard: FC<UserHoverCardProps> = ({user}) => {
	const phone = useMemo(() => {
		const first = user.phone.substring(0, 1)
		const second = user.phone.substring(1, 4)
		const third = user.phone.substring(4, 7)
		const fourth = user.phone.substring(7, 9)
		const five = user.phone.substring(9, 11)
		
		const result = [`+${first}`, `(${second})`, third, fourth, five]
		
		return result.join('-')
	}, [user.phone])
	
	return (
		<FlexBlock direction={'column'} gap={8} p={4} width={'100%'}>
			<FlexBlock>
				<CalendarUserIndicator
					name={user.name}
					surname={user.surname}
					id={user._id}
					onClick={(id) => {
						const link = document.createElement('a')
						link.href = `/profile/${id}`
						link.target = '_blank'
						link.click()
						link.remove()
					}}
				/>
			</FlexBlock>
			<FlexBlock>
				На портале с {DateHelper.getHumanizeDateValue(user.created, {
				withTime: false,
				withYear: true,
				monthPattern: "full"
			})}
			</FlexBlock>
			<FlexBlock fSize={16} style={{fontWeight: '500'}}>
				Контактная информация:
			</FlexBlock>
			<FlexBlock gap={6} align={'center'}>
				<PhoneIcon size={20}/>
				{phone}
			</FlexBlock>
			{user.email && (
				<FlexBlock gap={6} align={'center'}>
					<EmailIcon size={20}/>
					{user.email}
				</FlexBlock>
			)}
			<FlexBlock mt={12}>
				<Button>
					Запланировать событие
				</Button>
			</FlexBlock>
		</FlexBlock>
	)
}