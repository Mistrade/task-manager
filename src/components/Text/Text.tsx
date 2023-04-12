import React, { createElement, FC, forwardRef } from 'react';
import styled, { FlattenSimpleInterpolation } from 'styled-components';
import { darkColor, defaultColor } from '@src/common/constants';
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
