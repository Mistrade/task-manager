import styled from 'styled-components';
import {
  borderRadiusSize,
  defaultColor,
  lightHoverColor,
} from '../../../common/constants';
import { pxToCssValue } from '../../../components/LayoutComponents/FlexBlock';

export const GroupListStyled = styled('ul')`
  margin: 0;
  display: flex;
  justify-content: flex-start;
  flex-direction: column;
  background-color: transparent;
  width: 100%;
  max-height: 300px;
  overflow-y: auto;
  overflow-x: hidden;
  gap: 8px;

  & li {
    width: 100%;
    background-color: transparent;
    padding: 4px;
    border-radius: ${borderRadiusSize.xs};
    transition: all 0.3s ease-in;
  }

  & li:hover {
    background-color: ${lightHoverColor};
  }
`;

export const GroupItemCheckbox = styled('input')<{ color: string }>`
  & {
    position: absolute;
    z-index: -1;
    opacity: 0;
    width: 0;
  }

  & + label {
    display: inline-flex;
    align-items: center;
    user-select: none;
  }

  & + label::before {
    content: '';
    display: inline-block;
    width: 16px;
    height: 16px;
    flex-shrink: 0;
    flex-grow: 0;
    border: 1px solid #adb5bd;
    border-radius: ${borderRadiusSize.xs};
    background-repeat: no-repeat;
    background-position: center center;
    background-size: 50% 50%;
    cursor: pointer;
  }

  &:checked + label::before {
    border-color: ${(_) => _.color};
    background-color: ${(_) => _.color};
    background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 8 8'%3e%3cpath fill='%23fff' d='M6.564.75l-3.59 3.612-1.538-1.55L0 4.26 2.974 7.25 8 2.193z'/%3e%3c/svg%3e");
  }

  &:not(:disabled):not(:checked) + label:hover::before {
    border-color: ${defaultColor};
  }

  /* стили для активного состояния чекбокса (при нажатии на него) */

  &:not(:disabled):active + label::before {
    background-color: ${(_) => _.color};
    border-color: ${(_) => _.color};
  }

  /* стили для чекбокса, находящегося в фокусе */

  &:focus + label::before {
    box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.25);
  }

  /* стили для чекбокса, находящегося в фокусе и не находящегося в состоянии checked */

  &:focus:not(:checked) + label::before {
    border-color: ${(_) => _.color};
  }

  /* стили для чекбокса, находящегося в состоянии disabled */

  &:disabled + label::before {
    background-color: #e9ecef;
  }
`;

export const GroupLogo = styled('div')<{ color: string; size?: number }>`
  flex-grow: 0;
  flex-shrink: 0;
  width: ${(_) => (_.size ? pxToCssValue(_.size) : '20px')};
  height: ${(_) => (_.size ? pxToCssValue(_.size) : '20px')};
  border-radius: ${borderRadiusSize.xs};
  background-color: ${(_) => _.color};
`;
export const CalendarItemLabel = styled('label')`
  width: 100%;
  gap: 6px;
  overflow: hidden;
  white-space: break-spaces;
  word-wrap: unset;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
`;
