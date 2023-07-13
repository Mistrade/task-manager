import { IconProps } from '@components/Icons/Icons';
import { CloseEyeIcon } from '@components/Icons/Session/CloseEyeIcon';
import { OpenEyeIcon } from '@components/Icons/Session/OpenEyeIcon';
import { FlexBlockProps } from '@components/LayoutComponents/FlexBlock';
import { Tooltip } from 'chernikov-kit';
import React, { FC } from 'react';


interface PasswordIconProps extends IconProps, FlexBlockProps {
  isOpen?: boolean;
  withTooltip?: boolean;
  tooltipMessage?: {
    open: string;
    close: string;
  };
}

export const PasswordIcon: FC<PasswordIconProps> = ({
  isOpen = false,
  withTooltip = false,
  tooltipMessage = {
    open: 'Нажмите, чтобы скрыть пароль',
    close: 'Нажмите, чтобы показать пароль',
  },
  ...props
}) => {
  if (isOpen) {
    return withTooltip ? (
      <Tooltip
        placement={'top'}
        content={tooltipMessage.open || 'Нажмите, чтобы скрыть пароль'}
      >
        <OpenEyeIcon {...props} />
      </Tooltip>
    ) : (
      <OpenEyeIcon {...props} />
    );
  }

  return withTooltip ? (
    <Tooltip
      placement={'top'}
      content={tooltipMessage.close || 'Нажмите, чтобы показать пароль'}
    >
      <CloseEyeIcon {...props} />
    </Tooltip>
  ) : (
    <CloseEyeIcon {...props} />
  );
};