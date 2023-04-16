import styled from 'styled-components';

import { borderRadiusSize } from '@src/common/borderRadiusSize';
import { lightHoverColor } from '@src/common/constants';


export const DontHoveredButton = styled('button')`
  & {
    position: relative;
    outline: none;
    border: none;
    background-color: transparent;
    font-size: 16px;
    display: flex;
    flex-wrap: nowrap;
    cursor: pointer;
    align-items: center;
    justify-content: flex-start;
    gap: 8px;
    padding: 4px 6px;
  }
`;

DontHoveredButton.defaultProps = {
  type: 'button',
};

export const EmptyButtonStyled = styled(DontHoveredButton)`
  &:hover {
    border-radius: ${borderRadiusSize.sm};
    background-color: ${lightHoverColor};
  }
`;

EmptyButtonStyled.defaultProps = {
  type: 'button',
};

export const EmptyLink = styled('a')`
  & {
    position: relative;
    outline: none;
    border: none;
    background-color: transparent;
    text-decoration: none;
    font-size: 16px;
    display: flex;
    flex-wrap: nowrap;
    cursor: pointer;
    align-items: center;
    justify-content: flex-start;
    gap: 8px;
    padding: 4px 6px;
  }

  &:focus {
    border-radius: ${borderRadiusSize.sm};
    background-color: ${lightHoverColor};
  }

  &:hover {
    border-radius: ${borderRadiusSize.sm};
    background-color: ${lightHoverColor};
  }
`;