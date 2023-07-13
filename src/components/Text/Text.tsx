import { pxToCssValue } from '@components/LayoutComponents/FlexBlock';
import { darkColor, defaultColor } from '@src/common/constants/constants';
import React, { createElement, FC, forwardRef } from 'react';
import styled, {
  CSSProperties,
  FlattenSimpleInterpolation,
} from 'styled-components';

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

export interface CutTextProps {
  isOpen?: boolean;
  fontSize?: number;
  rows?: number;
  color?: string;
  lineHeight?: number;
  textAlign?: CSSProperties['textAlign'];
  verticalAlign?: CSSProperties['verticalAlign'];
  maxWidth?: number;
  weight?: CSSProperties['fontWeight'];
}

export const CutText = styled('p')<CutTextProps>`
  & {
    text-align: ${(_) => _.textAlign || 'left'};
    vertical-align: ${(_) => _.verticalAlign || 'top'};
    margin: 0;
    padding: 0;
    font-size: ${(_) => pxToCssValue(_.fontSize || 14)};
    max-width: ${(_) => (_.maxWidth ? pxToCssValue(_.maxWidth || 14) : '100%')};
    font-weight: ${(_) => _.weight || 'normal'};
    font-family: 'Helvetica Neue', sans-serif;
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
    word-break: break-word;
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