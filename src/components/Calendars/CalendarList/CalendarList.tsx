import {currentColor} from "../../../common/constants";
import {CalendarListStyled} from "./CalendarList.styled";
import {CalendarNameItem, CalendarNameListItem} from "./CalendarNameListItem";
import {useEffect, useState} from "react";

interface CalendarList {

}


const list: Array<CalendarNameItem> = [
	{
		id: '1',
		title: 'Home Calendar',
		color: currentColor,
	},
	{
		id: '2',
		title: 'Work Calendar',
		color: '#FFA4A4'
	},
	{
		id: '3',
		title: 'Freelance Calendar',
		color: '#D4CC00'
	},
	{
		id: '4',
		title: 'Freelance2 Calendar',
		color: '#D46600'
	},
	{
		id: '5',
		title: 'Freelance3 Calendar',
		color: '#D49051'
	}
]


export const CalendarList = () => {
	const [checked, setChecked] = useState<{ [key: string]: boolean }>({})
	
	useEffect(() => {
		console.log(checked)
	}, [checked])
	
	return (
		<CalendarListStyled>
			
			{list.map((item) => {
				return (
					<CalendarNameListItem
						item={item}
						key={item.id}
						isChecked={checked[item.id]}
						onChange={(isChecked) => {
							
							console.log(isChecked)
							setChecked(prev => ({
								...prev,
								[item.id]: isChecked
							}))
						}}
					/>
				)
			})}
		</CalendarListStyled>
	)
}