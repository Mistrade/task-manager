import React, {FC} from 'react'
import {currentColor, defaultColor, priorityColors} from '../../common/constants'
import {FlexBlock, FlexBlockProps} from '../LayoutComponents/FlexBlock'

export interface IconProps {
	size?: number,
	color?: string,
	onClick?: (e: React.MouseEvent<HTMLDivElement>) => void
}

export const Male: FC<IconProps> = ({size = 20, color = '#000'}) => {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			aria-hidden="true"
			role="img"
			width={size}
			height={size}
			preserveAspectRatio="xMidYMid meet"
			viewBox="0 0 1024 1024"
		>
			<path
				fill={color}
				d="M874 120H622c-3.3 0-6 2.7-6 6v56c0 3.3 2.7 6 6 6h160.4L583.1 387.3c-50-38.5-111-59.3-175.1-59.3c-76.9 0-149.3 30-203.6 84.4S120 539.1 120 616s30 149.3 84.4 203.6C258.7 874 331.1 904 408 904s149.3-30 203.6-84.4C666 765.3 696 692.9 696 616c0-64.1-20.8-124.9-59.2-174.9L836 241.9V402c0 3.3 2.7 6 6 6h56c3.3 0 6-2.7 6-6V150c0-16.5-13.5-30-30-30zM408 828c-116.9 0-212-95.1-212-212s95.1-212 212-212s212 95.1 212 212s-95.1 212-212 212z"
			/>
		</svg>
	)
}
export const Female: FC<IconProps> = ({size = 20, color = '#000'}) => {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			aria-hidden="true"
			role="img"
			width={size}
			height={size}
			preserveAspectRatio="xMidYMid meet"
			viewBox="0 0 1024 1024"
		>
			<path
				fill={color}
				d="M712.8 548.8c53.6-53.6 83.2-125 83.2-200.8c0-75.9-29.5-147.2-83.2-200.8C659.2 93.6 587.8 64 512 64s-147.2 29.5-200.8 83.2C257.6 200.9 228 272.1 228 348c0 63.8 20.9 124.4 59.4 173.9c7.3 9.4 15.2 18.3 23.7 26.9c8.5 8.5 17.5 16.4 26.8 23.7c39.6 30.8 86.3 50.4 136.1 57V736H360c-4.4 0-8 3.6-8 8v60c0 4.4 3.6 8 8 8h114v140c0 4.4 3.6 8 8 8h60c4.4 0 8-3.6 8-8V812h114c4.4 0 8-3.6 8-8v-60c0-4.4-3.6-8-8-8H550V629.5c61.5-8.2 118.2-36.1 162.8-80.7zM512 556c-55.6 0-107.7-21.6-147.1-60.9C325.6 455.8 304 403.6 304 348s21.6-107.7 60.9-147.1C404.2 161.5 456.4 140 512 140s107.7 21.6 147.1 60.9C698.4 240.2 720 292.4 720 348s-21.6 107.7-60.9 147.1C619.7 534.4 567.6 556 512 556z"
			/>
		</svg>
	)
}
export const SadSmile: FC<IconProps> = ({size = 100, color = 'darkorange'}) => {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			aria-hidden="true"
			role="img"
			width={size}
			height={size}
			preserveAspectRatio="xMidYMid meet"
			viewBox="0 0 48 48"
		>
			<g fill={color}>
				<path
					d="M14.807 23.233c-.683-.438-1.183-1.145-1.064-1.883a.5.5 0 0 1 .668-.389c1.818.675 3.846.256 5.642-1.448a.5.5 0 0 1 .818.203c.231.689.024 1.618-.48 2.382a3.794 3.794 0 0 1-2.654 1.665c-1.198.177-2.216-.073-2.93-.53Zm17.947 0c.683-.438 1.184-1.145 1.065-1.883a.5.5 0 0 0-.668-.389c-1.818.675-3.846.256-5.642-1.448a.5.5 0 0 0-.818.203c-.232.689-.024 1.618.48 2.382a3.794 3.794 0 0 0 2.653 1.665c1.199.177 2.216-.073 2.93-.53Zm-15.789 8.943c.097-.355.245-.72.431-1.005C18.664 29.225 21.151 28 23.892 28c2.646 0 5.048 1.139 6.354 2.962l.017.023a4.3 4.3 0 0 1 .278.403c.164.285.284.637.357.973a3.6 3.6 0 0 1 .076 1.123c-.038.356-.17.9-.64 1.268c-.523.41-1.15.372-1.656.195c-2.394-.782-3.53-1.12-4.648-1.126c-1.116-.006-2.277.317-4.714 1.128l-.008.003l-.008.002c-.56.176-1.222.216-1.772-.187c-.527-.386-.668-.976-.698-1.377a3.66 3.66 0 0 1 .135-1.214Z"/>
				<path
					fillRule="evenodd"
					d="M42 24c0 9.941-8.059 18-18 18S6 33.941 6 24S14.059 6 24 6s18 8.059 18 18Zm-2 0c0 8.837-7.163 16-16 16S8 32.837 8 24S15.163 8 24 8s16 7.163 16 16Z"
					clipRule="evenodd"
				/>
			</g>
		</svg>
	)
}

