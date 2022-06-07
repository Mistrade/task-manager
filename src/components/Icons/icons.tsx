import React, { FC, HTMLProps } from 'react'
import { defaultColor } from '../../common/constants'
import { FlexBlock, FlexBlockProps } from '../LayoutComponents/flexBlock'

interface IconProps {
  size?: number,
  color?: string,
  onClick?: (e: React.MouseEvent<HTMLDivElement>) => void
}

export const Male: FC<IconProps> = ( { size = 20, color = '#000' } ) => {
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
export const Female: FC<IconProps> = ( { size = 20, color = '#000' } ) => {
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

export const SadSmile: FC<IconProps> = ( { size = 100, color = 'darkorange' } ) => {
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

export const DoubleArrow: FC<IconProps & FlexBlockProps> = ( {
                                                               size = 24,
                                                               color = defaultColor,
                                                               ...props
                                                             } ) => {
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

export const Arrow: FC<IconProps & FlexBlockProps> = ( {
                                                         size = 24,
                                                         color = defaultColor,
                                                         ...props
                                                       } ) => {
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
