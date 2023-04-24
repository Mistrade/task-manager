import React, { FC } from 'react';

import {
  currentColor,
  defaultColor,
  priorityColors,
} from '@src/common/constants/constants';

import {
  FlexBlock,
  FlexBlockProps,
} from '@components/LayoutComponents/FlexBlock';

export interface IconProps {
  size?: number;
  color?: string;
  onClick?: (e: React.MouseEvent<HTMLDivElement>) => void;
}

export const Male: FC<IconProps> = ({ size = 20, color = '#000' }) => {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      aria-hidden='true'
      role='img'
      width={size}
      height={size}
      preserveAspectRatio='xMidYMid meet'
      viewBox='0 0 1024 1024'
    >
      <path
        fill={color}
        d='M874 120H622c-3.3 0-6 2.7-6 6v56c0 3.3 2.7 6 6 6h160.4L583.1 387.3c-50-38.5-111-59.3-175.1-59.3c-76.9 0-149.3 30-203.6 84.4S120 539.1 120 616s30 149.3 84.4 203.6C258.7 874 331.1 904 408 904s149.3-30 203.6-84.4C666 765.3 696 692.9 696 616c0-64.1-20.8-124.9-59.2-174.9L836 241.9V402c0 3.3 2.7 6 6 6h56c3.3 0 6-2.7 6-6V150c0-16.5-13.5-30-30-30zM408 828c-116.9 0-212-95.1-212-212s95.1-212 212-212s212 95.1 212 212s-95.1 212-212 212z'
      />
    </svg>
  );
};
export const SendIcon: FC<IconProps> = ({
  size = 20,
  color = currentColor,
}) => {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width={size}
      height={size}
      viewBox='0 0 28 28'
    >
      <path
        fill={color}
        d='M3.79 2.625c-.963-.46-2.021.42-1.746 1.451l2.016 7.533a1 1 0 0 0 .824.732l9.884 1.412c.286.04.286.454 0 .495l-9.883 1.411a1 1 0 0 0-.824.732l-2.017 7.537c-.275 1.03.783 1.91 1.746 1.451L25.288 15.13c.949-.452.949-1.804 0-2.257L3.79 2.626Z'
      />
    </svg>
  );
};
export const Female: FC<IconProps> = ({ size = 20, color = '#000' }) => {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      aria-hidden='true'
      role='img'
      width={size}
      height={size}
      preserveAspectRatio='xMidYMid meet'
      viewBox='0 0 1024 1024'
    >
      <path
        fill={color}
        d='M712.8 548.8c53.6-53.6 83.2-125 83.2-200.8c0-75.9-29.5-147.2-83.2-200.8C659.2 93.6 587.8 64 512 64s-147.2 29.5-200.8 83.2C257.6 200.9 228 272.1 228 348c0 63.8 20.9 124.4 59.4 173.9c7.3 9.4 15.2 18.3 23.7 26.9c8.5 8.5 17.5 16.4 26.8 23.7c39.6 30.8 86.3 50.4 136.1 57V736H360c-4.4 0-8 3.6-8 8v60c0 4.4 3.6 8 8 8h114v140c0 4.4 3.6 8 8 8h60c4.4 0 8-3.6 8-8V812h114c4.4 0 8-3.6 8-8v-60c0-4.4-3.6-8-8-8H550V629.5c61.5-8.2 118.2-36.1 162.8-80.7zM512 556c-55.6 0-107.7-21.6-147.1-60.9C325.6 455.8 304 403.6 304 348s21.6-107.7 60.9-147.1C404.2 161.5 456.4 140 512 140s107.7 21.6 147.1 60.9C698.4 240.2 720 292.4 720 348s-21.6 107.7-60.9 147.1C619.7 534.4 567.6 556 512 556z'
      />
    </svg>
  );
};

export const StarIcon: FC<IconProps & { fillColor?: string }> = ({
  size = 20,
  color = '#000',
  fillColor = 'none',
}) => {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width={size}
      height={size}
      preserveAspectRatio='xMidYMid meet'
      viewBox='0 0 24 24'
    >
      <path
        fill={fillColor}
        stroke={color}
        strokeLinecap='round'
        strokeLinejoin='round'
        strokeWidth='2'
        d='M11.074 2.633c.32-.844 1.531-.844 1.852 0l2.07 5.734a.99.99 0 0 0 .926.633h5.087c.94 0 1.35 1.17.611 1.743L18 14a.968.968 0 0 0-.322 1.092L19 20.695c.322.9-.72 1.673-1.508 1.119l-4.917-3.12a1 1 0 0 0-1.15 0l-4.917 3.12c-.787.554-1.83-.22-1.508-1.119l1.322-5.603A.968.968 0 0 0 6 14l-3.62-3.257C1.64 10.17 2.052 9 2.99 9h5.087a.989.989 0 0 0 .926-.633l2.07-5.734Z'
      />
    </svg>
  );
};

export const ArrowRightIcon: FC<IconProps & { fillColor?: string }> = ({
  size = 20,
  color = '#000',
  fillColor = 'none',
}) => {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width={size}
      height={size}
      preserveAspectRatio='xMidYMid meet'
      viewBox='0 0 32 32'
    >
      <path
        fill='none'
        stroke={color}
        strokeLinecap='round'
        strokeLinejoin='round'
        strokeWidth='2'
        d='m22 6l8 10l-8 10m8-10H2'
      />
    </svg>
  );
};

export const ArchiveIcon: FC<IconProps> = ({
  size = 20,
  color = currentColor,
}) => {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width={size}
      height={size}
      preserveAspectRatio='xMidYMid meet'
      viewBox='0 0 1536 1792'
    >
      <path
        fill={color}
        d='M640 384V256H512v128h128zm128 128V384H640v128h128zM640 640V512H512v128h128zm128 128V640H640v128h128zm700-388q28 28 48 76t20 88v1152q0 40-28 68t-68 28H96q-40 0-68-28t-28-68V96q0-40 28-68T96 0h896q40 0 88 20t76 48zm-444-244v376h376q-10-29-22-41l-313-313q-12-12-41-22zm384 1528V640H992q-40 0-68-28t-28-68V128H768v128H640V128H128v1536h1280zM781 943l107 349q8 27 8 52q0 83-72.5 137.5T640 1536t-183.5-54.5T384 1344q0-25 8-52q21-63 120-396V768h128v128h79q22 0 39 13t23 34zm-141 465q53 0 90.5-19t37.5-45t-37.5-45t-90.5-19t-90.5 19t-37.5 45t37.5 45t90.5 19z'
      />
    </svg>
  );
};

