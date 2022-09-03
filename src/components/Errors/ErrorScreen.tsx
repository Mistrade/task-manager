import {FlexBlock} from "../LayoutComponents/FlexBlock"
import {FC} from "react";
import {Heading} from "../Text/Heading";
import {defaultColor, ERROR_IMAGES} from "../../common/constants";
import {DocumentErrorTypes} from "../../common/types";

export interface ErrorScreenProps {
	description?: string,
	title: string,
	errorType: DocumentErrorTypes
}

export const ErrorScreen: FC<ErrorScreenProps> = ({
																										description,
																										title,
																										errorType
																									}) => {
	return (
		<FlexBlock
			justify={'center'}
			wrap={'wrap'}
			width={'100%'}
		>
			<FlexBlock
				justify={'center'}
				align={'center'}
				mb={12}
				width={'100%'}
			>
				{ERROR_IMAGES[errorType]}
			</FlexBlock>
			<FlexBlock
				width={'100%'}
				justify={'center'}
				mb={12}
			>
				<Heading.H2
					style={{
						textAlign: 'center',
						fontSize: 28,
						lineHeight: 1.2
					}}
				>
					{title}
				</Heading.H2>
			</FlexBlock>
			<FlexBlock
				width={'100%'}
				justify={'center'}
			>
				<p
					style={{
						fontSize: 18,
						lineHeight: 1.5,
						textAlign: 'center',
						color: defaultColor,
						whiteSpace: 'pre-wrap'
					}}
				>
					{description}
				</p>
			</FlexBlock>
			{/*<FlexBlock*/}
			{/*	width={'100%'}*/}
			{/*	mt={32}*/}
			{/*	mb={80}*/}
			{/*	justify={'center'}*/}
			{/*>*/}
			{/*	<Button*/}
			{/*		style={{padding: `9px 57px`, fontSize: 14, lineHeight: 1.5}}*/}
			{/*		type={'primary'}*/}
			{/*		onClick={() => ToShowcase()}*/}
			{/*		data-testid={TEST_IDS['ERROR_BUTTON']}*/}
			{/*	>*/}
			{/*		{HTTP_ERROR_BUTTON_NAME_ENUM[error.errorCode || DEFAULT_ERROR_OPTIONS.errorCode] || DEFAULT_ERROR_OPTIONS.buttonName}*/}
			{/*	</Button>*/}
			{/*</FlexBlock>*/}
			{/*<FlexBlock*/}
			{/*	justify={'center'}*/}
			{/*	mb={24}*/}
			{/*	width={'100%'}*/}
			{/*>*/}
			{/*	<StyledText*/}
			{/*		textAlign={'center'}*/}
			{/*		style={{*/}
			{/*			fontSize: 16, lineHeight: 1.5*/}
			{/*		}}*/}
			{/*		color={'web-text-secondary'}*/}
			{/*		data-testid={TEST_IDS['ERROR_SUPPORT_INFO']}*/}
			{/*	>*/}
			{/*		Если у вас возникли сложности, обратитесь в {' '}*/}
			{/*		<Link*/}
			{/*			href={TECH_SUPPORT_URL}*/}
			{/*			style={{*/}
			{/*				fontSize: 16, lineHeight: 1.5*/}
			{/*			}}*/}
			{/*		>*/}
			{/*			поддержку*/}
			{/*		</Link>*/}
			{/*		<br/>*/}
			{/*		Необходимо выбрать код системы РИС 1357 Онбординг СМБ*/}
			{/*	</StyledText>*/}
			{/*</FlexBlock>*/}
			{/*<FlexBlock*/}
			{/*	width={'100%'}*/}
			{/*	justify={'center'}*/}
			{/*>*/}
			{/*	<StyledText*/}
			{/*		textAlign={'center'}*/}
			{/*		color={'web-text-secondary'}*/}
			{/*		style={{*/}
			{/*			fontSize: 16,*/}
			{/*			lineHeight: 1.5*/}
			{/*		}}*/}
			{/*		data-testid={TEST_IDS['ERROR_DETAIL_INFO']}*/}
			{/*	>*/}
			{/*		{error.date} [66a270ec] (type={error.errorCode || DEFAULT_ERROR_OPTIONS.errorCode},*/}
			{/*		status={error.statusCode || DEFAULT_ERROR_OPTIONS.statusCode}).*/}
			{/*	</StyledText>*/}
			{/*</FlexBlock>*/}
		</FlexBlock>
	)
}