export const DoubleArrow: FC<IconProps & FlexBlockProps> = ({
																															size = 24,
																															color = defaultColor,
																															...props
																														}) => {
	return (
		<FlexBlock {...props} align={'center'} justify={'center'}>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				aria-hidden="true"
				role="img"
				width={size}
				height={size}
				preserveAspectRatio="xMidYMid meet"
				viewBox="0 0 1024 1024"
			>
				<path
					fill={color}
					d="M452.864 149.312a29.12 29.12 0 0 1 41.728.064L826.24 489.664a32 32 0 0 1 0 44.672L494.592 874.624a29.12 29.12 0 0 1-41.728 0a30.592 30.592 0 0 1 0-42.752L764.736 512L452.864 192a30.592 30.592 0 0 1 0-42.688zm-256 0a29.12 29.12 0 0 1 41.728.064L570.24 489.664a32 32 0 0 1 0 44.672L238.592 874.624a29.12 29.12 0 0 1-41.728 0a30.592 30.592 0 0 1 0-42.752L508.736 512L196.864 192a30.592 30.592 0 0 1 0-42.688z"
				/>
			</svg>
		</FlexBlock>
	)
}


export const LoaderIcon: FC<IconProps & FlexBlockProps & { strokeWidth?: number }> = ({
																																												size = 24,
																																												color = currentColor,
																																												strokeWidth = 2,
																																												...props
																																											}) => {
	return (
		<FlexBlock {...props} align={'center'} justify={'center'}>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				aria-hidden="true"
				role="img"
				width={size}
				height={size}
				preserveAspectRatio="xMidYMid meet"
				viewBox="0 0 24 24"
			>
				<g
					fill="none"
					stroke={color}
					strokeLinecap="round"
					strokeWidth={strokeWidth}
				>
					<path
						strokeDasharray="60"
						strokeDashoffset="60"
						strokeOpacity=".3"
						d="M12 3C16.9706 3 21 7.02944 21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3Z"
					>
						<animate fill="freeze" attributeName="stroke-dashoffset" dur="1.3s" values="60;0"/>
					</path>
					<path
						strokeDasharray="15"
						strokeDashoffset="15"
						d="M12 3C16.9706 3 21 7.02944 21 12"
					>
						<animate fill="freeze" attributeName="stroke-dashoffset" dur="0.3s" values="15;0"/>
						<animateTransform
							attributeName="transform"
							dur="1.5s"
							repeatCount="indefinite"
							type="rotate"
							values="0 12 12;360 12 12"
						/>
					</path>
				</g>
			</svg>
		</FlexBlock>
	)
}


export const Arrow: FC<IconProps & FlexBlockProps> = ({
																												size = 24,
																												color = defaultColor,
																												...props
																											}) => {
	return (
		<FlexBlock {...props} align={'center'} justify={'center'}>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				aria-hidden="true"
				role="img"
				width={size}
				height={size}
				preserveAspectRatio="xMidYMid meet"
				viewBox="0 0 1024 1024"
			>
				<path
					fill={color}
					d="M340.864 149.312a30.592 30.592 0 0 0 0 42.752L652.736 512L340.864 831.872a30.592 30.592 0 0 0 0 42.752a29.12 29.12 0 0 0 41.728 0L714.24 534.336a32 32 0 0 0 0-44.672L382.592 149.376a29.12 29.12 0 0 0-41.728 0z"
				/>
			</svg>
		</FlexBlock>
	)
}

