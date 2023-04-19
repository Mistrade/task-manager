import styled, { css } from 'styled-components';

import {
  currentColor,
  darkColor,
  defaultColor,
  disabledColor,
  errorColor,
} from '@src/common/constants/constants';
import { borderRadiusSize } from '@src/common/css/mixins';

import { DefaultTextInputProps } from './TextInput/TextInput';

const LeftIconPadding = css`
  padding: 8px 12px 8px 46px;
`;

const RightIconPadding = css`
  padding: 8px 46px 8px 12px;
`;

const DefaultPadding = css`
  padding: 8px 12px;
`;

const IconPlacement = {
  left: LeftIconPadding,
  right: RightIconPadding,
};

interface InputStyledProps {
  hasIcon?: boolean;
  iconPlacement?: DefaultTextInputProps['iconPlacement'];
  isError?: boolean;
}

export const StyledInput = styled('input')<InputStyledProps>`
  width: 100%;
  border: 2px solid ${(_) => (_.isError ? errorColor : disabledColor)};
  border-radius: ${borderRadiusSize.sm};
  outline: none;
  transition: all 0.3s ease-in;
  cursor: pointer;
  font-size: 16px;
  font-family: Helvetica, sans-serif;

  ${(_) =>
    _.hasIcon ? IconPlacement[_.iconPlacement || 'right'] : DefaultPadding}
  &:focus {
    border: 2px solid ${currentColor};
  }

  &::placeholder {
    color: ${defaultColor};
  }
`;

export const StyledLabel = styled('label')`
  & {
    width: fit-content;
    font-size: 16px;
    padding-left: 4px;
    font-family: 'Helvetica Neue', sans-serif;
    font-weight: normal;
    color: ${currentColor};
    line-height: 1;
    cursor: pointer;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
`;

export const StyledTextAreaInput = styled('textarea')`
  & {
    width: 100%;
    color: ${darkColor};
    border: 2px solid ${disabledColor};
    border-radius: ${borderRadiusSize.sm};
    outline: none;
    overflow: hidden;
    -moz-appearance: none;
    resize: none;
    transition: all 0.3s ease-in, height 0.05s ease-in-out;
    cursor: pointer;
    font-size: 16px;
    line-height: 16px;
    font-family: Helvetica, sans-serif;
    overflow-y: auto;
  }

  ${DefaultPadding};

  &:focus {
    border: 2px solid ${currentColor};
  }

  &::placeholder {
    color: ${defaultColor};
  }
`;
