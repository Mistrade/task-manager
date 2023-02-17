import {FC} from "react";
import {FlexBlock} from "../../../../LayoutComponents/FlexBlock";
import {disabledColor} from "../../../../../common/constants";

interface DaysOfWeekListProps {
	gap?: number,
	list: Array<string>
}

export const DaysOfWeekList: FC<DaysOfWeekListProps> = ({gap = 4, list}) => {
	return (
		<FlexBlock gap={gap} width={'100%'} direction={'row'} justify={'flex-start'} align={'flex-end'}>
			{list.map((weekDay) => (
				<FlexBlock
					key={weekDay}
					width={`calc(${100 / list.length}% - ${((list.length - 1) * gap) / list.length}px)`}
					justify={'center'}
					pb={6}
					opacity={0.4}
					borderBottom={`1px solid ${disabledColor}`}
				>
					{weekDay}
				</FlexBlock>
			))}
		</FlexBlock>
	)
}