export const CompleteIcon: FC<IconProps & FlexBlockProps> = ({
																															 size = 24,
																															 color = currentColor,
																															 ...props
																														 }) => {
	return (
		<FlexBlock {...props} align={'center'} justify={'center'}>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				aria-hidden="true"
				role="img"
				width={size}
				height={size}
				preserveAspectRatio="xMidYMid meet"
				viewBox="0 0 24 24"
			>
				<path
					fill="none"
					stroke={color}
					strokeLinecap="round"
					strokeLinejoin="round"
					strokeWidth="2"
					d="m2 12l5.25 5l2.625-3M8 12l5.25 5L22 7m-6 0l-3.5 4"
				/>
			</svg>
		
		</FlexBlock>
	)
}

export const PencilIcon: FC<IconProps & FlexBlockProps> = ({
																														 size = 24,
																														 color = currentColor,
																														 ...props
																													 }) => {
	return (
		<FlexBlock {...props} align={'center'} justify={'center'}>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				width={size}
				height={size}
				preserveAspectRatio="xMidYMid meet"
				viewBox="0 0 20 20"
			>
				<path
					fill={color}
					d="M13.586 3.586a2 2 0 1 1 2.828 2.828l-.793.793l-2.828-2.828l.793-.793Zm-2.207 2.207L3 14.172V17h2.828l8.38-8.379l-2.83-2.828Z"
				/>
			</svg>
		
		</FlexBlock>
	)
}

export const CancelIcon: FC<IconProps & FlexBlockProps> = ({
																														 size = 24,
																														 color = currentColor,
																														 ...props
																													 }) => {
	return (
		<FlexBlock {...props} align={'center'} justify={'center'}>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				width={size}
				height={size}
				preserveAspectRatio="xMidYMid meet"
				viewBox="0 0 24 24"
			>
				<path
					fill={color}
					d="M12 2c5.5 0 10 4.5 10 10s-4.5 10-10 10S2 17.5 2 12S6.5 2 12 2m0 2c-1.9 0-3.6.6-4.9 1.7l11.2 11.2c1-1.4 1.7-3.1 1.7-4.9c0-4.4-3.6-8-8-8m4.9 14.3L5.7 7.1C4.6 8.4 4 10.1 4 12c0 4.4 3.6 8 8 8c1.9 0 3.6-.6 4.9-1.7Z"
				/>
			</svg>
		
		</FlexBlock>
	)
}

