import {FC} from "react";
import {ErrorScreen} from "../Errors/ErrorScreen";
import {FlexBlock} from "../LayoutComponents/FlexBlock";

export const NotFoundPage: FC = () => {
	document.title = 'По данному URL ничего не найдено'
	
	return (
		<FlexBlock height={'100%'} align={'center'} justify={'center'} mt={'15rem'}>
			<ErrorScreen
				title={'По данному URL ничего не найдено.'}
				errorType={'ERR_FORBIDDEN'}
				description={'Такое бывает, если вы пытаетесь зайти на страницу, которая доступна только для авторизованных пользователей или наоборот.\n Воспользуйтесь навигацией сверху и перейдите в нужный раздел сайта.'}
			/>
		</FlexBlock>
	)
}