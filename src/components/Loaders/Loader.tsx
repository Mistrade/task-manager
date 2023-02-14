import {FC, ReactNode} from "react";
import {ThreeDots} from "react-loader-spinner";
import {currentColor} from "../../common/constants";
import {FlexBlock} from "../LayoutComponents/FlexBlock";

export const Loader: FC<{ title: ReactNode, children?: ReactNode, isActive: boolean }> = ({
																																														title = 'Загрузка...',
																																														isActive,
																																														children
																																													}) => {
	
	if (isActive) {
		return (
			<FlexBlock width={'100%'} height={'100%'} justify={'center'} align={'center'}>
				<FlexBlock direction={'column'} align={'center'} justify={'center'}>
					<ThreeDots
						height="80"
						width="80"
						radius="9"
						color={currentColor}
						ariaLabel="three-dots-loading"
						visible={true}
					/>
					<FlexBlock textAlign={'center'}>{title}</FlexBlock>
				</FlexBlock>
			</FlexBlock>
		)
	}
	
	return <>
		{children}
	</>
}