export const SadSmile: FC<IconProps> = ({
  size = 100,
  color = 'darkorange',
}) => {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      aria-hidden='true'
      role='img'
      width={size}
      height={size}
      preserveAspectRatio='xMidYMid meet'
      viewBox='0 0 48 48'
    >
      <g fill={color}>
        <path d='M14.807 23.233c-.683-.438-1.183-1.145-1.064-1.883a.5.5 0 0 1 .668-.389c1.818.675 3.846.256 5.642-1.448a.5.5 0 0 1 .818.203c.231.689.024 1.618-.48 2.382a3.794 3.794 0 0 1-2.654 1.665c-1.198.177-2.216-.073-2.93-.53Zm17.947 0c.683-.438 1.184-1.145 1.065-1.883a.5.5 0 0 0-.668-.389c-1.818.675-3.846.256-5.642-1.448a.5.5 0 0 0-.818.203c-.232.689-.024 1.618.48 2.382a3.794 3.794 0 0 0 2.653 1.665c1.199.177 2.216-.073 2.93-.53Zm-15.789 8.943c.097-.355.245-.72.431-1.005C18.664 29.225 21.151 28 23.892 28c2.646 0 5.048 1.139 6.354 2.962l.017.023a4.3 4.3 0 0 1 .278.403c.164.285.284.637.357.973a3.6 3.6 0 0 1 .076 1.123c-.038.356-.17.9-.64 1.268c-.523.41-1.15.372-1.656.195c-2.394-.782-3.53-1.12-4.648-1.126c-1.116-.006-2.277.317-4.714 1.128l-.008.003l-.008.002c-.56.176-1.222.216-1.772-.187c-.527-.386-.668-.976-.698-1.377a3.66 3.66 0 0 1 .135-1.214Z' />
        <path
          fillRule='evenodd'
          d='M42 24c0 9.941-8.059 18-18 18S6 33.941 6 24S14.059 6 24 6s18 8.059 18 18Zm-2 0c0 8.837-7.163 16-16 16S8 32.837 8 24S15.163 8 24 8s16 7.163 16 16Z'
          clipRule='evenodd'
        />
      </g>
    </svg>
  );
};

export const DoubleArrow: FC<IconProps & FlexBlockProps> = ({
  size = 24,
  color = defaultColor,
  ...props
}) => {
  return (
    <FlexBlock {...props} align={'center'} justify={'center'}>
      <svg
        xmlns='http://www.w3.org/2000/svg'
        aria-hidden='true'
        role='img'
        width={size}
        height={size}
        preserveAspectRatio='xMidYMid meet'
        viewBox='0 0 1024 1024'
      >
        <path
          fill={color}
          d='M452.864 149.312a29.12 29.12 0 0 1 41.728.064L826.24 489.664a32 32 0 0 1 0 44.672L494.592 874.624a29.12 29.12 0 0 1-41.728 0a30.592 30.592 0 0 1 0-42.752L764.736 512L452.864 192a30.592 30.592 0 0 1 0-42.688zm-256 0a29.12 29.12 0 0 1 41.728.064L570.24 489.664a32 32 0 0 1 0 44.672L238.592 874.624a29.12 29.12 0 0 1-41.728 0a30.592 30.592 0 0 1 0-42.752L508.736 512L196.864 192a30.592 30.592 0 0 1 0-42.688z'
        />
      </svg>
    </FlexBlock>
  );
};

export const TrashIcon: FC<IconProps & FlexBlockProps> = ({
  size = 24,
  color = defaultColor,
  ...props
}) => {
  return (
    <FlexBlock {...props} align={'center'} justify={'center'}>
      <svg
        xmlns='http://www.w3.org/2000/svg'
        width={size}
        height={size}
        preserveAspectRatio='xMidYMid meet'
        viewBox='0 0 24 24'
      >
        <path
          fill='none'
          stroke={color}
          strokeLinecap='round'
          strokeLinejoin='round'
          strokeWidth='2'
          d='M4 6h16l-1.58 14.22A2 2 0 0 1 16.432 22H7.568a2 2 0 0 1-1.988-1.78L4 6Zm3.345-2.853A2 2 0 0 1 9.154 2h5.692a2 2 0 0 1 1.81 1.147L18 6H6l1.345-2.853ZM2 6h20m-12 5v5m4-5v5'
        />
      </svg>
    </FlexBlock>
  );
};

export const LoaderIcon: FC<
  IconProps & FlexBlockProps & { strokeWidth?: number }
> = ({ size = 24, color = currentColor, strokeWidth = 2, ...props }) => {
  return (
    <FlexBlock {...props} align={'center'} justify={'center'}>
      <svg
        xmlns='http://www.w3.org/2000/svg'
        aria-hidden='true'
        role='img'
        width={size}
        height={size}
        preserveAspectRatio='xMidYMid meet'
        viewBox='0 0 24 24'
      >
        <g
          fill='none'
          stroke={color}
          strokeLinecap='round'
          strokeWidth={strokeWidth}
        >
          <path
            strokeDasharray='60'
            strokeDashoffset='60'
            strokeOpacity='.3'
            d='M12 3C16.9706 3 21 7.02944 21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3Z'
          >
            <animate
              fill='freeze'
              attributeName='stroke-dashoffset'
              dur='1.3s'
              values='60;0'
            />
          </path>
          <path
            strokeDasharray='15'
            strokeDashoffset='15'
            d='M12 3C16.9706 3 21 7.02944 21 12'
          >
            <animate
              fill='freeze'
              attributeName='stroke-dashoffset'
              dur='0.3s'
              values='15;0'
            />
            <animateTransform
              attributeName='transform'
              dur='1.5s'
              repeatCount='indefinite'
              type='rotate'
              values='0 12 12;360 12 12'
            />
          </path>
        </g>
      </svg>
    </FlexBlock>
  );
};

export const Arrow: FC<IconProps & FlexBlockProps> = ({
  size = 24,
  color = defaultColor,
  ...props
}) => {
  return (
    <FlexBlock {...props} align={'center'} justify={'center'}>
      <svg
        xmlns='http://www.w3.org/2000/svg'
        aria-hidden='true'
        role='img'
        width={size}
        height={size}
        preserveAspectRatio='xMidYMid meet'
        viewBox='0 0 1024 1024'
      >
        <path
          fill={color}
          d='M340.864 149.312a30.592 30.592 0 0 0 0 42.752L652.736 512L340.864 831.872a30.592 30.592 0 0 0 0 42.752a29.12 29.12 0 0 0 41.728 0L714.24 534.336a32 32 0 0 0 0-44.672L382.592 149.376a29.12 29.12 0 0 0-41.728 0z'
        />
      </svg>
    </FlexBlock>
  );
};

export const CompleteIcon: FC<IconProps & FlexBlockProps> = ({
  size = 24,
  color = currentColor,
  ...props
}) => {
  return (
    <FlexBlock {...props} align={'center'} justify={'center'}>
      <svg
        xmlns='http://www.w3.org/2000/svg'
        aria-hidden='true'
        role='img'
        width={size}
        height={size}
        preserveAspectRatio='xMidYMid meet'
        viewBox='0 0 24 24'
      >
        <path
          fill='none'
          stroke={color}
          strokeLinecap='round'
          strokeLinejoin='round'
          strokeWidth='2'
          d='m2 12l5.25 5l2.625-3M8 12l5.25 5L22 7m-6 0l-3.5 4'
        />
      </svg>
    </FlexBlock>
  );
};

export const PencilIcon: FC<IconProps & FlexBlockProps> = ({
  size = 24,
  color = currentColor,
  ...props
}) => {
  return (
    <FlexBlock {...props} align={'center'} justify={'center'}>
      <svg
        xmlns='http://www.w3.org/2000/svg'
        width={size}
        height={size}
        preserveAspectRatio='xMidYMid meet'
        viewBox='0 0 20 20'
      >
        <path
          fill={color}
          d='M13.586 3.586a2 2 0 1 1 2.828 2.828l-.793.793l-2.828-2.828l.793-.793Zm-2.207 2.207L3 14.172V17h2.828l8.38-8.379l-2.83-2.828Z'
        />
      </svg>
    </FlexBlock>
  );
};

