import styled from 'styled-components';
import { defaultColor } from '@src/common/constants';
import { pxToCssValue } from '@components/LayoutComponents/FlexBlock';

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
      if (lineHeight) return pxToCssValue(lineHeight * (rows || 3));
      if (fontSize) return pxToCssValue((fontSize + 2) * (rows || 3));
      if (rows) return pxToCssValue(16 * (rows || 3));
      return pxToCssValue(16 * 3);
    }};
    overflow: hidden;
    white-space: break-spaces;
    word-wrap: anywhere;
    display: -webkit-box;
    -webkit-line-clamp: ${(_) => {
      const { isOpen, rows } = _;
      if (isOpen) return 'none';
      if (rows) return rows;
      return 3;
    }};
    -webkit-box-orient: vertical;
    color: ${(_) => (_.color ? _.color : defaultColor)};
  }
`;

CutText.defaultProps = {
  rows: 3,
};

export const TaskListMainContainer = styled('div')`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  flex-grow: 10;
  padding-bottom: 24px;
  margin-left: -8px;
  padding-left: 8px;
  margin-right: -8px;
  padding-right: 8px;
  z-index: 0;
`;

export const TaskListEventFiltersContainer = styled('div')`
  z-index: 10;
  display: flex;
  justify-content: flex-start;
  flex-wrap: nowrap;
  background-color: #fff;
  gap: 12px;
  top: 0;
  left: 0;
  position: sticky;
  width: 100%;
`;
