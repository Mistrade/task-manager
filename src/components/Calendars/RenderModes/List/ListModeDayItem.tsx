import {FC} from "react";
import {ShortEventItem} from "../../../../store/api/taskApi/types";


interface ListModeDayItemProps {
	tasks: Array<ShortEventItem>,
}



export const ListModeDayItem: FC<ListModeDayItemProps> = ({tasks}) => {
	
	if (tasks.length > 0) {
		return (
			<>
			
			</>
		)
	}
	return <></>
}