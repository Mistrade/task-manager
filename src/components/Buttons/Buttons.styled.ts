import styled, { css } from 'styled-components';

import { borderRadiusSize } from '@src/common/borderRadiusSize';
import { currentColor, defaultColor } from '@src/common/constants';


export const StyledButton = styled('button')<{
  fillColor?: string;
  textColor?: string;
}>`
  & {
    padding: 6px 24px;
    font-size: 16px;
    color: ${(props) => props.textColor || '#fff'};
    background-color: ${(props) => props.fillColor || currentColor};
    border: none;
    border-radius: ${borderRadiusSize.sm};
    outline: none;
    cursor: pointer;
  }

  &:not(:last-child) {
    margin-right: 8px;
  }
`;

export const Button = styled('button')`
  & {
    display: flex;
    align-items: center;
    padding: 6px 24px;
    font-size: 16px;
    color: #fff;
    background-color: ${currentColor};
    outline: none;
    border: 1px solid #fff;
    border-radius: ${borderRadiusSize.sm};
    cursor: pointer;
    transition: all 0.3s ease-in-out;
    gap: 6px;
  }

  &:hover {
    color: ${currentColor};
    background-color: #fff;
    border: 1px solid ${currentColor};
    box-shadow: 0 0 8px 0px ${currentColor};
  }
`;

export const LinkButton = styled('a')`
  & {
    padding: 6px 32px;
    font-size: 16px;
    color: ${defaultColor};
    background-color: #fff;
    outline: none;
    border: 1px solid ${defaultColor};
    border-radius: ${borderRadiusSize.sm};
    text-decoration: none;
    cursor: pointer;
    transition: all 0.3s ease-in-out;
    vertical-align: middle;
  }

  &:hover {
    color: ${currentColor};
    background-color: #fff;
    border: 1px solid ${currentColor};
    box-shadow: 0 0 8px 0px ${currentColor};
  }
`;

export const WhiteButton = styled('button')<{ withHover?: boolean }>`
  & {
    padding: 4px 8px;
    font-size: 16px;
    color: ${defaultColor};
    background-color: #fff;
    outline: none;
    border: 1px solid ${defaultColor};
    border-radius: ${borderRadiusSize.sm};
    text-decoration: none;
    cursor: pointer;
    transition: all 0.3s ease-in-out;
    vertical-align: middle;
  }

  ${(_) =>
    _.withHover &&
    css`
      &:hover {
        color: ${currentColor};
        background-color: #fff;
        border: 1px solid ${currentColor};
      }
    `}
`;

WhiteButton.defaultProps = {
  withHover: true,
};

export const TransparentButton = styled(WhiteButton)`
  & {
    width: max-content;
    line-height: 20px;
    font-size: 14px;
    background-color: transparent;
  }
`;

export const JoinToEventButton = styled('a')`
  display: inline;
  width: fit-content;
  font-size: 14px;
  padding: 4px 8px;
  border-width: 1px;
  border-style: solid;
  border-color: ${defaultColor};
  border-radius: ${borderRadiusSize.sm};
  color: ${defaultColor};
  text-decoration: none;
  outline: none;
  line-height: 20px;
  background-color: transparent;
  transition: all 0.3s ease-in;

  &:hover {
    background-color: #fff;
    border-color: ${currentColor};
    color: ${currentColor};
  }
`;