export const CancelIcon: FC<IconProps & FlexBlockProps> = ({
  size = 24,
  color = currentColor,
  ...props
}) => {
  return (
    <FlexBlock {...props} align={'center'} justify={'center'}>
      <svg
        xmlns='http://www.w3.org/2000/svg'
        width={size}
        height={size}
        preserveAspectRatio='xMidYMid meet'
        viewBox='0 0 24 24'
      >
        <path
          fill={color}
          d='M12 2c5.5 0 10 4.5 10 10s-4.5 10-10 10S2 17.5 2 12S6.5 2 12 2m0 2c-1.9 0-3.6.6-4.9 1.7l11.2 11.2c1-1.4 1.7-3.1 1.7-4.9c0-4.4-3.6-8-8-8m4.9 14.3L5.7 7.1C4.6 8.4 4 10.1 4 12c0 4.4 3.6 8 8 8c1.9 0 3.6-.6 4.9-1.7Z'
        />
      </svg>
    </FlexBlock>
  );
};

export const WaitIcon: FC<IconProps & FlexBlockProps> = ({
  size = 24,
  color = currentColor,
  ...props
}) => {
  return (
    <FlexBlock {...props} align={'center'} justify={'center'}>
      <svg
        xmlns='http://www.w3.org/2000/svg'
        aria-hidden='true'
        role='img'
        width={size}
        height={size}
        preserveAspectRatio='xMidYMid meet'
        viewBox='0 0 16 16'
      >
        <g fill={color}>
          <path d='M8.515 1.019A7 7 0 0 0 8 1V0a8 8 0 0 1 .589.022l-.074.997zm2.004.45a7.003 7.003 0 0 0-.985-.299l.219-.976c.383.086.76.2 1.126.342l-.36.933zm1.37.71a7.01 7.01 0 0 0-.439-.27l.493-.87a8.025 8.025 0 0 1 .979.654l-.615.789a6.996 6.996 0 0 0-.418-.302zm1.834 1.79a6.99 6.99 0 0 0-.653-.796l.724-.69c.27.285.52.59.747.91l-.818.576zm.744 1.352a7.08 7.08 0 0 0-.214-.468l.893-.45a7.976 7.976 0 0 1 .45 1.088l-.95.313a7.023 7.023 0 0 0-.179-.483zm.53 2.507a6.991 6.991 0 0 0-.1-1.025l.985-.17c.067.386.106.778.116 1.17l-1 .025zm-.131 1.538c.033-.17.06-.339.081-.51l.993.123a7.957 7.957 0 0 1-.23 1.155l-.964-.267c.046-.165.086-.332.12-.501zm-.952 2.379c.184-.29.346-.594.486-.908l.914.405c-.16.36-.345.706-.555 1.038l-.845-.535zm-.964 1.205c.122-.122.239-.248.35-.378l.758.653a8.073 8.073 0 0 1-.401.432l-.707-.707z' />
          <path d='M8 1a7 7 0 1 0 4.95 11.95l.707.707A8.001 8.001 0 1 1 8 0v1z' />
          <path d='M7.5 3a.5.5 0 0 1 .5.5v5.21l3.248 1.856a.5.5 0 0 1-.496.868l-3.5-2A.5.5 0 0 1 7 9V3.5a.5.5 0 0 1 .5-.5z' />
        </g>
      </svg>
    </FlexBlock>
  );
};

export const ReviewIcon: FC<IconProps & FlexBlockProps> = ({
  size = 24,
  color = currentColor,
  ...props
}) => {
  return (
    <FlexBlock {...props} align={'center'} justify={'center'}>
      <svg
        xmlns='http://www.w3.org/2000/svg'
        width={size}
        height={size}
        viewBox='0 0 48 48'
      >
        <path
          fill={color}
          fillRule='evenodd'
          d='M39 13a3 3 0 0 0-3 3v2h6v-2a3 3 0 0 0-3-3Zm3 7h-6v16.5l3 4.5l3-4.5V20ZM6 9v30a3 3 0 0 0 3 3h22a3 3 0 0 0 3-3V9a3 3 0 0 0-3-3H9a3 3 0 0 0-3 3Zm14 6a1 1 0 0 1 1-1h8a1 1 0 1 1 0 2h-8a1 1 0 0 1-1-1Zm1 3a1 1 0 1 0 0 2h8a1 1 0 1 0 0-2h-8Zm-1 10a1 1 0 0 1 1-1h8a1 1 0 1 1 0 2h-8a1 1 0 0 1-1-1Zm1 3a1 1 0 1 0 0 2h8a1 1 0 1 0 0-2h-8Zm-9-3v3h3v-3h-3Zm-1-2h5a1 1 0 0 1 1 1v5a1 1 0 0 1-1 1h-5a1 1 0 0 1-1-1v-5a1 1 0 0 1 1-1Zm6.707-10.293a1 1 0 0 0-1.414-1.414L13 17.586l-1.293-1.293a1 1 0 0 0-1.414 1.414L13 20.414l4.707-4.707Z'
          clipRule='evenodd'
        />
      </svg>
    </FlexBlock>
  );
};