export const WaitIcon: FC<IconProps & FlexBlockProps> = ({
																													 size = 24,
																													 color = currentColor,
																													 ...props
																												 }) => {
	return (
		<FlexBlock {...props} align={'center'} justify={'center'}>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				aria-hidden="true"
				role="img"
				width={size}
				height={size}
				preserveAspectRatio="xMidYMid meet"
				viewBox="0 0 16 16"
			>
				<g fill={color}>
					<path
						d="M8.515 1.019A7 7 0 0 0 8 1V0a8 8 0 0 1 .589.022l-.074.997zm2.004.45a7.003 7.003 0 0 0-.985-.299l.219-.976c.383.086.76.2 1.126.342l-.36.933zm1.37.71a7.01 7.01 0 0 0-.439-.27l.493-.87a8.025 8.025 0 0 1 .979.654l-.615.789a6.996 6.996 0 0 0-.418-.302zm1.834 1.79a6.99 6.99 0 0 0-.653-.796l.724-.69c.27.285.52.59.747.91l-.818.576zm.744 1.352a7.08 7.08 0 0 0-.214-.468l.893-.45a7.976 7.976 0 0 1 .45 1.088l-.95.313a7.023 7.023 0 0 0-.179-.483zm.53 2.507a6.991 6.991 0 0 0-.1-1.025l.985-.17c.067.386.106.778.116 1.17l-1 .025zm-.131 1.538c.033-.17.06-.339.081-.51l.993.123a7.957 7.957 0 0 1-.23 1.155l-.964-.267c.046-.165.086-.332.12-.501zm-.952 2.379c.184-.29.346-.594.486-.908l.914.405c-.16.36-.345.706-.555 1.038l-.845-.535zm-.964 1.205c.122-.122.239-.248.35-.378l.758.653a8.073 8.073 0 0 1-.401.432l-.707-.707z"
					/>
					<path
						d="M8 1a7 7 0 1 0 4.95 11.95l.707.707A8.001 8.001 0 1 1 8 0v1z"
					/>
					<path
						d="M7.5 3a.5.5 0 0 1 .5.5v5.21l3.248 1.856a.5.5 0 0 1-.496.868l-3.5-2A.5.5 0 0 1 7 9V3.5a.5.5 0 0 1 .5-.5z"
					/>
				</g>
			</svg>
		
		</FlexBlock>
	)
}
export const ProcessIcon: FC<IconProps & FlexBlockProps> = ({
																															size = 24,
																															color = currentColor,
																															...props
																														}) => {
	return (
		<FlexBlock {...props} align={'center'} justify={'center'}>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				aria-hidden="true"
				role="img"
				width={size}
				height={size}
				preserveAspectRatio="xMidYMid meet"
				viewBox="0 0 24 24"
			>
				<path
					fill={color}
					d="M6.992 14.502a1 1 0 0 0-1 1v1.782a7.972 7.972 0 0 1-2-5.282a7.29 7.29 0 0 1 .052-.88a1 1 0 1 0-1.985-.24a9.173 9.173 0 0 0-.067 1.12a9.964 9.964 0 0 0 2.417 6.5H2.992a1 1 0 1 0 0 2h4a.982.982 0 0 0 .794-.422c.011-.015.026-.027.037-.043c.007-.01.007-.022.013-.032a.966.966 0 0 0 .106-.258a.952.952 0 0 0 .032-.156c.003-.03.018-.057.018-.089v-4a1 1 0 0 0-1-1Zm1.5-8.5H6.709a7.974 7.974 0 0 1 5.283-2a7.075 7.075 0 0 1 .88.053a1 1 0 0 0 .24-1.987a9.227 9.227 0 0 0-1.12-.066a9.964 9.964 0 0 0-6.5 2.417V3.002a1 1 0 0 0-2 0v4a.954.954 0 0 0 .039.195a.969.969 0 0 0 .141.346l.012.017a.973.973 0 0 0 .244.246c.011.008.017.02.028.028c.014.01.03.013.045.021a.958.958 0 0 0 .18.084a.988.988 0 0 0 .261.053c.018 0 .032.01.05.01h4a1 1 0 0 0 0-2Zm11.96 10.804a.967.967 0 0 0-.141-.345l-.011-.017a.973.973 0 0 0-.245-.246c-.011-.008-.016-.02-.028-.028c-.01-.007-.023-.007-.034-.014a1.154 1.154 0 0 0-.41-.136c-.032-.003-.059-.018-.091-.018h-4a1 1 0 0 0 0 2h1.782a7.973 7.973 0 0 1-5.282 2a7.074 7.074 0 0 1-.88-.054a1 1 0 0 0-.24 1.987a9.365 9.365 0 0 0 1.12.067a9.964 9.964 0 0 0 6.5-2.417v1.417a1 1 0 0 0 2 0v-4a.953.953 0 0 0-.04-.195Zm.54-11.304a1 1 0 0 0 0-2h-4a.952.952 0 0 0-.192.039l-.007.001a.968.968 0 0 0-.34.14l-.02.013a.974.974 0 0 0-.245.244c-.008.01-.02.016-.028.027c-.007.01-.007.023-.014.034a1.146 1.146 0 0 0-.136.413c-.003.03-.018.057-.018.089v4a1 1 0 1 0 2 0V6.719a7.975 7.975 0 0 1 2 5.283a7.289 7.289 0 0 1-.053.88a1.001 1.001 0 0 0 .872 1.113a1.03 1.03 0 0 0 .122.007a1 1 0 0 0 .991-.88a9.174 9.174 0 0 0 .068-1.12a9.964 9.964 0 0 0-2.417-6.5Z"
				/>
			</svg>
		
		</FlexBlock>
	)
}

