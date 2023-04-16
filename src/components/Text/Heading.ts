import styled, { css } from 'styled-components';

import {
  currentColor,
  darkColor,
  defaultColor,
  disabledColor,
  lightHoverColor,
  pageHeaderColor,
} from '@src/common/constants';

const HeadingMixin = (props: HeadingProps) => css`
  font-weight: bold;
  font-style: normal;
  font-family: 'Helvetica Neue', sans-serif;
  color: ${props.textColor ? colors[props.textColor] : colors.dark};
  margin: 0;
  line-height: 1;
`;

const colors = {
  current: currentColor,
  dark: darkColor,
  default: defaultColor,
  disabled: disabledColor,
  lightHoverColor: lightHoverColor,
  pageHeaderColor: pageHeaderColor,
};

type ColorsType = {
  [key in keyof typeof colors]: string;
};

interface HeadingProps {
  textColor?: keyof ColorsType;
}

export const Heading = {
  H1: styled('h1')<HeadingProps>`
    & {
      font-size: 28px;
      ${(_) => HeadingMixin(_)}
    }
  `,
  H2: styled('h2')<HeadingProps>`
    & {
      font-size: 24px;
      ${(_) => HeadingMixin(_)}
    }
  `,
  H3: styled('h3')<HeadingProps>`
    & {
      font-size: 18px;
      ${(_) => HeadingMixin(_)}
    }
  `,
};