export const FiltersIcon: FC<IconProps & FlexBlockProps> = ({
  size = 24,
  color = currentColor,
  ...props
}) => {
  return (
    <FlexBlock {...props} align={'center'} justify={'center'}>
      <svg
        xmlns='http://www.w3.org/2000/svg'
        width={size}
        height={size}
        viewBox='0 0 24 24'
      >
        <path
          fill={color}
          d='M9 5a1 1 0 1 0 0 2a1 1 0 0 0 0-2zM6.17 5a3.001 3.001 0 0 1 5.66 0H19a1 1 0 1 1 0 2h-7.17a3.001 3.001 0 0 1-5.66 0H5a1 1 0 0 1 0-2h1.17zM15 11a1 1 0 1 0 0 2a1 1 0 0 0 0-2zm-2.83 0a3.001 3.001 0 0 1 5.66 0H19a1 1 0 1 1 0 2h-1.17a3.001 3.001 0 0 1-5.66 0H5a1 1 0 1 1 0-2h7.17zM9 17a1 1 0 1 0 0 2a1 1 0 0 0 0-2zm-2.83 0a3.001 3.001 0 0 1 5.66 0H19a1 1 0 1 1 0 2h-7.17a3.001 3.001 0 0 1-5.66 0H5a1 1 0 1 1 0-2h1.17z'
        />
      </svg>
    </FlexBlock>
  );
};
export const SettingsIcon: FC<IconProps & FlexBlockProps> = ({
  size = 24,
  color = currentColor,
  ...props
}) => {
  return (
    <FlexBlock {...props} align={'center'} justify={'center'}>
      <svg
        xmlns='http://www.w3.org/2000/svg'
        width={size}
        height={size}
        viewBox='0 0 32 32'
      >
        <path
          fill={color}
          d='M27 16.76v-1.53l1.92-1.68A2 2 0 0 0 29.3 11l-2.36-4a2 2 0 0 0-1.73-1a2 2 0 0 0-.64.1l-2.43.82a11.35 11.35 0 0 0-1.31-.75l-.51-2.52a2 2 0 0 0-2-1.61h-4.68a2 2 0 0 0-2 1.61l-.51 2.52a11.48 11.48 0 0 0-1.32.75l-2.38-.86A2 2 0 0 0 6.79 6a2 2 0 0 0-1.73 1L2.7 11a2 2 0 0 0 .41 2.51L5 15.24v1.53l-1.89 1.68A2 2 0 0 0 2.7 21l2.36 4a2 2 0 0 0 1.73 1a2 2 0 0 0 .64-.1l2.43-.82a11.35 11.35 0 0 0 1.31.75l.51 2.52a2 2 0 0 0 2 1.61h4.72a2 2 0 0 0 2-1.61l.51-2.52a11.48 11.48 0 0 0 1.32-.75l2.42.82a2 2 0 0 0 .64.1a2 2 0 0 0 1.73-1l2.28-4a2 2 0 0 0-.41-2.51ZM25.21 24l-3.43-1.16a8.86 8.86 0 0 1-2.71 1.57L18.36 28h-4.72l-.71-3.55a9.36 9.36 0 0 1-2.7-1.57L6.79 24l-2.36-4l2.72-2.4a8.9 8.9 0 0 1 0-3.13L4.43 12l2.36-4l3.43 1.16a8.86 8.86 0 0 1 2.71-1.57L13.64 4h4.72l.71 3.55a9.36 9.36 0 0 1 2.7 1.57L25.21 8l2.36 4l-2.72 2.4a8.9 8.9 0 0 1 0 3.13L27.57 20Z'
        />
        <path
          fill={color}
          d='M16 22a6 6 0 1 1 6-6a5.94 5.94 0 0 1-6 6Zm0-10a3.91 3.91 0 0 0-4 4a3.91 3.91 0 0 0 4 4a3.91 3.91 0 0 0 4-4a3.91 3.91 0 0 0-4-4Z'
        />
      </svg>
    </FlexBlock>
  );
};
export const ProcessIcon: FC<IconProps & FlexBlockProps> = ({
  size = 24,
  color = currentColor,
  ...props
}) => {
  return (
    <FlexBlock {...props} align={'center'} justify={'center'}>
      <svg
        xmlns='http://www.w3.org/2000/svg'
        aria-hidden='true'
        role='img'
        width={size}
        height={size}
        preserveAspectRatio='xMidYMid meet'
        viewBox='0 0 24 24'
      >
        <path
          fill={color}
          d='M6.992 14.502a1 1 0 0 0-1 1v1.782a7.972 7.972 0 0 1-2-5.282a7.29 7.29 0 0 1 .052-.88a1 1 0 1 0-1.985-.24a9.173 9.173 0 0 0-.067 1.12a9.964 9.964 0 0 0 2.417 6.5H2.992a1 1 0 1 0 0 2h4a.982.982 0 0 0 .794-.422c.011-.015.026-.027.037-.043c.007-.01.007-.022.013-.032a.966.966 0 0 0 .106-.258a.952.952 0 0 0 .032-.156c.003-.03.018-.057.018-.089v-4a1 1 0 0 0-1-1Zm1.5-8.5H6.709a7.974 7.974 0 0 1 5.283-2a7.075 7.075 0 0 1 .88.053a1 1 0 0 0 .24-1.987a9.227 9.227 0 0 0-1.12-.066a9.964 9.964 0 0 0-6.5 2.417V3.002a1 1 0 0 0-2 0v4a.954.954 0 0 0 .039.195a.969.969 0 0 0 .141.346l.012.017a.973.973 0 0 0 .244.246c.011.008.017.02.028.028c.014.01.03.013.045.021a.958.958 0 0 0 .18.084a.988.988 0 0 0 .261.053c.018 0 .032.01.05.01h4a1 1 0 0 0 0-2Zm11.96 10.804a.967.967 0 0 0-.141-.345l-.011-.017a.973.973 0 0 0-.245-.246c-.011-.008-.016-.02-.028-.028c-.01-.007-.023-.007-.034-.014a1.154 1.154 0 0 0-.41-.136c-.032-.003-.059-.018-.091-.018h-4a1 1 0 0 0 0 2h1.782a7.973 7.973 0 0 1-5.282 2a7.074 7.074 0 0 1-.88-.054a1 1 0 0 0-.24 1.987a9.365 9.365 0 0 0 1.12.067a9.964 9.964 0 0 0 6.5-2.417v1.417a1 1 0 0 0 2 0v-4a.953.953 0 0 0-.04-.195Zm.54-11.304a1 1 0 0 0 0-2h-4a.952.952 0 0 0-.192.039l-.007.001a.968.968 0 0 0-.34.14l-.02.013a.974.974 0 0 0-.245.244c-.008.01-.02.016-.028.027c-.007.01-.007.023-.014.034a1.146 1.146 0 0 0-.136.413c-.003.03-.018.057-.018.089v4a1 1 0 1 0 2 0V6.719a7.975 7.975 0 0 1 2 5.283a7.289 7.289 0 0 1-.053.88a1.001 1.001 0 0 0 .872 1.113a1.03 1.03 0 0 0 .122.007a1 1 0 0 0 .991-.88a9.174 9.174 0 0 0 .068-1.12a9.964 9.964 0 0 0-2.417-6.5Z'
        />
      </svg>
    </FlexBlock>
  );
};

export const CreatedIcon: FC<IconProps & FlexBlockProps> = ({
  size = 24,
  color = currentColor,
  ...props
}) => {
  return (
    <FlexBlock {...props} align={'center'} justify={'center'}>
      <svg
        xmlns='http://www.w3.org/2000/svg'
        aria-hidden='true'
        role='img'
        width={size}
        height={size}
        preserveAspectRatio='xMidYMid meet'
        viewBox='0 0 16 16'
      >
        <path
          fill={color}
          fillRule='evenodd'
          d='M5.616 4.928a2.487 2.487 0 0 1-1.119.922c-.148.06-.458.138-.458.138v5.008a2.51 2.51 0 0 1 1.579 1.062c.273.412.419.895.419 1.388c.008.343-.057.684-.19 1A2.485 2.485 0 0 1 3.5 15.984a2.482 2.482 0 0 1-1.388-.419A2.487 2.487 0 0 1 1.05 13c.095-.486.331-.932.68-1.283c.349-.343.79-.579 1.269-.68V5.949a2.6 2.6 0 0 1-1.269-.68a2.503 2.503 0 0 1-.68-1.283a2.487 2.487 0 0 1 1.06-2.565A2.49 2.49 0 0 1 3.5 1a2.504 2.504 0 0 1 1.807.729a2.493 2.493 0 0 1 .729 1.81c.002.494-.144.978-.42 1.389zm-.756 7.861a1.5 1.5 0 0 0-.552-.579a1.45 1.45 0 0 0-.77-.21a1.495 1.495 0 0 0-1.47 1.79a1.493 1.493 0 0 0 1.18 1.179c.288.058.586.03.86-.08c.276-.117.512-.312.68-.56c.15-.226.235-.49.249-.76a1.51 1.51 0 0 0-.177-.78zM2.708 4.741c.247.161.536.25.83.25c.271 0 .538-.075.77-.211a1.514 1.514 0 0 0 .729-1.359a1.513 1.513 0 0 0-.25-.76a1.551 1.551 0 0 0-.68-.56a1.49 1.49 0 0 0-.86-.08a1.494 1.494 0 0 0-1.179 1.18c-.058.288-.03.586.08.86c.117.276.312.512.56.68zM13.037 7h-1.002V5.49a1.5 1.5 0 0 0-1.5-1.5H8.687l1.269 1.27l-.71.709L7.117 3.84v-.7l2.13-2.13l.71.711l-1.269 1.27h1.85a2.484 2.484 0 0 1 2.312 1.541c.125.302.189.628.187.957V7zM13 16h-1v-3H9v-1h3V9h1v3h3v1h-3v3z'
          clipRule='evenodd'
        />
      </svg>
    </FlexBlock>
  );
};

