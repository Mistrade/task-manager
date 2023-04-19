import { FC } from 'react';

import { borderRadiusSize } from '@src/common/borderRadiusSize';
import {
  defaultColor,
  delayedColor,
  hoverColor,
  orangeColor,
  pageHeaderColor,
} from '@src/common/constants';

import { Accordion, AccordionProps } from '@components/Accordion/Accordion';

export type TLayoutAccordionTypes =
  | 'success'
  | 'info'
  | 'warning'
  | 'error'
  | 'default';

export interface LayoutAccordionProps extends AccordionProps {
  type: TLayoutAccordionTypes;
}

const bgColors: { [key in TLayoutAccordionTypes]: string } = {
  success: hoverColor,
  info: '#fff',
  warning: delayedColor,
  error: orangeColor,
  default: pageHeaderColor,
};

export const LayoutAccordion: FC<LayoutAccordionProps> = ({
  type,
  ...props
}) => {
  return (
    <Accordion
      {...props}
      iconProps={{ color: defaultColor, size: 16 }}
      containerProps={{
        pl: 4,
        pr: 4,
        pt: 8,
        pb: 8,
        bgColor: bgColors[type],
        borderRadius: borderRadiusSize.sm,
      }}
    />
  );
};
