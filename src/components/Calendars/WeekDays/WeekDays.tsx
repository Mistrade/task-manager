import {FC} from "react";
import {FlexBlock} from "../../LayoutComponents/FlexBlock";
import {disabledColor} from "../../../common/constants";

interface WeekDaysProps {
	gap?: number,
	list: Array<string>
}

export const WeekDays: FC<WeekDaysProps> = ({gap = 4, list}) => {
	return (
		<FlexBlock gap={gap} width={'100%'} direction={'row'} justify={'flex-start'} align={'flex-end'}>
			{list.map((weekDay) => (
				<FlexBlock
					width={`calc(${100 / list.length}% - ${((list.length - 1) * gap) / list.length}px)`}
					justify={'center'}
					pb={6}
					borderBottom={`1px solid ${disabledColor}`}
				>
					{weekDay}
				</FlexBlock>
			))}
		</FlexBlock>
	)
}