export const BurgerIcon: FC<IconProps & FlexBlockProps> = ({
  size = 20,
  color = priorityColors['medium'],
  ...props
}) => {
  return (
    <FlexBlock {...props} align={'center'} justify={'center'}>
      <svg
        xmlns='http://www.w3.org/2000/svg'
        aria-hidden='true'
        role='img'
        width={size}
        height={size}
        preserveAspectRatio='xMidYMid meet'
        viewBox='0 0 24 24'
      >
        <path
          fill={color}
          d='M4 5h16c.55 0 1-.45 1-1s-.45-1-1-1H4c-.55 0-1 .45-1 1s.45 1 1 1zm16 14H4c-.55 0-1 .45-1 1s.45 1 1 1h16c.55 0 1-.45 1-1s-.45-1-1-1zm0-8H4c-.55 0-1 .45-1 1s.45 1 1 1h16c.55 0 1-.45 1-1s-.45-1-1-1z'
        />
      </svg>
    </FlexBlock>
  );
};

export const SelectIcon: FC<IconProps & FlexBlockProps> = ({
  size = 20,
  color = priorityColors['medium'],
  ...props
}) => {
  return (
    <FlexBlock {...props} align={'center'} justify={'center'}>
      <svg
        xmlns='http://www.w3.org/2000/svg'
        width={size}
        height={size}
        preserveAspectRatio='xMidYMid meet'
        viewBox='0 0 1024 1024'
      >
        <path
          fill={color}
          d='M77.248 415.04a64 64 0 0 1 90.496 0l226.304 226.304L846.528 188.8a64 64 0 1 1 90.56 90.496l-543.04 543.04l-316.8-316.8a64 64 0 0 1 0-90.496z'
        />
      </svg>
    </FlexBlock>
  );
};

export const PlusIcon: FC<IconProps & FlexBlockProps> = ({
  size = 20,
  color = priorityColors['medium'],
  ...props
}) => {
  return (
    <FlexBlock {...props} align={'center'} justify={'center'}>
      <svg
        xmlns='http://www.w3.org/2000/svg'
        width={size}
        height={size}
        preserveAspectRatio='xMidYMid meet'
        viewBox='0 0 24 24'
      >
        <path
          fill='none'
          stroke={color}
          strokeLinecap='round'
          strokeWidth='2'
          d='M12 20v-8m0 0V4m0 8h8m-8 0H4'
        />
      </svg>
    </FlexBlock>
  );
};

export const ChildOfIcon: FC<IconProps & FlexBlockProps> = ({
  size = 20,
  color = priorityColors['medium'],
  ...props
}) => {
  return (
    <FlexBlock {...props} align={'center'} justify={'center'}>
      <svg
        width='380'
        height='358'
        viewBox='0 0 380 358'
        fill='none'
        xmlns='http://www.w3.org/2000/svg'
      >
        <rect width='380' height='358' fill='white' />
        <rect x='20' y='20' width='340' height='50' rx='12' fill='white' />
        <rect
          x='21'
          y='21'
          width='338'
          height='48'
          rx='11'
          stroke='#6495ED'
          strokeOpacity='0.9'
          strokeWidth='2'
        />
        <rect x='40' y='28' width='300' height='14' rx='7' fill='#D9D9D9' />
        <rect x='40' y='48' width='300' height='14' rx='7' fill='#D9D9D9' />
        <rect x='80' y='87' width='280' height='50' rx='12' fill='white' />
        <rect
          x='81'
          y='88'
          width='278'
          height='48'
          rx='11'
          stroke='#6495ED'
          strokeOpacity='0.9'
          strokeWidth='2'
        />
        <rect
          x='96.4706'
          y='95'
          width='247.059'
          height='14'
          rx='7'
          fill='#D9D9D9'
        />
        <rect
          x='96.4706'
          y='115'
          width='247.059'
          height='14'
          rx='7'
          fill='#D9D9D9'
        />
        <rect x='80' y='154' width='280' height='50' rx='12' fill='white' />
        <rect
          x='81'
          y='155'
          width='278'
          height='48'
          rx='11'
          stroke='#6495ED'
          strokeOpacity='0.9'
          strokeWidth='2'
        />
        <rect
          x='96.4706'
          y='162'
          width='247.059'
          height='14'
          rx='7'
          fill='#D9D9D9'
        />
        <rect
          x='96.4706'
          y='182'
          width='247.059'
          height='14'
          rx='7'
          fill='#D9D9D9'
        />
        <rect x='140' y='221' width='220' height='50' rx='12' fill='white' />
        <rect
          x='141'
          y='222'
          width='218'
          height='48'
          rx='11'
          stroke='#6495ED'
          strokeOpacity='0.9'
          strokeWidth='2'
        />
        <rect
          x='152.941'
          y='229'
          width='194.118'
          height='14'
          rx='7'
          fill='#D9D9D9'
        />
        <rect
          x='152.941'
          y='249'
          width='194.118'
          height='14'
          rx='7'
          fill='#D9D9D9'
        />
        <rect x='140' y='288' width='220' height='50' rx='12' fill='white' />
        <rect
          x='141'
          y='289'
          width='218'
          height='48'
          rx='11'
          stroke='#6495ED'
          strokeOpacity='0.9'
          strokeWidth='2'
        />
        <rect
          x='152.941'
          y='296'
          width='194.118'
          height='14'
          rx='7'
          fill='#D9D9D9'
        />
        <rect
          x='152.941'
          y='316'
          width='194.118'
          height='14'
          rx='7'
          fill='#D9D9D9'
        />
        <line
          x1='60.7757'
          y1='69.9995'
          x2='60.7757'
          y2='179'
          stroke='#1E1E1E'
          strokeOpacity='0.1'
          strokeWidth='2'
        />
        <line
          x1='60'
          y1='111'
          x2='80'
          y2='111'
          stroke='#1E1E1E'
          strokeOpacity='0.1'
          strokeWidth='2'
        />
        <line
          x1='60'
          y1='178'
          x2='80'
          y2='178'
          stroke='#1E1E1E'
          strokeOpacity='0.1'
          strokeWidth='2'
        />
        <line
          x1='121.224'
          y1='204'
          x2='121.224'
          y2='313'
          stroke='#1E1E1E'
          strokeOpacity='0.1'
          strokeWidth='2'
        />
        <line
          x1='120.449'
          y1='245'
          x2='140.449'
          y2='245'
          stroke='#1E1E1E'
          strokeOpacity='0.1'
          strokeWidth='2'
        />
        <line
          x1='120.449'
          y1='312'
          x2='140.449'
          y2='312'
          stroke='#1E1E1E'
          strokeOpacity='0.1'
          strokeWidth='2'
        />
      </svg>
    </FlexBlock>
  );
};

