import {FC} from "react";
import {FlexBlock} from "../../../LayoutComponents/FlexBlock";
import {SadSmile} from "../../../Icons/Icons";
import {ErrorScreen} from "../../../Errors/ErrorScreen";

export const TaskInfoNotFound: FC<{ message?: string }> = ({message}) => (
	<FlexBlock
		height={'100%'}
		width={'100%'}
		justify={'center'}
		align={'center'}
		p={24}
	>
		<ErrorScreen
			title={'Не удалось загрузить информацию по событию'}
			errorType={'SYSTEM_ERROR'}
			description={message || ''}
			action={{
				title: "Вернуться назад",
				onClick() {
					history.back()
				}
			}}
		/>
	</FlexBlock>
)