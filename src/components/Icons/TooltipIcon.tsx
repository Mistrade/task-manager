import React, {FC} from 'react'
import {FlexBlockProps} from '../LayoutComponents/FlexBlock'
import {currentColor} from '../../common/constants'
import {IconProps} from './Icons'

export const TooltipIcon: FC<IconProps & FlexBlockProps> = ( {
                                                               size = 24,
                                                               color = currentColor,
                                                               ...props
                                                             } ) => {
  return (
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
        strokeWidth="2"
      >
        <circle
          cx="12"
          cy="12"
          r="10"
        />
        <path
          strokeLinecap="round"
          d="M10 8.484C10.5 7.494 11 7 12 7c1.246 0 2 .989 2 1.978s-.5 1.483-2 2.473V13m0 3.5v.5"
        />
      </g>
    </svg>
  )
}