export const ParentOfIcon: FC<IconProps & FlexBlockProps> = ({
  size = 20,
  color = priorityColors['medium'],
  ...props
}) => {
  return (
    <FlexBlock {...props} align={'center'} justify={'center'}>
      <svg
        width='380'
        height='266'
        viewBox='0 0 380 266'
        fill='none'
        xmlns='http://www.w3.org/2000/svg'
      >
        <rect width='380' height='266' fill='white' />
        <rect x='20' y='25' width='340' height='216' rx='12' fill='white' />
        <rect
          x='21'
          y='26'
          width='338'
          height='214'
          rx='11'
          stroke='#6495ED'
          strokeOpacity='0.9'
          strokeWidth='2'
        />
        <rect x='30' y='50' width='320' height='65' rx='12' fill='white' />
        <rect
          x='31'
          y='51'
          width='318'
          height='63'
          rx='11'
          stroke='#6495ED'
          strokeOpacity='0.9'
          strokeWidth='2'
        />
        <rect
          x='48.8235'
          y='60.4'
          width='282.353'
          height='18.2'
          rx='9.1'
          fill='#D9D9D9'
        />
        <rect
          x='48.8235'
          y='86.4'
          width='282.353'
          height='18.2'
          rx='9.1'
          fill='#D9D9D9'
        />
        <rect x='30' y='151' width='320' height='65' rx='12' fill='white' />
        <rect
          x='31'
          y='152'
          width='318'
          height='63'
          rx='11'
          stroke='#6495ED'
          strokeOpacity='0.9'
          strokeWidth='2'
        />
        <rect
          x='48.8235'
          y='161.4'
          width='282.353'
          height='18.2'
          rx='9.1'
          fill='#D9D9D9'
        />
        <rect
          x='48.8235'
          y='187.4'
          width='282.353'
          height='18.2'
          rx='9.1'
          fill='#D9D9D9'
        />
      </svg>
    </FlexBlock>
  );
};

export const CompletedAfterIcon: FC<IconProps & FlexBlockProps> = ({
  size = 20,
  color = priorityColors['medium'],
  ...props
}) => {
  return (
    <FlexBlock {...props} align={'center'} justify={'center'}>
      <svg
        width='380'
        height='266'
        viewBox='0 0 380 266'
        fill='none'
        xmlns='http://www.w3.org/2000/svg'
      >
        <rect width='380' height='266' fill='white' />
        <rect x='20' y='25' width='340' height='216' rx='12' fill='white' />
        <rect
          x='21'
          y='26'
          width='338'
          height='214'
          rx='11'
          stroke='#6495ED'
          strokeOpacity='0.9'
          strokeWidth='2'
        />
        <rect x='85' y='55' width='260' height='65' rx='12' fill='white' />
        <rect
          x='86'
          y='56'
          width='258'
          height='63'
          rx='11'
          stroke='#6495ED'
          strokeOpacity='0.9'
          strokeWidth='2'
        />
        <rect
          x='100.294'
          y='65.4'
          width='229.412'
          height='18.2'
          rx='9.1'
          fill='#D9D9D9'
        />
        <rect
          x='100.294'
          y='91.4'
          width='229.412'
          height='18.2'
          rx='9.1'
          fill='#D9D9D9'
        />
        <rect x='85' y='146' width='260' height='65' rx='12' fill='white' />
        <rect
          x='86'
          y='147'
          width='258'
          height='63'
          rx='11'
          stroke='#6495ED'
          strokeOpacity='0.9'
          strokeWidth='2'
        />
        <rect
          x='100.294'
          y='156.4'
          width='229.412'
          height='18.2'
          rx='9.1'
          fill='#D9D9D9'
        />
        <rect
          x='100.294'
          y='182.4'
          width='229.412'
          height='18.2'
          rx='9.1'
          fill='#D9D9D9'
        />
        <path
          d='M62.8333 77.5C62.6792 77.3455 62.496 77.2229 62.2944 77.1393C62.0928 77.0557 61.8766 77.0126 61.6583 77.0126C61.4401 77.0126 61.2239 77.0557 61.0223 77.1393C60.8207 77.2229 60.6375 77.3455 60.4833 77.5L51.0833 86.9L53.4333 89.25L62.8333 79.8333C63.4667 79.2 63.4667 78.1333 62.8333 77.5ZM69.9 77.4833L53.4333 93.95L47.6333 88.1667C47.3217 87.855 46.8991 87.68 46.4583 87.68C46.0176 87.68 45.595 87.855 45.2833 88.1667C44.9717 88.4783 44.7966 88.901 44.7966 89.3417C44.7966 89.7824 44.9717 90.205 45.2833 90.5167L52.25 97.4833C52.9 98.1333 53.95 98.1333 54.6 97.4833L72.25 79.85C72.4045 79.6958 72.5271 79.5127 72.6107 79.311C72.6944 79.1094 72.7374 78.8933 72.7374 78.675C72.7374 78.4567 72.6944 78.2406 72.6107 78.039C72.5271 77.8373 72.4045 77.6542 72.25 77.5H72.2333C72.083 77.3427 71.9025 77.2172 71.7027 77.1309C71.5029 77.0446 71.2878 76.9994 71.0702 76.9978C70.8526 76.9963 70.6369 77.0384 70.4358 77.1218C70.2348 77.2052 70.0526 77.3282 69.9 77.4833ZM35.8667 90.5333L42.8333 97.5C43.4833 98.15 44.5333 98.15 45.1833 97.5L46.35 96.3333L38.2167 88.1667C38.0625 88.0122 37.8793 87.8896 37.6777 87.806C37.4761 87.7223 37.26 87.6793 37.0417 87.6793C36.8234 87.6793 36.6073 87.7223 36.4056 87.806C36.204 87.8896 36.0209 88.0122 35.8667 88.1667C35.2167 88.8167 35.2167 89.8833 35.8667 90.5333Z'
          fill='#6495ED'
          fillOpacity='0.9'
        />
        <path
          d='M63.8333 165.5C63.6792 165.346 63.496 165.223 63.2944 165.139C63.0928 165.056 62.8766 165.013 62.6583 165.013C62.4401 165.013 62.2239 165.056 62.0223 165.139C61.8207 165.223 61.6375 165.346 61.4833 165.5L52.0833 174.9L54.4333 177.25L63.8333 167.833C64.4667 167.2 64.4667 166.133 63.8333 165.5ZM70.9 165.483L54.4333 181.95L48.6333 176.167C48.3217 175.855 47.8991 175.68 47.4583 175.68C47.0176 175.68 46.595 175.855 46.2833 176.167C45.9717 176.478 45.7966 176.901 45.7966 177.342C45.7966 177.782 45.9717 178.205 46.2833 178.517L53.25 185.483C53.9 186.133 54.95 186.133 55.6 185.483L73.25 167.85C73.4045 167.696 73.5271 167.513 73.6107 167.311C73.6944 167.109 73.7374 166.893 73.7374 166.675C73.7374 166.457 73.6944 166.241 73.6107 166.039C73.5271 165.837 73.4045 165.654 73.25 165.5H73.2333C73.083 165.343 72.9025 165.217 72.7027 165.131C72.5029 165.045 72.2878 164.999 72.0702 164.998C71.8526 164.996 71.6369 165.038 71.4358 165.122C71.2348 165.205 71.0526 165.328 70.9 165.483ZM36.8667 178.533L43.8333 185.5C44.4833 186.15 45.5333 186.15 46.1833 185.5L47.35 184.333L39.2167 176.167C39.0625 176.012 38.8793 175.89 38.6777 175.806C38.4761 175.722 38.26 175.679 38.0417 175.679C37.8234 175.679 37.6073 175.722 37.4056 175.806C37.204 175.89 37.0209 176.012 36.8667 176.167C36.2167 176.817 36.2167 177.883 36.8667 178.533Z'
          fill='#6495ED'
          fillOpacity='0.9'
        />
      </svg>
    </FlexBlock>
  );
};

