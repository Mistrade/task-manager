import {FC, ReactNode} from "react";
import {InfinitySpin, MagnifyingGlass} from "react-loader-spinner";
import {currentColor} from "../../common/constants";
import {FlexBlock} from "../LayoutComponents/FlexBlock";

export const Loader: FC<{ title: ReactNode }> = ({title = 'Загрузка...'}) => {
	
	return (
		<FlexBlock width={'100%'} height={'100%'} justify={'center'} align={'center'}>
			<FlexBlock direction={'column'} align={'center'} justify={'center'}>
				<MagnifyingGlass
					visible={true}
					width={'80'}
					height={'80'}
					glassColor="#fff"
					color={currentColor}
				/>
				<FlexBlock textAlign={'center'}>{title}</FlexBlock>
			</FlexBlock>
		</FlexBlock>
	)
}