export const CreatedIcon: FC<IconProps & FlexBlockProps> = ({
																															size = 24,
																															color = currentColor,
																															...props
																														}) => {
	return (
		<FlexBlock {...props} align={'center'} justify={'center'}>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				aria-hidden="true"
				role="img"
				width={size}
				height={size}
				preserveAspectRatio="xMidYMid meet"
				viewBox="0 0 16 16"
			>
				<path
					fill={color}
					fillRule="evenodd"
					d="M5.616 4.928a2.487 2.487 0 0 1-1.119.922c-.148.06-.458.138-.458.138v5.008a2.51 2.51 0 0 1 1.579 1.062c.273.412.419.895.419 1.388c.008.343-.057.684-.19 1A2.485 2.485 0 0 1 3.5 15.984a2.482 2.482 0 0 1-1.388-.419A2.487 2.487 0 0 1 1.05 13c.095-.486.331-.932.68-1.283c.349-.343.79-.579 1.269-.68V5.949a2.6 2.6 0 0 1-1.269-.68a2.503 2.503 0 0 1-.68-1.283a2.487 2.487 0 0 1 1.06-2.565A2.49 2.49 0 0 1 3.5 1a2.504 2.504 0 0 1 1.807.729a2.493 2.493 0 0 1 .729 1.81c.002.494-.144.978-.42 1.389zm-.756 7.861a1.5 1.5 0 0 0-.552-.579a1.45 1.45 0 0 0-.77-.21a1.495 1.495 0 0 0-1.47 1.79a1.493 1.493 0 0 0 1.18 1.179c.288.058.586.03.86-.08c.276-.117.512-.312.68-.56c.15-.226.235-.49.249-.76a1.51 1.51 0 0 0-.177-.78zM2.708 4.741c.247.161.536.25.83.25c.271 0 .538-.075.77-.211a1.514 1.514 0 0 0 .729-1.359a1.513 1.513 0 0 0-.25-.76a1.551 1.551 0 0 0-.68-.56a1.49 1.49 0 0 0-.86-.08a1.494 1.494 0 0 0-1.179 1.18c-.058.288-.03.586.08.86c.117.276.312.512.56.68zM13.037 7h-1.002V5.49a1.5 1.5 0 0 0-1.5-1.5H8.687l1.269 1.27l-.71.709L7.117 3.84v-.7l2.13-2.13l.71.711l-1.269 1.27h1.85a2.484 2.484 0 0 1 2.312 1.541c.125.302.189.628.187.957V7zM13 16h-1v-3H9v-1h3V9h1v3h3v1h-3v3z"
					clipRule="evenodd"
				/>
			</svg>
		
		</FlexBlock>
	)
}

export const BurgerIcon: FC<IconProps & FlexBlockProps> = ({
																														 size = 20,
																														 color = priorityColors['medium'],
																														 ...props
																													 }) => {
	return (
		<FlexBlock {...props} align={'center'} justify={'center'}>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				aria-hidden="true"
				role="img"
				width={size}
				height={size}
				preserveAspectRatio="xMidYMid meet"
				viewBox="0 0 24 24"
			>
				<path
					fill={color}
					d="M4 5h16c.55 0 1-.45 1-1s-.45-1-1-1H4c-.55 0-1 .45-1 1s.45 1 1 1zm16 14H4c-.55 0-1 .45-1 1s.45 1 1 1h16c.55 0 1-.45 1-1s-.45-1-1-1zm0-8H4c-.55 0-1 .45-1 1s.45 1 1 1h16c.55 0 1-.45 1-1s-.45-1-1-1z"
				/>
			</svg>
		</FlexBlock>
	)
}

export const NotFoundIcon: FC = () => {
	return (
		<svg width="360" height="280" viewBox="0 0 360 280" fill="none"
				 xmlns="http://www.w3.org/2000/svg">
			<line x1="179" x2="179" y2="56" stroke="#D6E4FE" strokeWidth="2"/>
			<path d="M136.143 105H221L281 279H78L136.143 105Z" fill="url(#paint0_linear_59309_70287)"/>
			<circle cx="179" cy="66" r="11" fill="#0033A0"/>
			<path
				d="M221 105.5C199 110.5 198.472 110.5 175 110.5C151.528 110.5 151.5 110.5 136 105.5C136 82.0279 155.028 63 178.5 63C201.972 63 221 82.0279 221 105.5Z"
				fill="url(#paint1_linear_59309_70287)"/>
			<ellipse cx="178.5" cy="105.5" rx="42.5" ry="8.5" fill="url(#paint2_linear_59309_70287)"/>
			<defs>
				<linearGradient id="paint0_linear_59309_70287" x1="206" y1="66.5" x2="157.886" y2="254.506"
												gradientUnits="userSpaceOnUse">
					<stop stopColor="#D6E4FE"/>
					<stop offset="1" stopColor="#D6E4FE" stopOpacity="0"/>
				</linearGradient>
				<linearGradient id="paint1_linear_59309_70287" x1="136" y1="86.75" x2="221" y2="86.75"
												gradientUnits="userSpaceOnUse">
					<stop offset="0.140625" stopColor="#0539A7"/>
					<stop offset="0.75" stopColor="#3870F0"/>
				</linearGradient>
				<linearGradient id="paint2_linear_59309_70287" x1="136" y1="105" x2="219" y2="107"
												gradientUnits="userSpaceOnUse">
					<stop stopColor="#2754B5"/>
					<stop offset="1" stopColor="#2755BB"/>
				</linearGradient>
			</defs>
		</svg>
	
	)
}
