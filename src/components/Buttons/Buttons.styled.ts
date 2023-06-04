import { defaultColor } from '@src/common/constants/constants';
import { borderRadiusSize } from '@src/common/css/mixins';
import { kitColors } from 'chernikov-kit';
import styled, { css } from 'styled-components';


export const StyledButton = styled('button')<{
  fillColor?: string;
  textColor?: string;
}>`
  & {
    padding: 4px 6px;
    font-size: 16px;
    color: ${(props) => props.textColor || '#fff'};
    background-color: ${(props) => props.fillColor || kitColors.primary};
    border: none;
    border-radius: ${borderRadiusSize.sm};
    outline: none;
    cursor: pointer;
  }

  &:not(:last-child) {
    margin-right: 8px;
  }
`;

const ButtonHoverMixin = css`
  color: ${kitColors.primary} !important;
  background-color: #fff !important;
  border: 1px solid ${kitColors.primary} !important;
  box-shadow: 0 0 8px 0px ${kitColors.primary} !important;
`;

export const Button = styled('button')<{ isLoading?: boolean }>`
  & {
    display: flex;
    align-items: center;
    padding: 8px 12px;
    font-size: 16px;
    color: #fff;
    background-color: ${kitColors.primary};
    outline: none;
    border: 1px solid #fff;
    border-radius: ${borderRadiusSize.sm};
    cursor: pointer;
    transition: all 0.3s ease-in-out;
    gap: 6px;
  }

  &:hover {
    ${ButtonHoverMixin};
  }

  ${(_) =>
    _.isLoading
      ? css`
          ${ButtonHoverMixin};
          padding-left: 30px !important;
          padding-right: 30px !important;
        `
      : ''};
`;

export const LinkButton = styled('a')`
  & {
    padding: 4px 6px;
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
    color: ${kitColors.primary};
    background-color: #fff;
    border: 1px solid ${kitColors.primary};
    box-shadow: 0 0 8px 0px ${kitColors.primary};
  }
`;

export const WhiteButton = styled('button')<{ withHover?: boolean }>`
  & {
    padding: 4px 4px;
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
        color: ${kitColors.primary};
        background-color: #fff;
        border: 1px solid ${kitColors.primary};
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
  padding: 4px 6px;
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
    border-color: ${kitColors.primary};
    color: ${kitColors.primary};
  }
`;