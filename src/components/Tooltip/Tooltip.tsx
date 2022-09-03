import {FC, ReactNode, useEffect, useRef, useState} from 'react'
import {TooltipContent, TooltipWrapper} from './Tooltip.styled'
import {TooltipIcon} from '../Icons/TooltipIcon'
import {IconProps} from '../Icons/Icons'
import {FlexBlock} from '../LayoutComponents/FlexBlock'

interface TooltipProps {
	children?: ReactNode,
	text: string,
	placement?: 'top' | 'bottom' | 'right'
}

export interface OptionsTooltip {
	state: boolean,
	top: number | string,
	left: string | number,
	placement: TooltipProps['placement']
}

export const Tooltip: FC<TooltipProps & IconProps> = ({
																												children,
																												text,
																												placement = 'top',
																												...iconProps
																											}) => {
	
	const [isHover, setIsHover] = useState(false)
	const ref = useRef<HTMLDivElement>(null)
	const containerRef = useRef<HTMLSpanElement>(null)
	const [options, setOptions] = useState<OptionsTooltip>({
		state: false,
		top: 0,
		left: 0,
		placement
	})
	
	useEffect(() => {
		if (ref.current && isHover && containerRef.current) {
			const coords = containerRef.current.getBoundingClientRect()
			if (placement === 'top') {
				let top: number | string = -1 * (ref.current.offsetHeight + 10)
				let place: TooltipProps['placement'] = placement
				if (coords.y < Math.abs(top)) {
					place = 'bottom'
					top = containerRef.current.offsetHeight + 10
				}
				
				return setOptions({
					state: true,
					placement: place,
					top,
					left: (containerRef.current.offsetWidth / 2) - (ref.current.offsetWidth / 2) - 2
				})
			}
			
			if (placement === 'bottom') {
				let top: number | string = containerRef.current.offsetHeight + 10
				let place: TooltipProps['placement'] = placement
				
				if ((window.innerHeight - coords.bottom) < ref.current.offsetHeight) {
					place = 'top'
					top = -1 * (ref.current.offsetHeight + 10)
				}
				
				return setOptions({
					placement: place,
					top,
					left: (containerRef.current.offsetWidth / 2) - (ref.current.offsetWidth / 2) - 2,
					state: true
				})
			}
			
			if (placement === 'right') {
				let top = -20
				let left = containerRef.current.offsetWidth + 20
				
				return setOptions({
					placement,
					state: true,
					left,
					top
				})
			}
			
		} else {
			setOptions(prev => ({
				...prev,
				state: false
			}))
		}
	}, [isHover, ref, containerRef, placement])
	
	useEffect(() => {
		console.log(options)
	}, [options])
	
	return (
		<TooltipWrapper
			ref={containerRef}
			onMouseEnter={() => {
				setIsHover(true)
			}}
			onMouseLeave={() => setIsHover(false)}
		>
			{children ? children : <TooltipIcon {...iconProps} />}
			<TooltipContent
				placement={options.placement}
				opacity={options.state ? 1 : 0}
				ref={ref}
				isVisible={isHover}
				top={options?.top || 0}
				left={options?.left || 0}
			>
				<FlexBlock width={'100%'}>
					{text}
				</FlexBlock>
			</TooltipContent>
		</TooltipWrapper>
	)
}
