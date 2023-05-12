import Tippy, { TippyProps } from '@tippyjs/react';
import { FC, ReactNode, useCallback } from 'react';
import { CSSProperties } from 'styled-components';

import { IconProps } from '@components/Icons/Icons';
import { TooltipIcon } from '@components/Icons/TooltipIcon';

export interface TooltipDefaultProps {
  children?: ReactNode;
  content: ReactNode;
  placement?: TippyProps['placement'];
  singleton?: TippyProps['singleton'];
  delay?: TippyProps['delay'];
  trigger?: TippyProps['trigger'];
  triggerTarget?: TippyProps['triggerTarget'];
  interactiveBorder?: TippyProps['interactiveBorder'];
  interactive?: TippyProps['interactive'];
  theme?: 'current' | 'light' | 'midnight';
  hideOnClick?: boolean | 'toggle';
  maxWidth?: number | string;
  offset?: TippyProps['offset'];
  animation?: TippyProps['animation'];
  arrow?: TippyProps['arrow'];
  visible?: boolean;
  onClickOutside?: (event: Event) => void;
}

export interface TooltipContainerProps {
  containerClassName?: string;
  containerStyles?: CSSProperties;
  containerId?: string;
}

export interface OptionsTooltip {
  state: boolean;
  top: number | string;
  left: string | number;
  placement: TooltipDefaultProps['placement'];
}

export type TooltipProps = TooltipContainerProps &
  TooltipDefaultProps &
  IconProps;

export const Tooltip: FC<TooltipProps> = ({
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
  hideOnClick,
  maxWidth = 300,
  offset,
  animation = 'shift-away',
  arrow = true,
  visible,
  onClickOutside,
  containerStyles,
  containerClassName,
  containerId,
  ...iconProps
}) => {
  const outsideHandler = useCallback(
    (instance: any, event: Event) => {
      onClickOutside && onClickOutside(event);
    },
    [onClickOutside]
  );

  return (
    <Tippy
      visible={visible}
      hideOnClick={hideOnClick}
      content={content}
      offset={offset}
      theme={theme}
      arrow={arrow}
      interactive={interactive}
      interactiveBorder={interactiveBorder}
      singleton={singleton}
      delay={delay}
      onClickOutside={outsideHandler}
      maxWidth={maxWidth}
      animation={animation}
      trigger={trigger}
      triggerTarget={triggerTarget}
      placement={placement || 'top'}
      popperOptions={{
        strategy: 'absolute',
      }}
    >
      <span
        className={containerClassName}
        style={containerStyles}
        id={containerId}
      >
        {children ? children : <TooltipIcon {...iconProps} />}
      </span>
    </Tippy>
  );
};
