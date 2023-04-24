import React, { FC, createElement, forwardRef } from 'react';
import styled, { FlattenSimpleInterpolation } from 'styled-components';

import { darkColor, defaultColor } from '@src/common/constants/constants';

import { pxToCssValue } from '@components/LayoutComponents/FlexBlock';

interface ReactTextComponentProps
  extends Omit<React.HTMLProps<HTMLParagraphElement | HTMLSpanElement>, 'ref'> {
  htmlTag: 'span' | 'p' | 'strong';
  fontColor?: string;
  fontSize?: number;
  css?: FlattenSimpleInterpolation;
}

const ReactText: FC<ReactTextComponentProps> = forwardRef<
  HTMLElement,
  ReactTextComponentProps
>(({ htmlTag, children, fontSize, css, fontColor, ...otherProps }, ref) => {
  return createElement(htmlTag, { ...otherProps, ref: ref }, children);
});

ReactText.defaultProps = {
  htmlTag: 'span',
  translate: 'yes',
};

type HtmlTagsPropertiesMap<ValueType = string> = {
  [key in ReactTextComponentProps['htmlTag']]: ValueType;
};

const defaultFontSizeMap: HtmlTagsPropertiesMap<number> = {
  span: 14,
  p: 15,
  strong: 14,
};

const defaultColorMap: HtmlTagsPropertiesMap<string> = {
  strong: '#000',
  p: darkColor,
  span: defaultColor,
};

export const Text = styled(ReactText)`
  position: relative;
  margin: 0;
  color: ${(_) => _.fontColor || defaultColorMap[_.htmlTag]};
  font-size: ${(_) =>
    pxToCssValue(_.fontSize || defaultFontSizeMap[_.htmlTag])};
  white-space: break-spaces;
  box-sizing: border-box;
  ${(_) => _.css || ''}
`;

Text.defaultProps = {
  htmlTag: 'span',
  translate: 'yes',
};

export interface PreviewDescriptionProps {
  isOpen?: boolean;
  fontSize?: number;
  rows?: number;
  color?: string;
  lineHeight?: number;
}

export const CutText = styled('p')<PreviewDescriptionProps>`
  & {
    text-align: left;
    margin: 0;
    padding: 0;
    max-width: 100%;
    font-size: ${(_) => pxToCssValue(_.fontSize || 14)};
    line-height: ${(_) =>
      pxToCssValue(_.lineHeight || (_.fontSize ? _.fontSize + 2 : 16))};
    max-height: ${(_) => {
      const { fontSize, rows, isOpen, lineHeight } = _;
      if (isOpen) return 'fit-content';
      if (lineHeight) return pxToCssValue(lineHeight * (rows || 1));
      if (fontSize) return pxToCssValue((fontSize + 2) * (rows || 1));
      if (rows) return pxToCssValue(16 * (rows || 1));
      return pxToCssValue(16);
    }};
    overflow: hidden;
    white-space: break-spaces;
    word-break: break-all;
    word-wrap: anywhere;
    display: -webkit-box;
    -webkit-line-clamp: ${(_) => {
      const { isOpen, rows } = _;
      if (isOpen) return 'none';
      if (rows) return rows;
      return 1;
    }};
    -webkit-box-orient: vertical;
    color: ${(_) => (_.color ? _.color : 'inherit')};
  }
`;

CutText.defaultProps = {
  rows: 1,
};