export const ApprovedAfterIcon: FC<IconProps & FlexBlockProps> = ({
  size = 20,
  color = priorityColors['medium'],
  ...props
}) => {
  return (
    <FlexBlock {...props} align={'center'} justify={'center'}>
      <svg
        width='441'
        height='358'
        viewBox='0 0 441 358'
        fill='none'
        xmlns='http://www.w3.org/2000/svg'
      >
        <rect width='441' height='358' fill='white' />
        <rect x='79' y='20' width='340' height='50' rx='12' fill='white' />
        <rect
          x='80'
          y='21'
          width='338'
          height='48'
          rx='11'
          stroke='#6495ED'
          strokeOpacity='0.9'
          strokeWidth='2'
        />
        <rect x='99' y='28' width='300' height='14' rx='7' fill='#D9D9D9' />
        <rect x='99' y='48' width='300' height='14' rx='7' fill='#D9D9D9' />
        <path
          d='M42 30C50.2843 30 57 36.7157 57 45C57 53.2843 50.2843 60 42 60C33.7157 60 27 53.2843 27 45C27 36.7157 33.7157 30 42 30Z'
          stroke='#D9D9D9'
          strokeWidth='4'
          strokeLinecap='round'
        />
        <path
          d='M42 30C50.2843 30 57 36.7157 57 45'
          stroke='#6495ED'
          strokeWidth='4'
          strokeLinecap='round'
        />
        <rect x='139' y='87' width='280' height='50' rx='12' fill='white' />
        <rect
          x='140'
          y='88'
          width='278'
          height='48'
          rx='11'
          stroke='#6495ED'
          strokeOpacity='0.9'
          strokeWidth='2'
        />
        <rect
          x='155.471'
          y='95'
          width='247.059'
          height='14'
          rx='7'
          fill='#D9D9D9'
        />
        <rect
          x='155.471'
          y='115'
          width='247.059'
          height='14'
          rx='7'
          fill='#D9D9D9'
        />
        <path
          d='M117.833 102.5C117.679 102.346 117.496 102.223 117.294 102.139C117.093 102.056 116.877 102.013 116.658 102.013C116.44 102.013 116.224 102.056 116.022 102.139C115.821 102.223 115.638 102.346 115.483 102.5L106.083 111.9L108.433 114.25L117.833 104.833C118.467 104.2 118.467 103.133 117.833 102.5ZM124.9 102.483L108.433 118.95L102.633 113.167C102.322 112.855 101.899 112.68 101.458 112.68C101.018 112.68 100.595 112.855 100.283 113.167C99.9717 113.478 99.7966 113.901 99.7966 114.342C99.7966 114.782 99.9717 115.205 100.283 115.517L107.25 122.483C107.9 123.133 108.95 123.133 109.6 122.483L127.25 104.85C127.404 104.696 127.527 104.513 127.611 104.311C127.694 104.109 127.737 103.893 127.737 103.675C127.737 103.457 127.694 103.241 127.611 103.039C127.527 102.837 127.404 102.654 127.25 102.5H127.233C127.083 102.343 126.903 102.217 126.703 102.131C126.503 102.045 126.288 101.999 126.07 101.998C125.853 101.996 125.637 102.038 125.436 102.122C125.235 102.205 125.053 102.328 124.9 102.483ZM90.8667 115.533L97.8333 122.5C98.4833 123.15 99.5333 123.15 100.183 122.5L101.35 121.333L93.2167 113.167C93.0625 113.012 92.8793 112.89 92.6777 112.806C92.4761 112.722 92.2599 112.679 92.0417 112.679C91.8234 112.679 91.6072 112.722 91.4056 112.806C91.204 112.89 91.0208 113.012 90.8667 113.167C90.2167 113.817 90.2167 114.883 90.8667 115.533Z'
          fill='#6495ED'
          fillOpacity='0.9'
        />
        <path
          d='M118.833 169.5C118.679 169.346 118.496 169.223 118.294 169.139C118.093 169.056 117.877 169.013 117.658 169.013C117.44 169.013 117.224 169.056 117.022 169.139C116.821 169.223 116.638 169.346 116.483 169.5L107.083 178.9L109.433 181.25L118.833 171.833C119.467 171.2 119.467 170.133 118.833 169.5ZM125.9 169.483L109.433 185.95L103.633 180.167C103.322 179.855 102.899 179.68 102.458 179.68C102.018 179.68 101.595 179.855 101.283 180.167C100.972 180.478 100.797 180.901 100.797 181.342C100.797 181.782 100.972 182.205 101.283 182.517L108.25 189.483C108.9 190.133 109.95 190.133 110.6 189.483L128.25 171.85C128.404 171.696 128.527 171.513 128.611 171.311C128.694 171.109 128.737 170.893 128.737 170.675C128.737 170.457 128.694 170.241 128.611 170.039C128.527 169.837 128.404 169.654 128.25 169.5H128.233C128.083 169.343 127.903 169.217 127.703 169.131C127.503 169.045 127.288 168.999 127.07 168.998C126.853 168.996 126.637 169.038 126.436 169.122C126.235 169.205 126.053 169.328 125.9 169.483ZM91.8667 182.533L98.8333 189.5C99.4833 190.15 100.533 190.15 101.183 189.5L102.35 188.333L94.2167 180.167C94.0625 180.012 93.8793 179.89 93.6777 179.806C93.4761 179.722 93.2599 179.679 93.0417 179.679C92.8234 179.679 92.6072 179.722 92.4056 179.806C92.204 179.89 92.0208 180.012 91.8667 180.167C91.2167 180.817 91.2167 181.883 91.8667 182.533Z'
          fill='#6495ED'
          fillOpacity='0.9'
        />
        <path
          d='M118.833 236.5C118.679 236.345 118.496 236.223 118.294 236.139C118.093 236.056 117.877 236.013 117.658 236.013C117.44 236.013 117.224 236.056 117.022 236.139C116.821 236.223 116.638 236.345 116.483 236.5L107.083 245.9L109.433 248.25L118.833 238.833C119.467 238.2 119.467 237.133 118.833 236.5ZM125.9 236.483L109.433 252.95L103.633 247.167C103.322 246.855 102.899 246.68 102.458 246.68C102.018 246.68 101.595 246.855 101.283 247.167C100.972 247.478 100.797 247.901 100.797 248.342C100.797 248.782 100.972 249.205 101.283 249.517L108.25 256.483C108.9 257.133 109.95 257.133 110.6 256.483L128.25 238.85C128.404 238.696 128.527 238.513 128.611 238.311C128.694 238.109 128.737 237.893 128.737 237.675C128.737 237.457 128.694 237.241 128.611 237.039C128.527 236.837 128.404 236.654 128.25 236.5H128.233C128.083 236.343 127.903 236.217 127.703 236.131C127.503 236.045 127.288 235.999 127.07 235.998C126.853 235.996 126.637 236.038 126.436 236.122C126.235 236.205 126.053 236.328 125.9 236.483ZM91.8667 249.533L98.8333 256.5C99.4833 257.15 100.533 257.15 101.183 256.5L102.35 255.333L94.2167 247.167C94.0625 247.012 93.8793 246.89 93.6777 246.806C93.4761 246.722 93.2599 246.679 93.0417 246.679C92.8234 246.679 92.6072 246.722 92.4056 246.806C92.204 246.89 92.0208 247.012 91.8667 247.167C91.2167 247.817 91.2167 248.883 91.8667 249.533Z'
          fill='#6495ED'
          fillOpacity='0.9'
        />
        <path
          d='M118.833 303.5C118.679 303.345 118.496 303.223 118.294 303.139C118.093 303.056 117.877 303.013 117.658 303.013C117.44 303.013 117.224 303.056 117.022 303.139C116.821 303.223 116.638 303.345 116.483 303.5L107.083 312.9L109.433 315.25L118.833 305.833C119.467 305.2 119.467 304.133 118.833 303.5ZM125.9 303.483L109.433 319.95L103.633 314.167C103.322 313.855 102.899 313.68 102.458 313.68C102.018 313.68 101.595 313.855 101.283 314.167C100.972 314.478 100.797 314.901 100.797 315.342C100.797 315.782 100.972 316.205 101.283 316.517L108.25 323.483C108.9 324.133 109.95 324.133 110.6 323.483L128.25 305.85C128.404 305.696 128.527 305.513 128.611 305.311C128.694 305.109 128.737 304.893 128.737 304.675C128.737 304.457 128.694 304.241 128.611 304.039C128.527 303.837 128.404 303.654 128.25 303.5H128.233C128.083 303.343 127.903 303.217 127.703 303.131C127.503 303.045 127.288 302.999 127.07 302.998C126.853 302.996 126.637 303.038 126.436 303.122C126.235 303.205 126.053 303.328 125.9 303.483ZM91.8667 316.533L98.8333 323.5C99.4833 324.15 100.533 324.15 101.183 323.5L102.35 322.333L94.2167 314.167C94.0625 314.012 93.8793 313.89 93.6777 313.806C93.4761 313.722 93.2599 313.679 93.0417 313.679C92.8234 313.679 92.6072 313.722 92.4056 313.806C92.204 313.89 92.0208 314.012 91.8667 314.167C91.2167 314.817 91.2167 315.883 91.8667 316.533Z'
          fill='#6495ED'
          fillOpacity='0.9'
        />
        <rect x='139' y='154' width='280' height='50' rx='12' fill='white' />
        <rect
          x='140'
          y='155'
          width='278'
          height='48'
          rx='11'
          stroke='#6495ED'
          strokeOpacity='0.9'
          strokeWidth='2'
        />
        <rect
          x='155.471'
          y='162'
          width='247.059'
          height='14'
          rx='7'
          fill='#D9D9D9'
        />
        <rect
          x='155.471'
          y='182'
          width='247.059'
          height='14'
          rx='7'
          fill='#D9D9D9'
        />
        <rect x='139' y='221' width='280' height='50' rx='12' fill='white' />
        <rect
          x='140'
          y='222'
          width='278'
          height='48'
          rx='11'
          stroke='#6495ED'
          strokeOpacity='0.9'
          strokeWidth='2'
        />
        <rect
          x='155.471'
          y='229'
          width='247.059'
          height='14'
          rx='7'
          fill='#D9D9D9'
        />
        <rect
          x='155.471'
          y='249'
          width='247.059'
          height='14'
          rx='7'
          fill='#D9D9D9'
        />
        <rect x='139' y='288' width='280' height='50' rx='12' fill='white' />
        <rect
          x='140'
          y='289'
          width='278'
          height='48'
          rx='11'
          stroke='#6495ED'
          strokeOpacity='0.9'
          strokeWidth='2'
        />
        <rect
          x='155.471'
          y='296'
          width='247.059'
          height='14'
          rx='7'
          fill='#D9D9D9'
        />
        <rect
          x='155.471'
          y='316'
          width='247.059'
          height='14'
          rx='7'
          fill='#D9D9D9'
        />
      </svg>
    </FlexBlock>
  );
};

