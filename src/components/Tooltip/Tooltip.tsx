import {FC, ReactNode, useState} from 'react'
import {TooltipIcon} from '../Icons/TooltipIcon'
import {IconProps} from '../Icons/Icons'
import Tippy, {TippyProps, UseSingletonProps} from "@tippyjs/react";
import {FlexBlock} from '../LayoutComponents/FlexBlock';


interface TooltipProps {
	children?: ReactNode,
	content: ReactNode,
	placement?: TippyProps['placement'],
	singleton?: TippyProps['singleton'],
	delay?: TippyProps['delay'],
	trigger?: TippyProps['trigger'],
	triggerTarget?: TippyProps['triggerTarget'],
	interactiveBorder?: TippyProps['interactiveBorder'],
	interactive?: TippyProps['interactive'],
	theme?: 'current' | 'light' | 'midnight',
	hideOnClick?: boolean | "toggle",
	maxWidth?: number | string,
	offset?: TippyProps['offset'],
	animation?: TippyProps['animation'],
	arrow?: TippyProps['arrow']
}

export interface OptionsTooltip {
	state: boolean,
	top: number | string,
	left: string | number,
	placement: TooltipProps['placement']
}

export const Tooltip: FC<TooltipProps & IconProps> = ({
																												children,
																												content,
																												placement = 'top',
																												singleton,
																												delay,
																												trigger = 'mouseenter',
																												triggerTarget,
																												interactiveBorder = 0,
																												interactive = false,
																												theme = 'current',
																												hideOnClick = 'toggle',
																												maxWidth = 300,
																												offset,
																												animation = 'shift-away',
																												arrow = true,
																												...iconProps
																											}) => {
	const [visible, setVisible] = useState(false)
	
	
	return (
		<Tippy
			hideOnClick={hideOnClick}
			content={content}
			offset={offset}
			theme={theme}
			arrow={arrow}
			interactive={interactive}
			interactiveBorder={interactiveBorder}
			singleton={singleton}
			delay={delay}
			maxWidth={maxWidth}
			animation={animation}
			trigger={trigger}
			triggerTarget={triggerTarget}
			placement={placement || 'top'}
			popperOptions={{
				strategy: "fixed"
			}}
		>
			<span>
				{children ? children : <TooltipIcon {...iconProps} />}
			</span>
		</Tippy>
	)
}
