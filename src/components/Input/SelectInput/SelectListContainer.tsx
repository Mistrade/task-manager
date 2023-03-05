import {FCWithChildren} from '../../../pages/Planner/planner.types'
import {css} from 'styled-components'
import {borderRadiusSize, defaultColor} from '../../../common/constants'
import {FlexBlock, FlexBlockProps} from '../../LayoutComponents/FlexBlock'

export const SelectListContainer: FCWithChildren<FlexBlockProps> = ({
																																			children,
																																			...flexBlockProps
																																		}) => {
	if (children) {
		return (
			<FlexBlock
				additionalCss={css`
          z-index: 9999;
				`}
				bgColor={"#fff"}
				maxHeight={400}
				width={'100%'}
				{...flexBlockProps}
				direction={'column'}
			>
				<FlexBlock
					// additionalCss={css`z-index: 2`}
					direction={'column'}
				>
					{children}
				</FlexBlock>
			</FlexBlock>
		)
	}
	
	return <></>
}