export const NotFoundIcon: FC = () => {
  return (
    <svg
      width='360'
      height='280'
      viewBox='0 0 360 280'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <line x1='179' x2='179' y2='56' stroke='#D6E4FE' strokeWidth='2' />
      <path
        d='M136.143 105H221L281 279H78L136.143 105Z'
        fill='url(#paint0_linear_59309_70287)'
      />
      <circle cx='179' cy='66' r='11' fill='#0033A0' />
      <path
        d='M221 105.5C199 110.5 198.472 110.5 175 110.5C151.528 110.5 151.5 110.5 136 105.5C136 82.0279 155.028 63 178.5 63C201.972 63 221 82.0279 221 105.5Z'
        fill='url(#paint1_linear_59309_70287)'
      />
      <ellipse
        cx='178.5'
        cy='105.5'
        rx='42.5'
        ry='8.5'
        fill='url(#paint2_linear_59309_70287)'
      />
      <defs>
        <linearGradient
          id='paint0_linear_59309_70287'
          x1='206'
          y1='66.5'
          x2='157.886'
          y2='254.506'
          gradientUnits='userSpaceOnUse'
        >
          <stop stopColor='#D6E4FE' />
          <stop offset='1' stopColor='#D6E4FE' stopOpacity='0' />
        </linearGradient>
        <linearGradient
          id='paint1_linear_59309_70287'
          x1='136'
          y1='86.75'
          x2='221'
          y2='86.75'
          gradientUnits='userSpaceOnUse'
        >
          <stop offset='0.140625' stopColor='#0539A7' />
          <stop offset='0.75' stopColor='#3870F0' />
        </linearGradient>
        <linearGradient
          id='paint2_linear_59309_70287'
          x1='136'
          y1='105'
          x2='219'
          y2='107'
          gradientUnits='userSpaceOnUse'
        >
          <stop stopColor='#2754B5' />
          <stop offset='1' stopColor='#2755BB' />
        </linearGradient>
      </defs>
    </svg>
  );
};
